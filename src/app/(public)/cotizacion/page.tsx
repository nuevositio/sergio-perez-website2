import type { Metadata } from "next";
import { CotizacionForm } from "@/features/cotizacion/cotizacion-form";

export const metadata: Metadata = {
  title: "Cotización Web Gratuita — Desarrollo, Hosting y Diseño Digital",
  description:
    "Solicitá tu cotización personalizada para desarrollo web, hosting, dominios o diseño digital en Uruguay. Respuesta en menos de 24 horas.",
  alternates: { canonical: "https://www.sergioperez.uy/cotizacion" },
  openGraph: {
    title: "Cotización Web Gratuita | Sergio Pérez",
    description:
      "Cotización personalizada para desarrollo web, hosting, dominios o diseño digital. Respuesta en menos de 24 horas.",
    url: "https://www.sergioperez.uy/cotizacion",
    type: "website",
  },
};

const WA_BASE = "https://wa.me/59895342022?text=";

export default function CotizacionPage() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
          Cotización
        </p>
        <h1 className="text-4xl font-semibold text-zinc-900">Cotización Web Gratuita</h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-600">
          Completá el formulario y recibí una propuesta personalizada en menos de 24 horas.
          Sin costos ni compromisos.
        </p>
      </section>

      {/* Quick contact */}
      <div className="flex flex-wrap gap-3 rounded-xl border border-zinc-200 bg-white p-5">
        <p className="w-full text-sm font-medium text-zinc-700">
          ¿Preferís hablar directamente?
        </p>
        <a
          href={`${WA_BASE}Hola%20Sergio%2C%20quiero%20cotizar%20un%20proyecto%20web`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          Escribir por WhatsApp
        </a>
        <a
          href="mailto:yosoy@sergioperez.uy?subject=Cotizaci%C3%B3n%20web"
          className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-900"
        >
          Enviar email
        </a>
      </div>

      {/* Form */}
      <CotizacionForm />
    </div>
  );
}
