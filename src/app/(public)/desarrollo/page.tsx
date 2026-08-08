import type { Metadata } from "next";
import Link from "next/link";
import {
  BreadcrumbJsonLd,
  ProfessionalServiceJsonLd,
  WebDesignServiceJsonLd,
} from "@/components/seo/json-ld";

const BASE_URL = "https://www.sergioperez.uy";

export const metadata: Metadata = {
  title: "Diseño Web y Desarrollo Web en Uruguay — Sergio Pérez",
  description:
    "Diseño web y desarrollo web profesional en Uruguay para empresas, instituciones, marcas personales y proyectos culturales. Sitios rápidos, SEO técnico, hosting, dominios y mantenimiento.",
  keywords: [
    "diseño web Uruguay",
    "desarrollo web Uruguay",
    "paginas web Uruguay",
    "diseño de páginas web Uruguay",
    "desarrollador web Uruguay",
    "sitios web profesionales Uruguay",
    "Next.js Uruguay",
    "SEO técnico Uruguay",
    "hosting dominios Uruguay",
  ],
  alternates: {
    canonical: `${BASE_URL}/desarrollo`,
  },
  openGraph: {
    title: "Diseño Web y Desarrollo Web en Uruguay | Sergio Pérez",
    description:
      "Sitios profesionales con diseño claro, tecnología moderna, SEO técnico y soporte cercano en Uruguay.",
    url: `${BASE_URL}/desarrollo`,
    type: "website",
  },
};

const WA_URL =
  "https://wa.me/59895342022?text=Hola%20Sergio%2C%20quiero%20cotizar%20un%20sitio%20web%20profesional";

const coreServices = [
  {
    title: "Diseño de páginas web",
    description:
      "Sitios institucionales, landing pages y presencias digitales para empresas, profesionales, artistas, emprendimientos e instituciones.",
    items: ["Diseño responsive", "Arquitectura de contenidos", "Textos orientados a conversión", "Accesibilidad básica"],
  },
  {
    title: "Desarrollo web profesional",
    description:
      "Implementación con Next.js, TypeScript y buenas prácticas técnicas para lograr sitios rápidos, mantenibles y escalables.",
    items: ["Next.js y React", "Formularios y automatizaciones", "Paneles de gestión", "Integración con servicios externos"],
  },
  {
    title: "SEO técnico y posicionamiento",
    description:
      "Configuración on-page para que Google entienda el servicio, el territorio, la autoridad profesional y la intención comercial.",
    items: ["Metadata por página", "Schema.org", "Sitemap y robots", "Optimización de rendimiento"],
  },
  {
    title: "Hosting, dominios y mantenimiento",
    description:
      "Acompañamiento posterior al lanzamiento para que el sitio siga activo, seguro, actualizado y medible.",
    items: ["Dominios .uy y .com", "DNS y correo", "SSL", "Soporte y mejoras mensuales"],
  },
];

const projectTypes = [
  "Sitios para empresas y PyMEs",
  "Webs para profesionales y marcas personales",
  "Sitios culturales, patrimoniales e institucionales",
  "Landing pages para campañas",
  "Catálogos y e-commerce inicial",
  "Medios digitales, blogs y columnas",
];

const evidence = [
  "Experiencia en sitios para turismo, industria, cultura, medios, comercio y marcas personales.",
  "Portfolio público con proyectos desarrollados para Uruguay y la región.",
  "Perfil híbrido: desarrollo web, comunicación estratégica, gestión cultural y producción de contenidos.",
  "Trabajo directo con el titular del proyecto, sin intermediación innecesaria.",
];

const faqs = [
  {
    question: "¿Cuánto cuesta una página web en Uruguay?",
    answer:
      "Depende del alcance: cantidad de secciones, diseño, redacción, formularios, panel de administración, hosting, dominio, integraciones y mantenimiento. Por eso trabajo con cotización personalizada antes de cerrar un precio.",
  },
  {
    question: "¿Qué incluye un servicio de diseño web profesional?",
    answer:
      "Incluye estructura de contenidos, diseño responsive, desarrollo, configuración técnica, SEO on-page inicial, publicación, formularios de contacto y orientación para que el sitio pueda empezar a recibir consultas reales.",
  },
  {
    question: "¿Trabajás solo en Montevideo?",
    answer:
      "No. Trabajo con clientes de todo Uruguay. Puedo desarrollar proyectos para Montevideo, interior del país, instituciones locales, empresas, profesionales, proyectos culturales y marcas con proyección regional.",
  },
  {
    question: "¿Hacés rediseño de sitios existentes?",
    answer:
      "Sí. Puedo auditar un sitio actual, conservar lo que funciona y reconstruir lo necesario para mejorar diseño, velocidad, posicionamiento, claridad comercial y capacidad de generar contactos.",
  },
  {
    question: "¿El sitio queda optimizado para Google?",
    answer:
      "Sí, el desarrollo contempla metadata, headings, sitemap, schema, velocidad, enlazado interno y contenido alineado con búsquedas reales. El SEO competitivo requiere además contenido continuo, autoridad externa y medición.",
  },
];

export default function DesarrolloPage() {
  return (
    <>
      <ProfessionalServiceJsonLd />
      <WebDesignServiceJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: BASE_URL },
          { name: "Diseño web y desarrollo web", url: `${BASE_URL}/desarrollo` },
        ]}
      />

      <div className="space-y-16">
        <section className="grid gap-10 md:grid-cols-[1.25fr_0.75fr] md:items-start">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
              Diseño web Uruguay · Desarrollo web Uruguay
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-zinc-900 md:text-5xl">
              Diseño web y desarrollo web profesional en Uruguay
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-zinc-600">
              Desarrollo sitios web para empresas, profesionales, instituciones y proyectos
              culturales que necesitan verse serios, cargar rápido, explicar bien lo que ofrecen y
              aparecer mejor en Google.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/cotizacion"
                className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700"
              >
                Solicitar cotización web
              </Link>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 transition hover:border-green-500 hover:text-green-700"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>

          <aside className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-zinc-900">Servicios web principales</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-600">
              {projectTypes.map((type) => (
                <li key={type} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900" />
                  <span>{type}</span>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {coreServices.map((service) => (
            <article key={service.title} className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-zinc-900">{service.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{service.description}</p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {service.items.map((item) => (
                  <li key={item} className="rounded-lg bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
              Diferenciación
            </p>
            <h2 className="text-3xl font-semibold text-zinc-900">
              No alcanza con una web linda: tiene que posicionar, convencer y ser administrable
            </h2>
            <p className="text-base leading-relaxed text-zinc-600">
              En Uruguay hay muchas agencias de diseño web compitiendo por las mismas búsquedas.
              Mi enfoque combina criterio técnico, comunicación, contenido y lectura territorial
              para que el sitio no sea una plantilla más, sino una herramienta comercial y
              reputacional.
            </p>
          </div>
          <div className="grid gap-3">
            {evidence.map((item) => (
              <div key={item} className="rounded-lg border border-zinc-200 bg-white p-4 text-sm leading-relaxed text-zinc-700">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                Proceso de trabajo
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-zinc-900">
                Del diagnóstico al lanzamiento
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                Antes de diseñar, ordeno la oferta, las palabras clave, la estructura y las
                conversiones. Después desarrollo, publico y dejo el sitio preparado para crecer.
              </p>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {[
                "Auditoría de necesidad, competencia y objetivo comercial.",
                "Mapa de páginas, mensajes, llamadas a la acción y contenidos.",
                "Diseño responsive, desarrollo y carga inicial de información.",
                "SEO técnico, formularios, medición, publicación y mantenimiento.",
              ].map((step, index) => (
                <li key={step} className="rounded-lg bg-zinc-50 p-4">
                  <span className="text-xs font-semibold text-zinc-400">Paso {index + 1}</span>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                Preguntas frecuentes
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-zinc-900">
                Diseño web en Uruguay: dudas habituales
              </h2>
            </div>
            <Link href="/proyectos" className="text-sm font-semibold text-zinc-600 hover:text-zinc-900">
              Ver proyectos realizados
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-xl border border-zinc-200 bg-white p-5">
                <h3 className="text-base font-semibold text-zinc-900">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-zinc-900 px-8 py-10 text-center text-white">
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-400">
            Sitio web profesional en Uruguay
          </p>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
            Pedí una cotización y ordenamos la mejor solución para tu proyecto
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">
            Puedo ayudarte con diseño web, desarrollo, hosting, dominios, SEO técnico,
            mantenimiento y estrategia de contenidos.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/cotizacion"
              className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
            >
              Cotizar mi página web
            </Link>
            <Link
              href="/contacto"
              className="rounded-lg border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contactar
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
