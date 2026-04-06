import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPosts } from "@/features/columns/queries";
import { PersonJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";
import TypewriterText from "@/components/typewriter-text";

export const metadata: Metadata = {
  title: "Sergio Pérez — Gestor Cultural, Comunicador y Desarrollador Web en Uruguay",
  description:
    "Soy Sergio Pérez: gestor cultural, columnista y desarrollador web uruguayo. Diseño proyectos culturales, estrategia editorial y plataformas web que posicionan con autoridad.",
  alternates: { canonical: "https://www.sergioperez.uy" },
  openGraph: {
    title: "Sergio Pérez — Gestor Cultural, Comunicador y Desarrollador Web en Uruguay",
    description:
      "Gestión cultural, comunicación estratégica y desarrollo web profesional en Uruguay.",
    url: "https://www.sergioperez.uy",
    type: "website",
  },
};

const areas = [
  {
    title: "Gestión cultural",
    description:
      "Diseño y coordinación de proyectos culturales, festivales, ciclos y convocatorias de impacto regional.",
  },
  {
    title: "Comunicación estratégica",
    description:
      "Narrativa editorial, columnismo de opinión y estrategia de contenido para posicionar tu voz con autoridad.",
  },
  {
    title: "Desarrollo web",
    description:
      "Plataformas profesionales con Next.js, arquitectura limpia y foco en rendimiento, SEO y conversión.",
  },
];

export const revalidate = 3600; // Revalida cada hora

export default async function HomePage() {
  const latestPosts = await getPublishedPosts()
    .then((posts) => posts.slice(0, 3))
    .catch(() => []);

  return (
    <>
      <PersonJsonLd />
      <WebSiteJsonLd />
      <div className="space-y-24">
      {/* Hero */}
      <section className="grid gap-12 pt-4 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-20">
        <div className="space-y-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Gestor cultural · Comunicador · Desarrollador
          </p>
          <h1 className="text-4xl font-semibold leading-[1.15] text-zinc-900 md:text-5xl">
            <TypewriterText
              texts={[
                "Gestión cultural con criterio profesional.",
                "Comunicación que construye audiencias.",
                "Desarrollo web con identidad propia.",
                "Proyectos culturales con impacto real.",
              ]}
            />
          </h1>
          <p className="text-base leading-relaxed text-zinc-600 md:text-lg">
            Trabajo en la intersección entre cultura, narrativa y tecnología para construir
            proyectos con identidad clara, audiencias fieles y resultados concretos.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contacto"
              className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700"
            >
              Trabajemos juntos
            </Link>
            <Link
              href="/servicios"
              className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50"
            >
              Ver servicios
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          {areas.map((area) => (
            <div key={area.title} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-zinc-900">{area.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600">{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Columnas recientes */}
      {latestPosts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-semibold text-zinc-900">Columnas recientes</h2>
            <Link href="/columnas" className="text-sm font-semibold text-zinc-500 hover:text-zinc-900">
              Ver todas →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                href={`/columnas/${post.slug}`}
                className="group rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-400 hover:shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  {post.category.name}
                </p>
                <h3 className="mt-2 text-base font-semibold leading-snug text-zinc-900 group-hover:text-zinc-600">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">¿Tenés un proyecto?</p>
        <h2 className="mt-3 text-2xl font-semibold text-zinc-900 md:text-3xl">
          Construyamos algo que valga la pena.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-600">
          Desde la estrategia hasta la ejecución, puedo acompañarte en proyectos culturales,
          comunicacionales o digitales.
        </p>
        <Link
          href="/contacto"
          className="mt-6 inline-block rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
        >
          Contactame
        </Link>
      </section>
    </div>
    </>
  );
}
