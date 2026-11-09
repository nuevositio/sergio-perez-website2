import Anthropic from "@anthropic-ai/sdk";
import { after } from "next/server";
import { correoChequeo } from "@/features/fondo-listo/correo";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BASES } from "@/features/fondo-listo/bases";
import { getConvocatoria } from "@/features/fondo-listo/convocatorias";
import { PROMPT_CHEQUEO } from "@/features/fondo-listo/prompts";
import { chequeoSchema, describirRespuestas, solicitudSchema } from "@/features/fondo-listo/schema";
import { hashIp, ipDe, MODELO, nuevoCodigo, nuevoToken } from "@/features/fondo-listo/server";

export const runtime = "nodejs";
export const maxDuration = 300;

const MAX_POR_IP_DIA = 4;
const MAX_POR_HORA = 40;

function error(mensaje: string, status: number) {
  return NextResponse.json({ error: mensaje }, { status });
}

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return error("El chequeo no está disponible en este momento. Escribime por WhatsApp.", 503);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return error("Solicitud inválida.", 400);
  }
  const parsed = solicitudSchema.safeParse(body);
  if (!parsed.success) {
    return error("Revisá las respuestas: hay campos incompletos o demasiado largos.", 400);
  }
  const s = parsed.data;
  const convocatoria = getConvocatoria(s.convocatoria)!;
  const ipHash = hashIp(ipDe(request.headers));

  try {
    const [porIp, porHora] = await Promise.all([
      prisma.fondoListoSolicitud.count({
        where: { ipHash, createdAt: { gte: new Date(Date.now() - 86_400_000) } },
      }),
      prisma.fondoListoSolicitud.count({ where: { createdAt: { gte: new Date(Date.now() - 3_600_000) } } }),
    ]);
    if (porIp >= MAX_POR_IP_DIA) {
      return error("Llegaste al máximo de chequeos por hoy. Escribime por WhatsApp y lo seguimos.", 429);
    }
    if (porHora >= MAX_POR_HORA) {
      return error("Hay mucha demanda en este momento. Probá de nuevo en un rato.", 429);
    }
  } catch (e) {
    console.error("[fondo-listo] límite de uso", e);
    return error("El chequeo no está disponible en este momento.", 503);
  }

  const client = new Anthropic();
  let chequeo;
  let modelo = MODELO;
  try {
    const message = await client.beta.messages.parse({
      model: MODELO,
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "medium", format: betaZodOutputFormat(chequeoSchema) },
      system: [{ type: "text", text: PROMPT_CHEQUEO, cache_control: { type: "ephemeral" } }],
      messages: [
        {
          role: "user",
          content: `<convocatoria>\n${convocatoria.nombre} (${convocatoria.organismo})\n\n${BASES[convocatoria.id]}\n</convocatoria>\n\n<solicitud>\n${describirRespuestas(s.respuestas)}\n</solicitud>`,
        },
      ],
    });
    if (message.stop_reason === "refusal" || !message.parsed_output) {
      throw new Error(`Chequeo sin resultado (stop_reason: ${message.stop_reason})`);
    }
    chequeo = message.parsed_output;
    modelo = message.model;
  } catch (e) {
    console.error("[fondo-listo] chequeo falló", e);
    return error("No pudimos hacer el chequeo. Probá de nuevo o escribime por WhatsApp.", 502);
  }

  const code = nuevoCodigo();
  const token = nuevoToken();
  try {
    const creada = await prisma.fondoListoSolicitud.create({
      data: {
        code,
        token,
        convocatoria: convocatoria.id,
        titulo: s.respuestas.titulo,
        nombre: s.nombre,
        email: s.email,
        telefono: s.telefono || null,
        respuestas: s.respuestas,
        chequeo,
        modelo,
        ipHash,
      },
    });
    after(() => correoChequeo(creada, chequeo));
  } catch (e) {
    console.error("[fondo-listo] no se pudo guardar", e);
    return error("No pudimos guardar tu chequeo. Probá de nuevo en un rato.", 503);
  }

  return NextResponse.json({ code, token, chequeo });
}
