import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getConvocatoria } from "@/features/fondo-listo/convocatorias";
import { ProyectoView } from "@/features/fondo-listo/proyecto-view";

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
    />
  );
}
