import type { Metadata } from "next";
import { ArmaProyectoForm } from "@/features/arma-proyecto/arma-proyecto-form";

export const metadata: Metadata = {
  title: "Armá tu Proyecto Cultural — FONAM, Fondos Concursables, Ibermusicas",
  description:
    "Diseñá las líneas principales de tu proyecto cultural para FONAM, Fondos Concursables, Ibermusicas y más. Orientación metodológica personalizada con Sergio Pérez.",
  alternates: { canonical: "https://www.sergioperez.uy/arma-tu-proyecto" },
  openGraph: {
    title: "Armá tu Proyecto Cultural | Sergio Pérez",
    description:
      "Orientación metodológica personalizada para fondos culturales: FONAM, Fondos Concursables, Ibermusicas.",
    url: "https://www.sergioperez.uy/arma-tu-proyecto",
    type: "website",
  },
};

const WA_BASE = "https://wa.me/59895342022?text=";

export default function ArmaProyectoPage() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
          Gestión cultural
        </p>
        <h1 className="text-4xl font-semibold text-zinc-900">
          Armá tu proyecto cultural
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-600">
          Esbozá las líneas principales de tu proyecto y recibí orientación metodológica
          personalizada para fondos como FONAM, Fondos Concursables, Ibermusicas y más.
        </p>
      </section>

      {/* What you get */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            ),
            title: "Estructurá tu idea",
            desc: "Definí área, objetivo y presupuesto con una guía paso a paso.",
          },
          {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
              </svg>
            ),
            title: "Orientación de fondos",
            desc: "Identificá el fondo más adecuado para tu proyecto cultural.",
          },
          {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            ),
            title: "Acompañamiento",
            desc: "Recibí feedback y apoyo metodológico de Sergio directamente.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-zinc-200 bg-white p-5"
          >
            <div className="mb-3 text-zinc-700">{item.icon}</div>
            <h3 className="mb-1 text-sm font-semibold text-zinc-900">{item.title}</h3>
            <p className="text-sm text-zinc-500">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Quick contact */}
      <div className="flex flex-wrap gap-3 rounded-xl border border-zinc-200 bg-white p-5">
        <p className="w-full text-sm font-medium text-zinc-700">
          ¿Preferís hablar directamente?
        </p>
        <a
          href={`${WA_BASE}Hola%20Sergio%2C%20quiero%20orientaci%C3%B3n%20para%20armar%20un%20proyecto%20cultural`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          Escribir por WhatsApp
        </a>
        <a
          href="mailto:yosoy@sergioperez.uy?subject=Proyecto%20cultural"
          className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-900"
        >
          Enviar email
        </a>
      </div>

      {/* Form */}
      <ArmaProyectoForm />
    </div>
  );
}
