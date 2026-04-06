import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let postsCount = 0;
  let publishedCount = 0;
  let draftCount = 0;
  let renderError: string | null = null;
  let renderStack: string | null = null;

  try {
    [postsCount, publishedCount, draftCount] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { status: "published" } }),
      prisma.post.count({ where: { status: "draft" } }),
    ]);
  } catch (err) {
    renderError = err instanceof Error ? err.message : String(err);
    renderStack = err instanceof Error ? (err.stack ?? null) : null;
  }

  if (renderError) {
    return (
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold text-zinc-900">Dashboard — Error de render</h1>
        <div className="rounded-xl border border-red-300 bg-red-50 p-5">
          <p className="font-medium text-red-700">{renderError}</p>
          {renderStack && (
            <pre className="mt-3 overflow-auto text-xs text-red-500 opacity-80">{renderStack}</pre>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-semibold text-zinc-900">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="text-sm text-zinc-500">Total columnas</p>
          <p className="mt-2 text-3xl font-semibold text-zinc-900">{postsCount}</p>
        </article>
        <article className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="text-sm text-zinc-500">Publicadas</p>
          <p className="mt-2 text-3xl font-semibold text-zinc-900">{publishedCount}</p>
        </article>
        <article className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="text-sm text-zinc-500">Borradores</p>
          <p className="mt-2 text-3xl font-semibold text-zinc-900">{draftCount}</p>
        </article>
      </div>

      <Link
        href="/admin/columnas/nueva"
        className="inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
      >
        Crear nueva columna
      </Link>
    </section>
  );
}
