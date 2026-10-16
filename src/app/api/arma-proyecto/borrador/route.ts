import { createHash, randomBytes } from "node:crypto";
import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { METHODOLOGY_PROMPT } from "@/features/arma-proyecto/methodology";
import { describeRequest, projectRequestSchema } from "@/features/arma-proyecto/schema";

export const runtime = "nodejs";
export const maxDuration = 300;

const MODEL = "claude-opus-5-5";
const MAX_PER_IP_PER_DAY = 3;
const MAX_PER_HOUR_GLOBAL = 30;

function getIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function hashIp(ip: string) {
  const salt = process.env.ADMIN_SESSION_SECRET ?? "";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

function newCode() {
  // Sin caracteres ambiguos (0/O, 1/I) para que se pueda dictar o copiar a mano
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(6);
  return "AP-" + Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return jsonError("El generador de borradores no está disponible en este momento.", 503);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Solicitud inválida.", 400);
  }

  const parsed = projectRequestSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError("Revisá los datos del formulario: hay campos incompletos o inválidos.", 400);
  }
  const input = parsed.data;
  const ipHash = hashIp(getIp(request));

  // Límites de uso (cada borrador tiene costo). Si la base no responde, no se genera.
  try {
    const [byIp, global] = await Promise.all([
      prisma.projectDraft.count({
        where: { ipHash, createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
      }),
      prisma.projectDraft.count({
        where: { createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000) } },
      }),
    ]);
    if (byIp >= MAX_PER_IP_PER_DAY) {
      return jsonError(
        "Alcanzaste el máximo de borradores por hoy. Escribime por WhatsApp y lo seguimos juntos.",
        429,
      );
    }
    if (global >= MAX_PER_HOUR_GLOBAL) {
      return jsonError("Hay mucha demanda en este momento. Probá de nuevo en un rato.", 429);
    }
  } catch (error) {
    console.error("[arma-proyecto] rate limit check failed", error);
    return jsonError("El generador de borradores no está disponible en este momento.", 503);
  }

  const code = newCode();
  const client = new Anthropic();
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let draft = "";
      try {
        const messageStream = client.beta.messages.stream({
          model: MODEL,
          max_tokens: 16000,
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
          output_config: { effort: "medium" },
          system: METHODOLOGY_PROMPT,
          messages: [
            {
              role: "user",
              content: `Redactá el borrador a partir de esta solicitud:\n\n<solicitud>\n${describeRequest(input)}\n</solicitud>`,
            },
          ],
        });

        for await (const event of messageStream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            draft += event.delta.text;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }

        const final = await messageStream.finalMessage();
        if (final.stop_reason === "refusal" || !draft.trim()) {
          throw new Error(`Draft not generated (stop_reason: ${final.stop_reason})`);
        }

        try {
          await prisma.projectDraft.create({
            data: {
              code,
              projectTitle: input.projectTitle,
              discipline: input.discipline,
              contactName: input.contactName,
              contactEmail: input.contactEmail,
              contactPhone: input.contactPhone || null,
              input: { ...input, website: undefined },
              draft,
              model: final.model,
              ipHash,
            },
          });
        } catch (error) {
          // El borrador ya llegó a la persona; solo se pierde la copia del admin
          console.error("[arma-proyecto] could not save draft", code, error);
        }
        controller.close();
      } catch (error) {
        console.error("[arma-proyecto] generation failed", error);
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Draft-Code": code,
    },
  });
}
