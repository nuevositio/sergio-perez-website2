import type { Metadata } from "next";
import { BreadcrumbJsonLd, CulturalProjectServiceJsonLd } from "@/components/seo/json-ld";
import { FondoListoApp } from "@/features/fondo-listo/fondo-listo-app";

const BASE_URL = "https://www.sergioperez.uy";
const PAGE_URL = `${BASE_URL}/arma-tu-proyecto`;

export const metadata: Metadata = {
  title: "Armá tu proyecto cultural según las bases — Fondo Concursable, FONAM, FIC, Iber",
  description:
    "Elegí la convocatoria, respondé una entrevista guiada y mirá cómo te evaluaría el jurado. Después recibí tu proyecto completo, campo por campo y con el presupuesto en pesos.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Armá tu proyecto cultural | Sergio Pérez",
    description: "Tu proyecto escrito para las bases de la convocatoria: Fondo Concursable para la Cultura, FONAM, Incentivo Cultural, Iber y más.",
    url: PAGE_URL,
    type: "website",
  },
};

const pasos = [
  { titulo: "Elegís la convocatoria", texto: "Cada ficha está armada a partir de las bases oficiales: requisitos, montos, criterios y documentos." },
  { titulo: "Respondés una entrevista", texto: "Quince preguntas sobre tu idea, tu equipo, tu público y tu presupuesto. Unos 15 minutos." },
  { titulo: "Ves cómo te evaluaría el jurado", texto: "Puntaje estimado por criterio, si podés postular y las tres cosas que más puntos te suman." },
  { titulo: "Recibís tu proyecto completo", texto: "Campo por campo, con cronograma, presupuesto en pesos, modelos de cartas y lista de documentos." },
];

const faqs = [
  {
    question: "¿El proyecto queda listo para presentar?",
    answer:
      "Queda escrito completo y ajustado a las bases, pero lo firma y lo presenta quien postula: hay que revisarlo, completar los datos marcados y adjuntar la documentación. Con el plan con revisión, Sergio lo revisa con vos antes del cierre.",
  },
  {
    question: "¿Con qué convocatorias trabaja?",
    answer:
      "Fondo Concursable para la Cultura, Fondo Regional, FEFCA, Fondos de Incentivo Cultural, Fondo Nacional de Museos, FONAM, ACAU, Fortalecimiento de las Artes de Montevideo, Canelones PRENDE, Iberescena e Ibermúsicas. Si la tuya no está, escribime.",
  },
  {
    question: "¿Puedo usar un proyecto escrito con ayuda de IA?",
    answer:
      "Sí. Algunas convocatorias, como el Fondo Concursable para la Cultura 2026, piden declarar el uso de inteligencia artificial. El proyecto incluye un texto para esa declaración.",
  },
  {
    question: "¿Se garantiza que el proyecto sea seleccionado?",
    answer:
      "No. Ningún servicio puede garantizarlo: la decisión es del jurado. Fondo Listo te ayuda a presentar un proyecto completo, coherente y dentro de las bases.",
  },
  {
    question: "¿Qué pasa con mis datos?",
    answer:
      "Se usan para evaluar y escribir tu proyecto, y se guarda una copia para que Sergio pueda acompañarte si se lo pedís. No se comparten con nadie.",
  },
  {
    question: "¿Cómo se paga?",
    answer: "Con Mercado Pago, en pesos uruguayos. Tu proyecto se escribe apenas se confirma el pago.",
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
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a4a22]">
            Gestión cultural · Formulación de proyectos
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold text-zinc-900">
            Fondo Listo: tu proyecto escrito para las bases de la convocatoria
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-600">
            Elegís el fondo, respondés una entrevista guiada y ves cómo te evaluaría el jurado. Si te sirve, recibís el
            proyecto completo, campo por campo y con el presupuesto en pesos.
          </p>
        </section>

        <ol className="grid gap-4 md:grid-cols-4">
          {pasos.map((p, i) => (
            <li key={p.titulo} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <h2 className="text-sm font-semibold text-zinc-900">{p.titulo}</h2>
                <p className="text-sm text-zinc-500">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>

        <FondoListoApp />

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
        </section>
      </div>
    </>
  );
}
