"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { trackLead } from "@/components/analytics";
import { DraftView } from "./draft-view";
import { BUDGETS, DEPARTMENTS, DISCIPLINES, FUNDS, STAGES, type Option } from "./options";
import {
  DESCRIPTION_MAX,
  describeRequest,
  formDataToRequest,
  projectRequestSchema,
  type ProjectRequest,
} from "./schema";

const WHATSAPP_NUMBER = "59895342022";
const CONTACT_EMAIL = "yosoy@sergioperez.uy";

const fieldClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 user-invalid:border-red-400 user-invalid:ring-1 user-invalid:ring-red-400";

type State =
  | { status: "idle" }
  | { status: "generating" | "done"; markdown: string; code: string | null; title: string }
  | { status: "error"; message: string; request: ProjectRequest | null };

function fallbackMessage(r: ProjectRequest) {
  return [
    "Hola Sergio, quiero orientación para armar mi proyecto cultural.",
    "",
    describeRequest(r),
    "",
    `Contacto: ${r.contactName} · ${r.contactEmail}${r.contactPhone ? ` · ${r.contactPhone}` : ""}`,
  ].join("\n");
}

export function ArmaProyectoForm() {
  const [state, setState] = useState<State>({ status: "idle" });
  const [descriptionLength, setDescriptionLength] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Solo llega acá si pasó la validación nativa (required, type="email", etc.)
    event.preventDefault();
    const parsed = projectRequestSchema.safeParse(formDataToRequest(new FormData(event.currentTarget)));
    if (!parsed.success) {
      setState({ status: "error", message: "Revisá los campos marcados del formulario.", request: null });
      return;
    }
    const request = parsed.data;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    trackLead("arma_proyecto_borrador");
    setState({ status: "generating", markdown: "", code: null, title: request.projectTitle });
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));

    try {
      const response = await fetch("/api/arma-proyecto/borrador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
        signal: controller.signal,
      });
      if (!response.ok || !response.body) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "No se pudo generar el borrador.");
      }

      const code = response.headers.get("X-Draft-Code");
      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      let markdown = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        markdown += value;
        setState({ status: "generating", markdown, code, title: request.projectTitle });
      }
      setState({ status: "done", markdown, code, title: request.projectTitle });
    } catch (error) {
      if (controller.signal.aborted) return;
      const message =
        error instanceof Error && error.message !== "network error" && !error.message.startsWith("Failed")
          ? error.message
          : "Se cortó la conexión mientras se generaba el borrador.";
      setState({ status: "error", message, request });
    }
  }

  const busy = state.status === "generating";

  return (
    <div className="space-y-8">
    <form
      onSubmit={handleSubmit}
      aria-labelledby="arma-proyecto-form-title"
      className="space-y-8 rounded-xl border border-zinc-200 bg-white p-6 md:p-8"
    >
      <div className="space-y-1">
        <h2 id="arma-proyecto-form-title" className="text-xl font-semibold text-zinc-900">
          Contame tu proyecto
        </h2>
        <p className="text-sm text-zinc-500">
          Con estos datos se redacta un borrador de tu proyecto con la metodología que uso para formular.
          Los campos con <span className="text-red-500">*</span> son obligatorios.
        </p>
      </div>

      {/* Honeypot anti-spam: invisible para personas */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <fieldset className="space-y-5">
        <legend className="mb-1 text-sm font-semibold uppercase tracking-wide text-zinc-400">
          1. Datos del proyecto
        </legend>

        <div className="grid gap-5 md:grid-cols-2">
          <Field id="projectTitle" label="Título del proyecto" required>
            <input
              id="projectTitle"
              name="projectTitle"
              type="text"
              required
              maxLength={120}
              placeholder="Nombre provisorio de tu proyecto"
              className={fieldClass}
            />
          </Field>

          <Field id="discipline" label="Disciplina artística" required>
            <select id="discipline" name="discipline" required defaultValue="" className={fieldClass}>
              <option value="" disabled>
                Seleccioná una disciplina
              </option>
              <OptionList options={DISCIPLINES} />
            </select>
          </Field>
        </div>

        <Field id="stage" label="¿En qué etapa está?" required>
          <select id="stage" name="stage" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Seleccioná una etapa
            </option>
            <OptionList options={STAGES} />
          </select>
        </Field>

        <Field
          id="description"
          label="Descripción del proyecto"
          required
          hint={`${descriptionLength}/${DESCRIPTION_MAX}`}
        >
          <textarea
            id="description"
            name="description"
            rows={5}
            required
            minLength={30}
            maxLength={DESCRIPTION_MAX}
            onChange={(e) => setDescriptionLength(e.target.value.length)}
            aria-describedby="description-help"
            placeholder="¿Qué querés hacer, con quién, dónde y para qué público? ¿Qué resultado esperás?"
            className={fieldClass}
          />
          <p id="description-help" className="text-xs text-zinc-400">
            Unas líneas alcanzan: lo ordenamos juntos después.
          </p>
        </Field>

        <div className="grid gap-5 md:grid-cols-2">
          <Field id="department" label="Departamento">
            <select id="department" name="department" defaultValue="" className={fieldClass}>
              <option value="">Seleccioná</option>
              <OptionList options={DEPARTMENTS} />
            </select>
          </Field>

          <Field id="budget" label="Presupuesto estimado">
            <select id="budget" name="budget" defaultValue="" className={fieldClass}>
              <option value="">Sin definir</option>
              <OptionList options={BUDGETS} />
            </select>
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-1 text-sm font-semibold uppercase tracking-wide text-zinc-400">
          2. Fondos y convocatorias
        </legend>
        <p className="text-xs text-zinc-500">
          Marcá los fondos a los que evaluás presentarte. Si no lo tenés claro, elegí la última opción.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {FUNDS.map((fund) => (
            <label
              key={fund.value}
              className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-zinc-200 px-3 py-2.5 text-sm text-zinc-700 transition hover:border-zinc-400 has-checked:border-zinc-900 has-checked:bg-zinc-50"
            >
              <input
                type="checkbox"
                name="funds"
                value={fund.value}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-300 accent-zinc-900"
              />
              {fund.label}
            </label>
          ))}
        </div>
        <div className="max-w-xs">
          <Field id="deadline" label="Fecha de cierre de la convocatoria (si la sabés)">
            <input id="deadline" name="deadline" type="date" className={fieldClass} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="mb-1 text-sm font-semibold uppercase tracking-wide text-zinc-400">
          3. Datos de contacto
        </legend>
        <div className="grid gap-5 md:grid-cols-2">
          <Field id="contactName" label="Tu nombre" required>
            <input
              id="contactName"
              name="contactName"
              type="text"
              required
              autoComplete="name"
              placeholder="Nombre y apellido"
              className={fieldClass}
            />
          </Field>
          <Field id="contactEmail" label="Email" required>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              required
              autoComplete="email"
              placeholder="tu@email.com"
              className={fieldClass}
            />
          </Field>
          <div className="md:col-span-2">
            <Field id="contactPhone" label="Teléfono / WhatsApp">
              <input
                id="contactPhone"
                name="contactPhone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="+598 9x xxx xxx"
                className={fieldClass}
              />
            </Field>
          </div>
        </div>
        <Field id="comments" label="Comentarios adicionales">
          <textarea
            id="comments"
            name="comments"
            rows={3}
            maxLength={600}
            placeholder="¿Alguna pregunta o dato extra que quieras compartir?"
            className={fieldClass}
          />
        </Field>
      </fieldset>

      <div className="flex flex-col gap-3 border-t border-zinc-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-zinc-400">
          Tus datos se usan solo para generar el borrador y para que pueda contactarte. Recibo una copia.
        </p>
        <button
          type="submit"
          disabled={busy}
          className="rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-wait disabled:opacity-60"
        >
          {busy ? "Generando borrador…" : state.status === "done" ? "Generar de nuevo" : "Generar mi borrador"}
        </button>
      </div>
    </form>

    <div ref={resultRef} className="scroll-mt-24">
      {state.status === "generating" || state.status === "done" ? (
        <DraftView markdown={state.markdown} code={state.code} title={state.title} status={state.status} />
      ) : null}

      {state.status === "error" ? (
        <div role="alert" className="space-y-3 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
          <p className="font-medium">{state.message}</p>
          {state.request ? (
            <>
              <p>Podés enviarme igual los datos de tu proyecto y te respondo personalmente:</p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fallbackMessage(state.request))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-semibold text-white transition hover:bg-green-700"
                >
                  <WhatsAppIcon />
                  Enviar por WhatsApp
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Proyecto cultural: ${state.request.projectTitle}`)}&body=${encodeURIComponent(fallbackMessage(state.request))}`}
                  className="rounded-lg border border-red-200 bg-white px-4 py-2 font-semibold text-zinc-700 transition hover:border-zinc-900"
                >
                  Enviar por email
                </a>
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
    </div>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-zinc-700">
          {label} {required ? <span className="text-red-500" aria-hidden="true">*</span> : null}
        </label>
        {hint ? <span className="text-xs tabular-nums text-zinc-400">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}

function OptionList({ options }: { options: Option[] }) {
  return options.map((o) => (
    <option key={o.value} value={o.value}>
      {o.label}
    </option>
  ));
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488" />
    </svg>
  );
}
