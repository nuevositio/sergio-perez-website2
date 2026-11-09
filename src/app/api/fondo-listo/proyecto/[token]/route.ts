import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BASES } from "@/features/fondo-listo/bases";
import { getConvocatoria } from "@/features/fondo-listo/convocatorias";
import { PROMPT_PROYECTO } from "@/features/fondo-listo/prompts";
import { describirRespuestas } from "@/features/fondo-listo/schema";
import { MODELO, verificarPago } from "@/features/fondo-listo/server";

export const runtime = "nodejs";
export const maxDuration = 300;

// Escribe el proyecto completo de una solicitud pagada, en streaming. Si ya está escrito, lo devuelve.
export async function POST(request: NextRequest, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  let s = await prisma.fondoListoSolicitud.findUnique({ where: { token } });
  if (!s) return NextResponse.json({ error: "No encontramos tu proyecto." }, { status: 404 });

  const paymentId = request.nextUrl.searchParams.get("payment_id");
  if (paymentId && ["chequeo", "pago_pendiente"].includes(s.estado)) {
    await verificarPago(paymentId).catch((e) => console.error("[fondo-listo] verificar pago", e));
    s = (await prisma.fondoListoSolicitud.findUnique({ where: { token } }))!;
  }

  if (s.estado === "generado" && s.proyecto) {
    return new Response(s.proyecto, { headers: { "Content-Type": "text/plain; charset=utf-8", "X-Estado": "generado" } });
  }

  // Toma la solicitud para escribirla (o la retoma si una escritura anterior quedó colgada)
  const tomada = await prisma.fondoListoSolicitud.updateMany({
    where: {
      id: s.id,
      OR: [{ estado: "pagado" }, { estado: "generando", updatedAt: { lt: new Date(Date.now() - 6 * 60_000) } }],
    },
    data: { estado: "generando" },
  });
  if (tomada.count === 0) {
    return NextResponse.json({ estado: s.estado }, { status: s.estado === "generando" ? 409 : 402 });
  }

  const convocatoria = getConvocatoria(s.convocatoria)!;
  const client = new Anthropic();
  const encoder = new TextEncoder();
  const solicitudId = s.id;
  const contenido =
    `<convocatoria>\n${convocatoria.nombre} (${convocatoria.organismo})\n\n${BASES[convocatoria.id]}\n</convocatoria>\n\n` +
    `<solicitud>\n${describirRespuestas(s.respuestas as Record<string, string>)}\n</solicitud>\n\n` +
    `<chequeo_previo>\n${JSON.stringify(s.chequeo)}\n</chequeo_previo>\n\n` +
    "Redactá el proyecto completo. Trabajá especialmente los refuerzos señalados en el chequeo previo.";

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let texto = "";
      try {
        const ms = client.beta.messages.stream({
          model: MODELO,
          max_tokens: 64000,
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
          output_config: { effort: "high" },
          system: [{ type: "text", text: PROMPT_PROYECTO, cache_control: { type: "ephemeral" } }],
          messages: [{ role: "user", content: contenido }],
        });
        for await (const ev of ms) {
          if (ev.type === "content_block_delta" && ev.delta.type === "text_delta") {
            texto += ev.delta.text;
            controller.enqueue(encoder.encode(ev.delta.text));
          }
        }
        const final = await ms.finalMessage();
        if (final.stop_reason === "refusal" || !texto.trim()) {
          throw new Error(`Proyecto sin texto (stop_reason: ${final.stop_reason})`);
        }
        await prisma.fondoListoSolicitud.update({
          where: { id: solicitudId },
          data: { proyecto: texto, estado: "generado", modelo: final.model },
        });
        controller.close();
      } catch (e) {
        console.error("[fondo-listo] proyecto falló", e);
        await prisma.fondoListoSolicitud
          .update({ where: { id: solicitudId }, data: { estado: "pagado" } })
          .catch(() => {});
        controller.error(e);
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Estado": "generando" },
  });
}
