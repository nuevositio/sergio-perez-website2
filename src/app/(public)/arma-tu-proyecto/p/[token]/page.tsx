import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getConvocatoria } from "@/features/fondo-listo/convocatorias";
import { ProyectoView } from "@/features/fondo-listo/proyecto-view";
import { LINKS_PAGO, PLANES, formatoPesos, type Chequeo } from "@/features/fondo-listo/schema";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tu proyecto · Fondo Listo",
  robots: { index: false, follow: false },
};

export default async function ProyectoPage(props: {
  params: Promise<{ token: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { token } = await props.params;
  const sp = await props.searchParams;
  const paymentId = typeof sp.payment_id === "string" ? sp.payment_id : null;

  const s = await prisma.fondoListoSolicitud.findUnique({ where: { token } });
  if (!s) notFound();
  const conv = getConvocatoria(s.convocatoria);
  const ch = s.chequeo as Chequeo | null;
  const resumen = ch
    ? {
        total: ch.criterios.reduce((a, k) => a + k.estimado, 0),
        maximo: ch.criterios.reduce((a, k) => a + k.maximo, 0),
        minimo: conv?.minimo ?? null,
        texto: ch.resumen,
      }
    : null;

  return (
    <ProyectoView
      token={s.token}
      code={s.code}
      titulo={s.titulo}
      convocatoria={conv?.nombre ?? s.convocatoria}
      estado={s.estado}
      plan={s.plan}
      proyecto={s.estado === "generado" ? s.proyecto : null}
      paymentId={paymentId}
      linkPago={s.estado === "pago_pendiente" && s.plan && s.plan in LINKS_PAGO ? LINKS_PAGO[s.plan as keyof typeof LINKS_PAGO] : null}
      chequeo={s.estado === "chequeo" ? resumen : null}
      monto={s.plan && s.plan in PLANES ? formatoPesos(PLANES[s.plan as keyof typeof PLANES].precio) : null}
    />
  );
}
