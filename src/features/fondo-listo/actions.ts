"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { PLANES, type PlanId } from "./schema";

async function requireAdmin() {
  const session = (await cookies()).get("admin_session");
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!session?.value || !secret || session.value !== secret) redirect("/admin/login");
}

/** Para pagos recibidos fuera de la web (WhatsApp, transferencia, link manual de Mercado Pago). */
export async function marcarPagado(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const plan = String(formData.get("plan") ?? "listo") as PlanId;
  if (!id || !(plan in PLANES)) return;
  await prisma.fondoListoSolicitud.updateMany({
    where: { id, estado: { in: ["chequeo", "pago_pendiente"] } },
    data: { estado: "pagado", plan, monto: PLANES[plan].precio, pagadoAt: new Date() },
  });
  revalidatePath("/admin/fondo-listo");
}
