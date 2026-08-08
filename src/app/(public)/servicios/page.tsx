import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Servicios — Gestión Cultural, Comunicación y Desarrollo Web",
  description:
    "Servicios especializados en gestión de proyectos culturales, columnismo y estrategia editorial, y desarrollo web profesional con Next.js en Uruguay.",
  alternates: { canonical: "https://www.sergioperez.uy/servicios" },
  openGraph: {
    title: "Servicios — Gestión Cultural, Comunicación y Desarrollo Web | Sergio Pérez",
    description:
      "Cultura, comunicación y tecnología: tres áreas que se complementan para proyectos de mayor alcance.",
    url: "https://www.sergioperez.uy/servicios",
    type: "website",
  },
};

const services = [
  {
    category: "Cultura",
    title: "Gestión de proyectos culturales",
    description:
      "Diseño, planificación y coordinación de festivales, ciclos, exposiciones y convocatorias. Gestión de fondos públicos y privados, producción ejecutiva y evaluación de impacto.",
    items: ["Festivales y ciclos", "Convocatorias y fondos", "Producción ejecutiva", "Evaluación de proyectos"],
    href: "/arma-tu-proyecto",
  },
  {
    category: "Comunicación",
    title: "Columnismo y estrategia editorial",
    description:
      "Producción de columnas de opinión, análisis cultural y periodismo especializado. Plan editorial para marcas personales, posicionamiento narrativo y construcción de autoridad.",
    items: ["Columnas de opinión", "Plan editorial", "Marca personal", "Estrategia de contenido"],
    href: "/columnas",
  },
  {
    category: "Tecnología",
    title: "Desarrollo web profesional",
    description:
      "Construcción de sitios y plataformas con Next.js y TypeScript. Arquitectura limpia, SEO técnico, rendimiento y diseño orientado a conversión para profesionales y organizaciones.",
    items: ["Sitios con Next.js", "SEO técnico", "Paneles de gestión", "Optimización y conversión"],
    href: "/desarrollo",
  },
];

export default function ServiciosPage() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Servicios</p>
        <h1 className="text-4xl font-semibold text-zinc-900">En qué puedo ayudarte</h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-600">
          Ofrezco servicios especializados en tres áreas que se complementan para proyectos de mayor
          alcance: cultura, comunicación y tecnología.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.title}
            className="flex flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">{service.category}</p>
            <h2 className="mt-2 text-lg font-semibold text-zinc-900">{service.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">{service.description}</p>
            <ul className="mt-4 space-y-1.5 border-t border-zinc-100 pt-4">
              {service.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-zinc-700">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={service.href}
              className="mt-5 inline-flex text-sm font-semibold text-zinc-700 hover:text-zinc-950"
            >
              Ver servicio
            </Link>
          </article>
        ))}
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <Link
          href="/diseno-web-uruguay"
          className="rounded-xl border border-zinc-200 bg-white p-5 text-sm leading-relaxed text-zinc-600 shadow-sm transition hover:border-zinc-400"
        >
          <span className="block text-base font-semibold text-zinc-900">Diseño web Uruguay</span>
          Páginas profesionales para empresas, instituciones, profesionales y proyectos culturales.
        </Link>
        <Link
          href="/desarrollo-web-uruguay"
          className="rounded-xl border border-zinc-200 bg-white p-5 text-sm leading-relaxed text-zinc-600 shadow-sm transition hover:border-zinc-400"
        >
          <span className="block text-base font-semibold text-zinc-900">Desarrollo web Uruguay</span>
          Sitios rápidos con Next.js, SEO técnico, formularios, hosting y mantenimiento.
        </Link>
      </section>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center">
        <p className="text-base font-semibold text-zinc-900">¿Necesitás un servicio a medida?</p>
        <p className="mt-2 text-sm text-zinc-600">
          Muchos proyectos combinan las tres áreas. Conversemos sobre lo que necesitás.
        </p>
        <Link
          href="/contacto"
          className="mt-4 inline-block rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700"
        >
          Contactame
        </Link>
      </div>
    </div>
  );
}
