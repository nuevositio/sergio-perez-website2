"use client";

import { useRef } from "react";
import { trackLead } from "@/components/analytics";

export function ArmaProyectoForm() {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit() {
    const f = formRef.current;
    if (!f) return;

    const get = (id: string) => {
      const el = f.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("#" + id);
      return el ? el.value.trim() : "";
    };
    const checks = Array.from(f.querySelectorAll<HTMLInputElement>('[name="funds"]:checked'))
      .map((c) => c.value)
      .join(", ") || "No especificado";

    const msg =
      "🎭 *Armá tu proyecto – Consulta gestión cultural*\n\n" +
      "*Proyecto:* " + (get("projectTitle") || "–") + "\n" +
      "*Disciplina:* " + (get("discipline") || "–") + "\n" +
      "*Descripción:* " + (get("description") || "–") + "\n" +
      "*Fondos de interés:* " + checks + "\n" +
      "*Presupuesto estimado:* " + (get("budget") || "Sin definir") + "\n" +
      "*Departamento:* " + (get("department") || "–") + "\n\n" +
      "*Contacto*\n" +
      "*Nombre:* " + (get("contactName") || "–") + "\n" +
      "*Email:* " + (get("contactEmail") || "–") + "\n" +
      "*Teléfono:* " + (get("contactPhone") || "–") + "\n" +
      "*Comentarios:* " + (get("comments") || "–");

    trackLead("arma_proyecto_form_whatsapp");
    window.open("https://wa.me/59895342022?text=" + encodeURIComponent(msg), "_blank");
  }

  return (
    <form ref={formRef} className="space-y-8 rounded-xl border border-zinc-200 bg-white p-6 md:p-8">
      {/* Datos del proyecto */}
      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
          Datos del proyecto
        </legend>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="projectTitle" className="text-sm font-medium text-zinc-700">
              Título del proyecto <span className="text-red-500">*</span>
            </label>
            <input
              id="projectTitle"
              name="projectTitle"
              type="text"
              required
              placeholder="Nombre de tu proyecto"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="discipline" className="text-sm font-medium text-zinc-700">
              Disciplina artística <span className="text-red-500">*</span>
            </label>
            <select
              id="discipline"
              name="discipline"
              required
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            >
              <option value="">Seleccioná una disciplina</option>
              <option value="musica">Música</option>
              <option value="teatro">Teatro</option>
              <option value="danza">Danza</option>
              <option value="artes-visuales">Artes Visuales</option>
              <option value="audiovisual">Audiovisual / Cine</option>
              <option value="literatura">Literatura</option>
              <option value="patrimonio">Patrimonio cultural</option>
              <option value="multidisciplinario">Multidisciplinario</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="description" className="text-sm font-medium text-zinc-700">
            Descripción del proyecto <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            placeholder="Describí brevemente tu proyecto: qué es, qué hace, qué resultados esperás..."
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="department" className="text-sm font-medium text-zinc-700">
              Departamento (Uruguay)
            </label>
            <select
              id="department"
              name="department"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            >
              <option value="">Seleccioná</option>
              {[
                "Artigas","Canelones","Cerro Largo","Colonia","Durazno",
                "Flores","Florida","Lavalleja","Maldonado","Montevideo",
                "Paysandú","Río Negro","Rivera","Rocha","Salto",
                "San José","Soriano","Tacuarembó","Treinta y Tres",
              ].map((d) => (
                <option key={d} value={d.toLowerCase().replace(/ /g, "-")}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="budget" className="text-sm font-medium text-zinc-700">
              Presupuesto estimado del proyecto
            </label>
            <select
              id="budget"
              name="budget"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            >
              <option value="">Sin definir</option>
              <option value="menos-50k">Menos de $50.000</option>
              <option value="50k-150k">$50.000 – $150.000</option>
              <option value="150k-300k">$150.000 – $300.000</option>
              <option value="300k-500k">$300.000 – $500.000</option>
              <option value="mas-500k">Más de $500.000</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* Fondos de interés */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
          Fondos de interés
        </legend>
        <p className="text-xs text-zinc-500">
          Seleccioná los fondos o convocatorias a los que evalúas presentarte.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "FONAM – Fondo Nacional de Música",
            "Fondos Concursables MEC",
            "Llamados Departamentales / IMM",
            "FOCA / Fondos de Cooperación",
            "Fondo de Incentivo Cultural (FIC)",
            "Fondos Internacionales (OEI, Ibercultura, etc.)",
            "Auspicios empresariales",
            "No sé / necesito orientación",
          ].map((s) => (
            <label key={s} className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                name="funds"
                value={s}
                className="h-4 w-4 rounded border-zinc-300 accent-zinc-900"
              />
              {s}
            </label>
          ))}
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
          <div className="space-y-1.5 md:col-span-2">
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
        </div>
        <div className="space-y-1.5">
          <label htmlFor="comments" className="text-sm font-medium text-zinc-700">
            Comentarios adicionales
          </label>
          <textarea
            id="comments"
            name="comments"
            rows={3}
            placeholder="¿Tenés alguna pregunta o info extra que quieras compartir?"
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
