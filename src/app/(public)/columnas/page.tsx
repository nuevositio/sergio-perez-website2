import type { Metadata } from "next";
import Link from "next/link";
import { ColumnsCollectionJsonLd } from "@/components/seo/json-ld";
import { getPublishedPosts } from "@/features/columns/queries";

export const revalidate = 3600; // Revalida cada hora

export const metadata: Metadata = {
  title: "Columnas — Escritura y Opinión",
  description: "Columnas de opinión e investigación sobre cultura, identidad, política cultural y comunicación estratégica en Uruguay y la región.",
  alternates: { canonical: "https://www.sergioperez.uy/columnas" },
  openGraph: {
    title: "Columnas — Sergio Pérez",
    description: "Artículos de fondo sobre cultura, identidad y política cultural en Uruguay.",
    url: "https://www.sergioperez.uy/columnas",
    type: "website",
  },
};

export default async function ColumnasPage() {
  const posts = await getPublishedPosts().catch(() => []);

  return (
    <>
      <ColumnsCollectionJsonLd posts={posts} />
      <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Columnas</p>
        <h1 className="text-4xl font-semibold text-zinc-900">Escritura y opinión</h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-600">
          Artículos de fondo sobre cultura, identidad, política cultural y tecnología.
        </p>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-zinc-900">
          Lecturas para entender cultura, territorio y comunicación pública
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600">
          Esta sección reúne columnas de Sergio Pérez sobre gestión cultural, patrimonio,
          identidad, políticas culturales, comunicación estratégica y desarrollo territorial en
          Uruguay. Los artículos combinan análisis, experiencia profesional y lectura institucional
          para aportar contexto a proyectos, debates públicos y procesos comunitarios.
        </p>
      </section>

      {posts.length === 0 ? (
        <p className="rounded-xl border border-zinc-200 bg-white p-8 text-center text-zinc-500">
          Todavía no hay columnas publicadas.
        </p>
      ) : (
        <div className="space-y-5">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-300 hover:shadow-sm md:flex-row md:gap-6"
            >
              <div className="flex-1 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  {post.category.name}
                </p>
                <h3 className="text-xl font-semibold leading-snug text-zinc-900">
                  <Link href={`/columnas/${post.slug}`} className="hover:text-zinc-600">
                    {post.title}
                  </Link>
                </h3>
                {post.subtitle ? (
                  <p className="text-sm font-medium text-zinc-600">{post.subtitle}</p>
                ) : null}
                <p className="text-sm leading-relaxed text-zinc-500">{post.excerpt}</p>
              </div>
              <div className="flex flex-col items-end justify-between gap-3 md:min-w-fit">
                {post.publishedAt ? (
                  <time className="text-xs text-zinc-400">
                    {new Intl.DateTimeFormat("es-UY", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(post.publishedAt))}
                  </time>
                ) : null}
                <Link
                  href={`/columnas/${post.slug}`}
                  className="rounded-lg border border-zinc-200 px-4 py-1.5 text-xs font-semibold text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900"
                >
                  Leer →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
      </div>
    </>
  );
}
