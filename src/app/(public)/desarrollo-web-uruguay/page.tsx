import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, WebDesignServiceJsonLd } from "@/components/seo/json-ld";

const BASE_URL = "https://www.sergioperez.uy";

export const metadata: Metadata = {
  title: "Desarrollo Web Uruguay — Sitios Rápidos, SEO Técnico y Next.js",
  description:
    "Desarrollo web en Uruguay con Next.js, SEO técnico, formularios, hosting, dominios, mantenimiento y arquitectura preparada para crecer.",
  keywords: [
    "desarrollo web Uruguay",
    "desarrollador web Uruguay",
    "Next.js Uruguay",
    "desarrollo de sitios web Uruguay",
    "SEO técnico Uruguay",
  ],
  alternates: {
    canonical: `${BASE_URL}/desarrollo-web-uruguay`,
  },
  openGraph: {
    title: "Desarrollo Web Uruguay | Sergio Pérez",
    description:
      "Desarrollo de sitios rápidos, mantenibles y optimizados para buscadores en Uruguay.",
    url: `${BASE_URL}/desarrollo-web-uruguay`,
    type: "website",
  },
};

const stack = [
  {
    title: "Arquitectura y rendimiento",
    text: "Uso Next.js, componentes reutilizables y carga optimizada para que el sitio responda bien en móvil y escritorio.",
  },
  {
    title: "SEO técnico",
    text: "Configuro títulos, descripciones, canonicals, schema, sitemap, robots, jerarquía de headings y enlaces internos.",
  },
  {
    title: "Integraciones",
    text: "Puedo conectar formularios, WhatsApp, correo, analítica, CMS, paneles de gestión y servicios externos según el proyecto.",
  },
  {
    title: "Operación",
    text: "Resuelvo dominio, DNS, hosting, SSL, backups básicos, mantenimiento y mejoras posteriores al lanzamiento.",
  },
];

const scopes = [
  "Landing pages comerciales",
  "Sitios institucionales",
  "Catálogos de servicios",
  "Webs para medios y contenidos",
  "Plataformas para proyectos culturales",
  "Paneles de administración simples",
  "Rediseños con migración de contenido",
  "Optimización técnica de sitios existentes",
];

export default function DesarrolloWebUruguayPage() {
  return (
    <>
      <WebDesignServiceJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: BASE_URL },
          { name: "Desarrollo web Uruguay", url: `${BASE_URL}/desarrollo-web-uruguay` },
        ]}
      />

      <div className="space-y-14">
        <section className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-center">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
              Desarrollo web Uruguay
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-zinc-900 md:text-5xl">
              Desarrollo web en Uruguay con base técnica, SEO y mantenimiento
            </h1>
            <p className="text-lg leading-relaxed text-zinc-600">
              Desarrollo sitios web modernos para proyectos que necesitan velocidad, orden técnico,
              posicionamiento, formularios funcionales y una base preparada para crecer sin depender
              de parches improvisados.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/cotizacion"
                className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700"
              >
                Cotizar desarrollo web
              </Link>
              <Link
                href="/desarrollo"
                className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50"
              >
                Ver servicio completo
              </Link>
            </div>
          </div>
          <aside className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-zinc-900">Alcances habituales</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {scopes.map((scope) => (
                <span key={scope} className="rounded-lg bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
                  {scope}
                </span>
              ))}
            </div>
          </aside>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {stack.map((item) => (
            <article key={item.title} className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-zinc-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
            Criterio técnico
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-zinc-900">
            El desarrollo web también es estrategia de posicionamiento
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600">
            Para competir en Google no alcanza con publicar una página. El sitio debe cargar
            rápido, tener una estructura legible, explicar los servicios con precisión, enlazar sus
            páginas importantes, declarar datos estructurados y sostener contenido útil. Esa base
            técnica mejora la indexación y evita rehacer el trabajo cuando el proyecto empieza a
            crecer.
          </p>
        </section>

        <section className="rounded-2xl bg-zinc-900 p-8 text-white">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-2xl font-semibold">Desarrollemos una web preparada para competir</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300">
                Te propongo una solución concreta según tu rubro, presupuesto, contenidos
                disponibles y objetivos de captación.
              </p>
            </div>
            <Link
              href="/cotizacion"
              className="rounded-lg bg-white px-6 py-2.5 text-center text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
            >
              Pedir propuesta
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
