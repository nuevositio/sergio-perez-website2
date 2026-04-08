import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Productos — Soluciones Digitales Propias | Sergio Pérez",
  description:
    "Milocapp y RAIZ CRM: soluciones digitales desarrolladas para municipios y gestión inmobiliaria. Conocé cómo pueden transformar la comunicación y gestión de tu organización.",
  alternates: { canonical: "https://www.sergioperez.uy/productos" },
  openGraph: {
    title: "Productos — Soluciones Digitales Propias | Sergio Pérez",
    description:
      "Dos soluciones digitales listas para implementar: Milocapp para gobiernos locales y RAIZ CRM para inmobiliarias.",
    url: "https://www.sergioperez.uy/productos",
    type: "website",
  },
};

const WA_BASE = "https://wa.me/59895342022?text=";

const products = [
  {
    id: "milocapp",
    tag: "Gobierno & comunicación institucional",
    name: "Milocapp",
    logotype: "Milo\u200Bcapp",
    accentColor: "bg-sky-50 text-sky-700 border-sky-200",
    dotColor: "bg-sky-500",
    description:
      "Milocapp es una plataforma web institucional pensada para municipios y gobiernos locales que necesitan comunicar de forma clara, ordenada y accesible. Permite gestionar noticias, resoluciones, actas y contenidos públicos desde una interfaz sencilla y práctica.",
    benefits: [
      "Gestión simple de noticias institucionales",
      "Publicación de resoluciones y actas",
      "Diseño adaptable a cada municipio",
      "Plataforma clara, moderna y fácil de administrar",
      "Pensada para mejorar la comunicación con la ciudadanía",
    ],
    url: "https://milocapp.uy/",
    waText:
      "Hola%20Sergio%2C%20quiero%20solicitar%20un%20test%20de%20Milocapp%20para%20mi%20municipio",
  },
  {
    id: "raiz-crm",
    tag: "Inmobiliarias & gestión comercial",
    name: "RAIZ CRM",
    logotype: "RAIZ\u00A0CRM",
    accentColor: "bg-amber-50 text-amber-700 border-amber-200",
    dotColor: "bg-amber-500",
    description:
      "RAIZ CRM es una solución digital para inmobiliarias que necesitan administrar propiedades, clientes y operaciones desde un solo lugar. Está diseñado para facilitar la gestión comercial y profesionalizar el seguimiento de cada oportunidad.",
    benefits: [
      "Gestión centralizada de propiedades",
      "Administración de clientes y oportunidades",
      "Panel claro y profesional",
      "Solución adaptable a cada negocio inmobiliario",
      "Ideal para ordenar procesos y escalar ventas",
    ],
    url: "https://raiz-crm-rho.vercel.app/",
    waText:
      "Hola%20Sergio%2C%20quiero%20solicitar%20un%20test%20de%20RAIZ%20CRM%20para%20mi%20inmobiliaria",
  },
];

export default function ProductosPage() {
  return (
    <div className="space-y-16">
      {/* Encabezado de sección */}
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
          Productos
        </p>
        <h1 className="text-4xl font-semibold text-zinc-900">
          Soluciones digitales propias
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-600">
          Desarrollé estas herramientas para resolver problemas reales de gestión, comunicación y
          ventas. Son productos funcionales, probados y listos para ser implementados por
          organizaciones que buscan una solución profesional y escalable.
        </p>
      </section>

      {/* Cards de productos */}
      <div className="grid gap-8 lg:grid-cols-2">
        {products.map((product) => (
          <article
            key={product.id}
            className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            {/* Tag de categoría */}
            <span
              className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${product.accentColor}`}
            >
              {product.tag}
            </span>

            {/* Logotipo tipográfico */}
            <div className="mt-6 mb-2">
              <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">
                {product.logotype}
              </h2>
            </div>

            {/* Descripción */}
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              {product.description}
            </p>

            {/* Lista de beneficios */}
            <ul className="mt-6 space-y-2 border-t border-zinc-100 pt-6">
              {product.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5 text-sm text-zinc-700">
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${product.dotColor}`}
                    aria-hidden="true"
                  />
                  {benefit}
                </li>
              ))}
            </ul>

            {/* Botones de acción */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700"
              >
                Ver más
              </a>
              <a
                href={`${WA_BASE}${product.waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50"
              >
                Solicitar demo
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Bloque de cierre / CTA */}
      <section className="rounded-2xl border border-zinc-200 bg-white px-8 py-12 text-center shadow-sm">
        <p className="mx-auto max-w-xl text-lg font-semibold leading-snug text-zinc-900">
          ¿Buscás una solución digital profesional y adaptada a tu organización?
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">
          Podés solicitar un acceso de prueba y conocer cómo cualquiera de estas herramientas
          puede adaptarse a tu proyecto. La implementación es simple, el soporte es directo y
          los resultados son concretos.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={`${WA_BASE}Hola%20Sergio%2C%20quiero%20conocer%20m%C3%A1s%20sobre%20tus%20soluciones%20digitales%20y%20solicitar%20un%20acceso%20de%20prueba`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Quiero probar una solución
          </a>
          <Link
            href="/contacto"
            className="rounded-lg border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50"
          >
            Escribirme directamente
          </Link>
        </div>
      </section>
    </div>
  );
}
