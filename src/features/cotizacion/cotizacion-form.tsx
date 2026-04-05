"use client";

import { useRef } from "react";

export function CotizacionForm() {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit() {
    const f = formRef.current;
    if (!f) return;

    const get = (id: string) => {
      const el = f.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("#" + id);
      return el ? el.value.trim() : "";
    };
    const checks = Array.from(f.querySelectorAll<HTMLInputElement>('[name="services"]:checked'))
      .map((c) => c.value)
      .join(", ") || "No especificado";

    const msg =
      "🌐 *Cotización web*\n\n" +
      "*Proyecto:* " + (get("projectName") || "–") + "\n" +
      "*Tipo:* " + (get("projectType") || "–") + "\n" +
      "*Descripción:* " + (get("projectDescription") || "–") + "\n" +
      "*Servicios:* " + checks + "\n" +
      "*Presupuesto:* " + (get("budget") || "Sin definir") + "\n" +
      "*Plazo:* " + (get("deadline") || "Sin preferencia") + "\n\n" +
      "*Contacto*\n" +
      "*Nombre:* " + (get("contactName") || "–") + "\n" +
      "*Email:* " + (get("contactEmail") || "–") + "\n" +
      "*Teléfono:* " + (get("contactPhone") || "–") + "\n" +
      "*País:* " + (get("country") || "–") + "\n" +
      "*Notas:* " + (get("extraNotes") || "–");

    window.open("https://wa.me/59895342022?text=" + encodeURIComponent(msg), "_blank");
  }

  return (
    <form ref={formRef} className="space-y-8 rounded-xl border border-zinc-200 bg-white p-6 md:p-8">
      {/* Información del proyecto */}
      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
          Información del proyecto
        </legend>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="projectName" className="text-sm font-medium text-zinc-700">
              Nombre del proyecto / empresa <span className="text-red-500">*</span>
            </label>
            <input
              id="projectName"
              name="projectName"
              type="text"
              required
              placeholder="Ej: Mi Emprendimiento Cultural"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="projectType" className="text-sm font-medium text-zinc-700">
              Tipo de proyecto <span className="text-red-500">*</span>
            </label>
            <select
              id="projectType"
              name="projectType"
              required
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            >
              <option value="">Seleccioná una opción</option>
              <option value="cultural">Organización / proyecto cultural</option>
              <option value="artista">Artista / músico / gestor</option>
              <option value="emprendimiento">Emprendimiento personal</option>
              <option value="empresa">Empresa o PyME</option>
              <option value="ecommerce">Tienda online / e-commerce</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="projectDescription" className="text-sm font-medium text-zinc-700">
            Descripción del proyecto <span className="text-red-500">*</span>
          </label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            rows={4}
            required
            placeholder="Contame brevemente en qué consiste tu proyecto, qué hace falta y cuál es el objetivo del sitio web..."
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="targetAudience" className="text-sm font-medium text-zinc-700">
            Audiencia objetivo
          </label>
          <textarea
            id="targetAudience"
            name="targetAudience"
            rows={2}
            placeholder="¿A quién está dirigido tu proyecto?"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
          />
        </div>
      </fieldset>

      {/* Servicio requerido */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
          Servicio requerido
        </legend>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {[
            "Sitio web / landing page",
            "Tienda online",
            "Rediseño de sitio existente",
            "Hosting y dominio",
            "Correo corporativo",
            "Registro de marca",
            "Gestión de redes sociales",
            "SEO y posicionamiento",
            "Otro",
          ].map((s) => (
            <label key={s} className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                name="services"
                value={s}
                className="h-4 w-4 rounded border-zinc-300 accent-zinc-900"
              />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Presupuesto y plazo */}
      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
          Presupuesto y plazos
        </legend>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="budget" className="text-sm font-medium text-zinc-700">
              Presupuesto estimado (USD)
            </label>
            <select
              id="budget"
              name="budget"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            >
              <option value="">Sin definir</option>
              <option value="menos-300">Menos de USD 300</option>
              <option value="300-600">USD 300 – 600</option>
              <option value="600-1200">USD 600 – 1.200</option>
              <option value="1200-2500">USD 1.200 – 2.500</option>
              <option value="mas-2500">Más de USD 2.500</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="deadline" className="text-sm font-medium text-zinc-700">
              Plazo deseado de entrega
            </label>
            <select
              id="deadline"
              name="deadline"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            >
              <option value="">Sin preferencia</option>
              <option value="urgente">Urgente (menos de 2 semanas)</option>
              <option value="1mes">1 mes</option>
              <option value="2-3meses">2 a 3 meses</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* Datos de contacto */}
      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
          Datos de contacto
        </legend>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="contactName" className="text-sm font-medium text-zinc-700">
              Tu nombre <span className="text-red-500">*</span>
            </label>
            <input
              id="contactName"
              name="contactName"
              type="text"
              required
              placeholder="Nombre completo"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="contactEmail" className="text-sm font-medium text-zinc-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              required
              placeholder="tu@email.com"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="contactPhone" className="text-sm font-medium text-zinc-700">
              Teléfono / WhatsApp
            </label>
            <input
              id="contactPhone"
              name="contactPhone"
              type="tel"
              placeholder="+598 9x xxx xxx"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="country" className="text-sm font-medium text-zinc-700">
              País
            </label>
            <select
              id="country"
              name="country"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            >
              <option value="UY">Uruguay</option>
              <option value="AR">Argentina</option>
              <option value="BR">Brasil</option>
              <option value="ES">España</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="extraNotes" className="text-sm font-medium text-zinc-700">
            Información adicional
          </label>
          <textarea
            id="extraNotes"
            name="extraNotes"
            rows={3}
            placeholder="Referencias de sitios que te gusten, colores, funcionalidades especiales..."
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
          />
        </div>
      </fieldset>

      {/* Submit */}
      <div className="flex flex-col items-start gap-3 border-t border-zinc-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-zinc-400">
          Al enviar, se abrirá WhatsApp con un resumen de tu consulta.
        </p>
        <button
          type="button"
          onClick={handleSubmit}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488" />
          </svg>
          Enviar por WhatsApp
        </button>
      </div>
    </form>
  );
}
