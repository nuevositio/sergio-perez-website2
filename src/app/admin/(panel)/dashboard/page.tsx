import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [postsCount, publishedCount, draftCount] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { status: "published" } }),
    prisma.post.count({ where: { status: "draft" } }),
  ]);

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
