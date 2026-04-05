import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contacto — Escribime",
  description:
    "Conectá con Sergio Pérez para proyectos culturales, desarrollo web o consultoria de comunicación estratégica. Respuesta en 24 a 48 horas.",
  alternates: { canonical: "https://www.sergioperez.uy/contacto" },
  openGraph: {
    title: "Contacto — Sergio Pérez",
    description:
      "Escribime para hablar de tu proyecto cultural, plataforma web o estrategia de comunicación.",
    url: "https://www.sergioperez.uy/contacto",
    type: "website",
  },
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Contacto</p>
        <h1 className="text-4xl font-semibold text-zinc-900">Hablemos</h1>
        <p className="text-base leading-relaxed text-zinc-600">
          Si tenés un proyecto cultural, querés desarrollar una plataforma web o buscás
          acompañamiento en comunicación estratégica, escribime. Trabajo con personas y
          organizaciones que valoran el criterio profesional.
        </p>
      </section>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <dl className="space-y-4">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Email</dt>
            <dd className="mt-1">
              <a
                href="mailto:yosoy@sergioperez.uy"
                className="text-zinc-900 underline underline-offset-2 hover:text-zinc-600"
              >
                yosoy@sergioperez.uy
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Tiempo de respuesta</dt>
            <dd className="mt-1 text-sm text-zinc-600">24 a 48 horas hábiles.</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Disponibilidad</dt>
            <dd className="mt-1 text-sm text-zinc-600">
              Abierto a colaboraciones puntuales y proyectos de mediana y larga duración.
            </dd>
          </div>
        </dl>
      </div>

      <p className="text-sm text-zinc-500">
        También podés revisar mis{" "}
        <Link href="/servicios" className="font-semibold text-zinc-800 underline underline-offset-2">
          servicios
        </Link>{" "}
        para ver cómo puedo ayudarte antes de escribir.
      </p>
    </div>
  );
}
