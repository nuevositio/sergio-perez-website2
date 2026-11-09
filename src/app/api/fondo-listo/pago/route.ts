import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getConvocatoria } from "@/features/fondo-listo/convocatorias";
import { PLANES, formatoPesos } from "@/features/fondo-listo/schema";
import { crearPreferencia, mercadoPagoActivo, WHATSAPP } from "@/features/fondo-listo/server";

export const runtime = "nodejs";

const bodySchema = z.object({ token: z.string().min(10).max(80), plan: z.enum(["listo", "revision"]) });

export async function POST(request: NextRequest) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  const { token, plan } = parsed.data;

  const s = await prisma.fondoListoSolicitud.findUnique({ where: { token } });
  if (!s) return NextResponse.json({ error: "No encontramos tu chequeo." }, { status: 404 });
  if (!["chequeo", "pago_pendiente"].includes(s.estado)) {
    return NextResponse.json({ url: `/arma-tu-proyecto/p/${s.token}` });
  }

  const p = PLANES[plan];
  await prisma.fondoListoSolicitud.update({
    where: { id: s.id },
    data: { plan, monto: p.precio, estado: "pago_pendiente" },
  });

  if (mercadoPagoActivo()) {
    try {
      const pref = await crearPreferencia(s, plan);
      await prisma.fondoListoSolicitud.update({ where: { id: s.id }, data: { mpPreferencia: pref.id } });
      return NextResponse.json({ url: pref.init_point });
    } catch (e) {
      console.error("[fondo-listo] preferencia de Mercado Pago", e);
      // Si Mercado Pago falla, se ofrece el pago por WhatsApp
    }
  }

  const conv = getConvocatoria(s.convocatoria);
  const texto =
    `Hola Sergio, quiero ${p.nombre} (${formatoPesos(p.precio)}) para mi proyecto "${s.titulo}"` +
    `${conv ? ` en ${conv.nombre}` : ""}. Mi código es ${s.code}.`;
  return NextResponse.json({ url: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, whatsapp: true });
}
