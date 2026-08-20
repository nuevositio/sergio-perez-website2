import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, WebDesignServiceJsonLd } from "@/components/seo/json-ld";

const BASE_URL = "https://www.sergioperez.uy";

export const metadata: Metadata = {
  title: "Diseño Web Uruguay — Páginas Profesionales para Empresas y Proyectos",
  description:
    "Diseño web en Uruguay para empresas, profesionales, instituciones y proyectos culturales. Páginas claras, responsive, preparadas para Google y orientadas a generar consultas.",
  keywords: [
    "diseño web Uruguay",
    "diseño de páginas web Uruguay",
    "paginas web Uruguay",
    "diseñador web Uruguay",
    "web para empresas Uruguay",
  ],
  alternates: {
    canonical: `${BASE_URL}/diseno-web-uruguay`,
  },
  openGraph: {
    title: "Diseño Web Uruguay | Sergio Pérez",
    description:
      "Páginas profesionales para empresas, profesionales, instituciones y proyectos culturales en Uruguay.",
    url: `${BASE_URL}/diseno-web-uruguay`,
    type: "website",
  },
};

const needs = [
  "Explicar con claridad quién sos, qué ofrecés y por qué confiar.",
  "Transformar visitas en consultas por formulario, WhatsApp o email.",
  "Tener una estructura preparada para SEO desde el primer día.",
  "Mostrar proyectos, servicios, trayectoria, precios orientativos o casos de trabajo.",
];

const deliverables = [
  "Diseño visual alineado a la identidad del proyecto.",
  "Versión móvil y desktop con navegación clara.",
  "Redacción y ordenamiento de contenidos comerciales.",
  "Carga inicial de imágenes, servicios, proyectos y llamados a la acción.",
  "Configuración de metadata, sitemap, schema y enlaces internos.",
  "Publicación, dominio, hosting, SSL y soporte posterior.",
];

const faqs = [
  {
    question: "¿Qué diferencia a una página web profesional de una web básica?",
    answer:
      "Una página profesional no se limita a verse bien. Ordena la oferta, explica el valor del proyecto, funciona correctamente en móvil, carga rápido, tiene llamados a la acción, metadata, estructura de headings, schema, enlaces internos y una base preparada para medición y posicionamiento.",
  },
  {
    question: "¿Para quién está pensado el diseño web en Uruguay?",
    answer:
      "Está pensado para empresas, instituciones, profesionales independientes, marcas personales, artistas, emprendimientos y proyectos culturales que necesitan proyectar confianza, explicar servicios y recibir consultas desde Google, redes sociales, WhatsApp o campañas específicas.",
  },
  {
    question: "¿El diseño incluye contenido y estructura comercial?",
    answer:
      "Sí. El trabajo contempla ordenar secciones, jerarquizar mensajes, redactar o ajustar textos principales, definir llamados a la acción y organizar la navegación para que la página sea entendible para personas, buscadores y sistemas de búsqueda asistidos por IA.",
  },
];

export default function DisenoWebUruguayPage() {
  return (
    <>
      <WebDesignServiceJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: BASE_URL },
          { name: "Diseño web Uruguay", url: `${BASE_URL}/diseno-web-uruguay` },
        ]}
      />

      <div className="space-y-14">
        <section className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
            Diseño web Uruguay
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-zinc-900 md:text-5xl">
            Diseño web en Uruguay para proyectos que necesitan presencia profesional
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-zinc-600">
            Diseño páginas web para empresas, profesionales, instituciones, artistas,
            emprendimientos y proyectos culturales que necesitan una imagen seria, una oferta clara
            y un sitio preparado para recibir consultas.
          </p>
          <p className="max-w-3xl rounded-xl border border-zinc-200 bg-white p-4 text-sm leading-relaxed text-zinc-600 shadow-sm">
            El diseño web profesional en Uruguay debe vender confianza antes que estética. Sergio
            Pérez diseña páginas claras, responsive y preparadas para Google, orientadas a explicar
            servicios, mostrar trayectoria, ordenar contenidos y convertir visitas en consultas
            reales por formulario, WhatsApp o email.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/cotizacion"
              className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700"
            >
              Cotizar diseño web
            </Link>
            <Link
              href="/proyectos"
              className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50"
            >
              Ver sitios realizados
            </Link>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-zinc-900">
              Una página web debe vender confianza antes que diseño
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              En búsquedas competitivas como diseño web Uruguay, Google premia páginas útiles,
              concretas y confiables. Por eso el trabajo no empieza por elegir colores: empieza por
              ordenar la oferta, entender al público, definir servicios, jerarquizar contenidos y
              construir una estructura que pueda posicionar.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-zinc-900">Qué busco resolver</h2>
            <ul className="mt-4 space-y-3">
              {needs.map((need) => (
                <li key={need} className="flex gap-2 text-sm leading-relaxed text-zinc-600">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900" />
                  {need}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
              Entregables
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-zinc-900">
              Qué incluye el diseño de tu página web
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {deliverables.map((item) => (
              <article key={item} className="rounded-xl border border-zinc-200 bg-white p-5 text-sm leading-relaxed text-zinc-700">
                {item}
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-zinc-900 p-8 text-white">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-2xl font-semibold">Pedí una propuesta de diseño web</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300">
                Si necesitás una web nueva o rediseñar una existente, puedo auditar el punto de
                partida y proponer una solución realista para tu etapa.
              </p>
            </div>
            <Link
              href="/cotizacion"
              className="rounded-lg bg-white px-6 py-2.5 text-center text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
            >
              Solicitar cotización
            </Link>
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
              Preguntas frecuentes
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-zinc-900">
              Dudas sobre diseño web profesional
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {faqs.map((item) => (
              <article key={item.question} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                <h3 className="text-base font-semibold text-zinc-900">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
