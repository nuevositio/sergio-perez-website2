import { prisma } from "@/lib/prisma";
import { marcarPagado } from "@/features/fondo-listo/actions";
import { getConvocatoria } from "@/features/fondo-listo/convocatorias";
import { PLANES, formatoPesos, type Chequeo, type PlanId } from "@/features/fondo-listo/schema";

export const dynamic = "force-dynamic";

const fecha = new Intl.DateTimeFormat("es-UY", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Montevideo" });

const ESTADOS: Record<string, string> = {
  chequeo: "Chequeo hecho",
  pago_pendiente: "Eligió plan, falta pago",
  pagado: "Pagado, sin escribir",
  generando: "Escribiendo",
  generado: "Proyecto entregado",
};

export default async function AdminFondoListoPage() {
  const lista = await prisma.fondoListoSolicitud.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
  const cobrado = lista.filter((s) => s.pagadoAt).reduce((a, s) => a + (s.monto ?? 0), 0);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-zinc-900">Fondo Listo</h1>
        <p className="mt-1 text-sm text-zinc-600">
          {lista.length} chequeos · {lista.filter((s) => s.pagadoAt).length} pagos · {formatoPesos(cobrado)} cobrados (últimos 200).
        </p>
      </div>
      <ul className="space-y-3">
        {lista.map((s) => {
          const ch = s.chequeo as Chequeo | null;
          const puntaje = ch ? ch.criterios.reduce((a, k) => a + k.estimado, 0) : null;
          return (
            <li key={s.id}>
              <details className="rounded-xl border border-zinc-200 bg-white">
                <summary className="flex cursor-pointer flex-wrap items-center gap-x-4 gap-y-1 p-4">
                  <span className="font-mono text-xs text-zinc-500">{s.code}</span>
                  <span className="font-medium text-zinc-900">{s.titulo}</span>
                  <span className="text-sm text-zinc-500">{getConvocatoria(s.convocatoria)?.nombre ?? s.convocatoria}</span>
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700">{ESTADOS[s.estado] ?? s.estado}</span>
                  {puntaje !== null ? <span className="text-xs text-zinc-500">{puntaje} pts</span> : null}
                  <span className="ml-auto text-xs text-zinc-400">{fecha.format(s.createdAt)}</span>
                </summary>
                <div className="space-y-3 border-t border-zinc-100 p-4 text-sm text-zinc-700">
                  <p>
                    {s.nombre} · {s.email}
                    {s.telefono ? ` · ${s.telefono}` : ""}
                  </p>
                  {s.plan ? <p>Plan: {PLANES[s.plan as PlanId]?.nombre ?? s.plan}</p> : null}
                  <p>
                    Página del cliente:{" "}
                    <a className="underline" href={`/arma-tu-proyecto/p/${s.token}`} target="_blank" rel="noreferrer">
                      /arma-tu-proyecto/p/{s.token.slice(0, 8)}…
                    </a>
                  </p>
                  {ch ? <p className="text-zinc-500">{ch.resumen}</p> : null}
                  {["chequeo", "pago_pendiente"].includes(s.estado) ? (
                    <form action={marcarPagado} className="flex flex-wrap items-center gap-2">
                      <input type="hidden" name="id" value={s.id} />
                      <select name="plan" defaultValue={s.plan ?? "listo"} className="rounded-lg border border-zinc-200 px-2 py-1.5">
                        {(Object.keys(PLANES) as PlanId[]).map((id) => (
                          <option key={id} value={id}>
                            {PLANES[id].nombre} ({formatoPesos(PLANES[id].precio)})
                          </option>
                        ))}
                      </select>
                      <button className="rounded-lg bg-zinc-900 px-3 py-1.5 text-white">Marcar como pagado</button>
                      <span className="text-xs text-zinc-500">Habilita que el cliente reciba su proyecto en su página.</span>
                    </form>
                  ) : null}
                </div>
              </details>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
