import { prisma } from "@/lib/prisma";
import { DISCIPLINES, labelOf } from "@/features/arma-proyecto/options";

export const dynamic = "force-dynamic";

const dateFormat = new Intl.DateTimeFormat("es-UY", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Montevideo",
});

export default async function AdminBorradoresPage() {
  const drafts = await prisma.projectDraft.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-zinc-900">Borradores de proyectos</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Generados desde /arma-tu-proyecto. La persona cita el código al escribirte por WhatsApp.
        </p>
      </div>

      {drafts.length === 0 ? (
        <p className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500">
          Todavía no hay borradores.
        </p>
      ) : (
        <ul className="space-y-3">
          {drafts.map((d) => (
            <li key={d.id}>
              <details className="group rounded-xl border border-zinc-200 bg-white">
                <summary className="flex cursor-pointer flex-wrap items-center gap-x-4 gap-y-1 p-4">
                  <span className="font-mono text-xs text-zinc-500">{d.code}</span>
                  <span className="font-medium text-zinc-900">{d.projectTitle}</span>
                  <span className="text-sm text-zinc-500">{labelOf(DISCIPLINES, d.discipline)}</span>
                  <span className="ml-auto text-xs text-zinc-400">{dateFormat.format(d.createdAt)}</span>
                </summary>
                <div className="space-y-4 border-t border-zinc-100 p-4">
                  <p className="text-sm text-zinc-700">
                    <strong>{d.contactName}</strong> ·{" "}
                    <a href={`mailto:${d.contactEmail}`} className="underline">
                      {d.contactEmail}
                    </a>
                    {d.contactPhone ? ` · ${d.contactPhone}` : null}
                  </p>
                  <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap rounded-lg bg-zinc-50 p-4 font-sans text-sm leading-relaxed text-zinc-700">
                    {d.draft}
                  </pre>
                </div>
              </details>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
