import type { Metadata } from "next";
import { BreadcrumbJsonLd, CulturalProjectServiceJsonLd } from "@/components/seo/json-ld";
import { ArmaProyectoForm } from "@/features/arma-proyecto/arma-proyecto-form";

const BASE_URL = "https://www.sergioperez.uy";
const PAGE_URL = `${BASE_URL}/arma-tu-proyecto`;
const WA_URL =
  "https://wa.me/59895342022?text=" +
  encodeURIComponent("Hola Sergio, quiero orientación para armar un proyecto cultural");

export const metadata: Metadata = {
  title: "Armá tu Proyecto Cultural — FONAM, Fondos Concursables, Ibermúsicas",
  description:
    "Contá tu idea y recibí al instante un borrador desarrollado de tu proyecto cultural —fundamentación, objetivos, actividades, cronograma y presupuesto— para FONAM, Fondos Concursables, Ibermúsicas y más.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Armá tu Proyecto Cultural | Sergio Pérez",
    description:
      "Recibí un borrador desarrollado de tu proyecto cultural para FONAM, Fondos Concursables, Ibermúsicas y más.",
    url: PAGE_URL,
    type: "website",
  },
};

const benefits = [
  {
    title: "Un borrador desarrollado",
    desc: "Fundamentación, objetivos, actividades, cronograma, presupuesto por rubros e indicadores.",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </>
    ),
  },
  {
    title: "Elegí el fondo adecuado",
    desc: "Cómo encaja tu proyecto en cada convocatoria y qué conviene reforzar.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
  },
  {
    title: "Acompañamiento",
    desc: "Llevá el borrador a una versión para postular trabajándolo con Sergio.",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
];

const steps = [
  {
    title: "Contá tu idea",
    desc: "Unas pocas líneas alcanzan, aunque todavía esté en etapa de idea.",
  },
  {
    title: "Recibí tu borrador",
    desc: "En uno o dos minutos tenés una primera versión desarrollada, para descargar o imprimir.",
  },
  {
    title: "Lo trabajamos juntos",
    desc: "Si querés, lo ajustamos a las bases y lo llevamos a una versión lista para postular.",
  },
];

const faqs = [
  {
    question: "¿El borrador es un proyecto listo para presentar?",
    answer:
      "No. Es una primera versión con un desarrollo importante de la idea: ordena y amplía lo que contás, propone objetivos, actividades, cronograma y rubros de presupuesto, y marca los datos que tenés que completar. Para postular hay que ajustarlo a las bases vigentes de cada convocatoria.",
  },
  {
    question: "¿Con qué fondos y convocatorias trabajás?",
    answer:
      "Fondos nacionales como el FONAM, los Fondos Concursables para la Cultura y los Fondos de Incentivo Cultural del MEC, programas iberoamericanos como Ibermúsicas o Iberescena, llamados departamentales y auspicios privados, entre otros.",
  },
  {
    question: "¿Qué pasa con los datos que envío?",
    answer:
      "Se usan para redactar el borrador con inteligencia artificial y se guarda una copia para Sergio, de modo que pueda retomarlo si le escribís. No se usan para otros fines ni se comparten.",
  },
];

export default function ArmaProyectoPage() {
  return (
    <>
      <CulturalProjectServiceJsonLd faqs={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: BASE_URL },
          { name: "Armá tu proyecto", url: PAGE_URL },
        ]}
      />

      <div className="space-y-12">
        <section className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
            Gestión cultural
          </p>
          <h1 className="text-4xl font-semibold text-zinc-900">Armá tu proyecto cultural</h1>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-600">
            Contá tu idea y recibí un borrador desarrollado de tu proyecto, redactado con la metodología
            de formulación que uso para fondos como FONAM, Fondos Concursables para la Cultura, Ibermúsicas y más.
            No es un proyecto terminado: es una base sólida para seguir trabajando.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#formulario"
              className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700"
            >
              Generar mi borrador
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-900"
            >
              Prefiero hablar por WhatsApp
            </a>
          </div>
        </section>

        <ul className="grid gap-4 md:grid-cols-3">
          {benefits.map((item) => (
            <li key={item.title} className="rounded-xl border border-zinc-200 bg-white p-5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-3 h-6 w-6 text-zinc-700"
                aria-hidden="true"
              >
                {item.icon}
              </svg>
              <h2 className="mb-1 text-sm font-semibold text-zinc-900">{item.title}</h2>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </li>
          ))}
        </ul>

        <section className="space-y-4" aria-labelledby="como-funciona">
          <h2 id="como-funciona" className="text-2xl font-semibold text-zinc-900">
            Cómo funciona
          </h2>
          <ol className="grid gap-4 md:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900">{step.title}</h3>
                  <p className="text-sm text-zinc-500">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="formulario" className="scroll-mt-24">
          <ArmaProyectoForm />
        </section>

        <section className="space-y-4" aria-labelledby="preguntas-frecuentes">
          <h2 id="preguntas-frecuentes" className="text-2xl font-semibold text-zinc-900">
            Preguntas frecuentes
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {faqs.map((item) => (
              <article key={item.question} className="rounded-xl border border-zinc-200 bg-white p-5">
                <h3 className="text-base font-semibold text-zinc-900">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.answer}</p>
              </article>
            ))}
          </div>
          <p className="text-sm text-zinc-500">
            ¿Otra duda? Escribime a{" "}
            <a
              href="mailto:yosoy@sergioperez.uy?subject=Proyecto%20cultural"
              className="font-medium text-zinc-900 underline underline-offset-2"
            >
              yosoy@sergioperez.uy
            </a>
            .
          </p>
        </section>
      </div>
    </>
  );
}
