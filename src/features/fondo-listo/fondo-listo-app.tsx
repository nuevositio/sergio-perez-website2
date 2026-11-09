"use client";

import { useEffect, useMemo, useState } from "react";
import { CONVOCATORIAS, estadoDe, getConvocatoria } from "./convocatorias";
import { PLANES, PREGUNTAS, formatoPesos, type Chequeo, type PlanId } from "./schema";
import { trackEvent } from "@/components/analytics";

type Paso = 1 | 2 | 3 | 4;
const PASOS = ["Convocatoria", "Entrevista", "Chequeo", "Pago", "Tu proyecto"];
const AREAS = ["Todas", "General", "Música", "Artes escénicas", "Audiovisual", "Patrimonio", "Internacional"] as const;
const CLAVE = "fondo-listo-borrador";

type Guardado = {
  convocatoria: string;
  respuestas: Record<string, string>;
  nombre: string;
  email: string;
  telefono: string;
  resultado?: { code: string; token: string; chequeo: Chequeo };
};

const vacio: Guardado = { convocatoria: "fcc", respuestas: {}, nombre: "", email: "", telefono: "" };

export function FondoListoApp() {
  const [paso, setPaso] = useState<Paso>(1);
  const [d, setD] = useState<Guardado>(vacio);
  const [cargado, setCargado] = useState(false);

  // Retoma lo que la persona venía completando en este navegador
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CLAVE);
      if (raw) {
        const g = JSON.parse(raw) as Guardado;
        setD({ ...vacio, ...g });
        if (g.resultado) setPaso(3);
      }
    } catch {
      /* sin almacenamiento: se empieza de cero */
    }
    setCargado(true);
  }, []);

  useEffect(() => {
    if (!cargado) return;
    try {
      localStorage.setItem(CLAVE, JSON.stringify(d));
    } catch {
      /* ignorar */
    }
  }, [d, cargado]);

  function ir(p: Paso) {
    setPaso(p);
    document.getElementById("fondo-listo")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function reiniciar() {
    setD(vacio);
    try {
      localStorage.removeItem(CLAVE);
    } catch {
      /* ignorar */
    }
    ir(1);
  }

  return (
    <div id="fondo-listo" className="scroll-mt-24 space-y-6">
      <ol className="flex gap-2 overflow-x-auto pb-1" aria-label="Pasos">
        {PASOS.map((nombre, i) => {
          const n = i + 1;
          const actual = n === paso;
          const hecho = n < paso;
          return (
            <li key={nombre}>
              <span
                aria-current={actual ? "step" : undefined}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm ${
                  actual ? "border-zinc-900 font-semibold text-zinc-900" : "border-zinc-200 text-zinc-500"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                    actual ? "bg-zinc-900 text-white" : hecho ? "bg-[#f3e9df] text-[#7a4a22]" : "bg-zinc-100"
                  }`}
                >
                  {n}
                </span>
                {nombre}
              </span>
            </li>
          );
        })}
      </ol>

      {paso === 1 && (
        <PasoConvocatoria
          elegida={d.convocatoria}
          onElegir={(id) => setD((x) => ({ ...x, convocatoria: id, resultado: undefined }))}
          onSeguir={() => ir(2)}
        />
      )}
      {paso === 2 && (
        <PasoEntrevista
          d={d}
          setD={setD}
          onAtras={() => ir(1)}
          onResultado={(r) => {
            setD((x) => ({ ...x, resultado: r }));
            ir(3);
          }}
        />
      )}
      {paso >= 3 && d.resultado && (
        <PasoChequeo d={d} onPagar={() => setPaso(4)} onEditar={() => ir(2)} onReiniciar={reiniciar} />
      )}
    </div>
  );
}

// ─── Paso 1 ────────────────────────────────────────────────────────────────

function PasoConvocatoria({
  elegida,
  onElegir,
  onSeguir,
}: {
  elegida: string;
  onElegir: (id: string) => void;
  onSeguir: () => void;
}) {
  const [area, setArea] = useState<(typeof AREAS)[number]>("Todas");
  const lista = CONVOCATORIAS.filter((c) => area === "Todas" || c.area === area);
  const c = getConvocatoria(elegida) ?? CONVOCATORIAS[0];
  const estado = estadoDe(c);

  return (
    <section className={panel}>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-zinc-900">¿A qué convocatoria te vas a presentar?</h2>
        <p className="max-w-2xl text-zinc-600">
          Cada ficha está armada a partir de las bases oficiales. Si la convocatoria todavía no abrió, podés preparar
          tu proyecto con tiempo.
        </p>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por área">
        {AREAS.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setArea(a)}
            className={`rounded-full border px-3 py-1 text-sm ${
              a === area ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 bg-white text-zinc-600"
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        {lista.map((x) => {
          const e = estadoDe(x);
          const sel = x.id === c.id;
          return (
            <button
              key={x.id}
              type="button"
              onClick={() => onElegir(x.id)}
              aria-pressed={sel}
              className={`grid gap-1 rounded-lg border bg-white p-4 text-left transition ${
                sel ? "border-[#7a4a22] ring-1 ring-[#7a4a22]" : "border-zinc-200 hover:border-zinc-400"
              }`}
            >
              <span className="flex flex-wrap items-start justify-between gap-2">
                <span className="font-serif text-lg font-semibold text-zinc-900">{x.nombre}</span>
                <span
                  className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    e.tipo === "abierta" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"
                  }`}
                >
                  {e.tipo === "abierta" ? e.texto : "Próxima edición"}
                </span>
              </span>
              <span className="text-sm text-zinc-500">{x.organismo}</span>
              <span className="text-sm text-zinc-600">{x.tope}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-4 rounded-lg bg-zinc-50 p-5">
        <h3 className="text-lg font-semibold text-zinc-900">Ficha: {c.nombre}</h3>
        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <Dato titulo="Estado">{estado.texto}</Dato>
          <Dato titulo="Monto">{c.tope}</Dato>
          <Dato titulo="Quién puede postular">{c.quien}</Dato>
          <Dato titulo="Cómo evalúa el jurado">
            {c.criterios.length ? c.criterios.map((k) => `${k.nombre} ${k.puntos}`).join(" · ") : "Las bases no publican la ponderación."}
            {c.minimo ? ` · Mínimo ${c.minimo}.` : ""}
          </Dato>
          <Dato titulo="Documentos clave">
            <ul className="list-disc pl-4">
              {c.documentos.map((doc) => (
                <li key={doc}>{doc}</li>
              ))}
            </ul>
          </Dato>
          {c.noFinancia || c.nota ? <Dato titulo="A tener en cuenta">{[c.noFinancia, c.nota].filter(Boolean).join(" ")}</Dato> : null}
        </dl>
        <p className="text-xs text-zinc-500">
          Ficha revisada el {c.revisada}.{" "}
          <a href={c.bases} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            Ver las bases oficiales
          </a>
          .
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-zinc-500">¿Tu convocatoria no está? Escribime y la cargamos.</p>
        <button type="button" onClick={onSeguir} className={botonPrimario}>
          Empezar con esta convocatoria
        </button>
      </div>
    </section>
  );
}

function Dato({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-wide text-zinc-400">{titulo}</dt>
      <dd className="mt-1 text-zinc-700">{children}</dd>
    </div>
  );
}

// ─── Paso 2 ────────────────────────────────────────────────────────────────

function PasoEntrevista({
  d,
  setD,
  onAtras,
  onResultado,
}: {
  d: Guardado;
  setD: React.Dispatch<React.SetStateAction<Guardado>>;
  onAtras: () => void;
  onResultado: (r: { code: string; token: string; chequeo: Chequeo }) => void;
}) {
  const total = PREGUNTAS.length + 1; // + datos de contacto
  const [i, setI] = useState(0);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [website, setWebsite] = useState("");
  const c = getConvocatoria(d.convocatoria)!;

  const p = PREGUNTAS[i];
  const valor = p ? d.respuestas[p.id] ?? "" : "";
  const valida = p ? valor.trim().length >= (p.min ?? 0) && valor.length <= p.max : true;
  const contactoOk = d.nombre.trim().length >= 2 && /\S+@\S+\.\S+/.test(d.email);

  function responder(v: string) {
    setD((x) => ({ ...x, respuestas: { ...x.respuestas, [p!.id]: v }, resultado: undefined }));
  }

  async function enviar() {
    setEnviando(true);
    setError("");
    try {
      const res = await fetch("/api/fondo-listo/chequeo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          convocatoria: d.convocatoria,
          respuestas: Object.fromEntries(PREGUNTAS.map((q) => [q.id, d.respuestas[q.id] ?? ""])),
          nombre: d.nombre,
          email: d.email,
          telefono: d.telefono,
          website,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "No pudimos hacer el chequeo.");
      trackEvent("Lead", "fondo-listo-chequeo");
      onResultado(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No pudimos hacer el chequeo.");
    } finally {
      setEnviando(false);
    }
  }

  if (enviando) {
    return (
      <section className={panel} aria-live="polite" aria-busy="true">
        <h2 className="text-2xl font-semibold text-zinc-900">Analizando tu proyecto según las bases…</h2>
        <p className="text-zinc-600">
          Estamos revisando tus respuestas con la grilla del jurado de {c.nombre}. Suele llevar menos de un minuto.
        </p>
        <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-[#7a4a22]" />
        </div>
      </section>
    );
  }

  return (
    <section className={panel}>
      <div className="space-y-1.5">
        <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100">
          <div className="h-full rounded-full bg-[#7a4a22] transition-all" style={{ width: `${((i + 1) / total) * 100}%` }} />
        </div>
        <p className="text-sm tabular-nums text-zinc-500">
          Pregunta {i + 1} de {total} · {c.nombre}
        </p>
      </div>

      {p ? (
        <div className="grid gap-2">
          <label htmlFor={`q-${p.id}`} className="text-lg font-semibold text-zinc-900">
            {p.titulo}
          </label>
          <p className="max-w-2xl text-sm text-zinc-500">{p.ayuda}</p>
          {p.tipo === "opciones" ? (
            <div className="flex flex-wrap gap-2 pt-1" role="radiogroup" aria-labelledby={`q-${p.id}`}>
              {p.opciones!.map((o) => (
                <button
                  key={o}
                  type="button"
                  role="radio"
                  aria-checked={valor === o}
                  onClick={() => responder(o)}
                  className={`rounded-lg border px-3 py-2 text-sm ${
                    valor === o ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 bg-white text-zinc-700"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          ) : p.tipo === "largo" ? (
            <textarea
              id={`q-${p.id}`}
              value={valor}
              maxLength={p.max}
              onChange={(e) => responder(e.target.value)}
              rows={6}
              className={campo}
            />
          ) : (
            <input id={`q-${p.id}`} value={valor} maxLength={p.max} onChange={(e) => responder(e.target.value)} className={campo} />
          )}
          {p.tipo !== "opciones" ? (
            <span className="justify-self-end text-xs tabular-nums text-zinc-400">
              {valor.length.toLocaleString("es-UY")} / {p.max.toLocaleString("es-UY")}
              {p.min && valor.trim().length < p.min ? ` · mínimo ${p.min}` : ""}
            </span>
          ) : null}
        </div>
      ) : (
        <div className="grid gap-4">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900">¿A quién le mandamos el chequeo?</h3>
            <p className="text-sm text-zinc-500">Tus datos se usan solo para este proyecto. No se comparten.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1 text-sm font-medium text-zinc-700">
              Nombre de quien postula
              <input value={d.nombre} maxLength={120} onChange={(e) => setD((x) => ({ ...x, nombre: e.target.value }))} className={campo} />
            </label>
            <label className="grid gap-1 text-sm font-medium text-zinc-700">
              Correo
              <input type="email" value={d.email} maxLength={200} onChange={(e) => setD((x) => ({ ...x, email: e.target.value }))} className={campo} />
            </label>
            <label className="grid gap-1 text-sm font-medium text-zinc-700">
              WhatsApp (opcional)
              <input value={d.telefono} maxLength={40} onChange={(e) => setD((x) => ({ ...x, telefono: e.target.value }))} className={campo} />
            </label>
            <input
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="hidden"
              name="website"
            />
          </div>
          {error ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={() => (i === 0 ? onAtras() : setI(i - 1))} className={botonSecundario}>
          Atrás
        </button>
        {p ? (
          <button type="button" disabled={!valida} onClick={() => setI(i + 1)} className={botonPrimario}>
            Siguiente
          </button>
        ) : (
          <button type="button" disabled={!contactoOk} onClick={enviar} className={botonPrimario}>
            Ver mi chequeo
          </button>
        )}
      </div>
    </section>
  );
}

// ─── Pasos 3 y 4 ───────────────────────────────────────────────────────────

function PasoChequeo({
  d,
  onPagar,
  onEditar,
  onReiniciar,
}: {
  d: Guardado;
  onPagar: () => void;
  onEditar: () => void;
  onReiniciar: () => void;
}) {
  const { chequeo, token, code } = d.resultado!;
  const c = getConvocatoria(d.convocatoria)!;
  const total = useMemo(() => chequeo.criterios.reduce((a, k) => a + k.estimado, 0), [chequeo]);
  const maximo = useMemo(() => chequeo.criterios.reduce((a, k) => a + k.maximo, 0), [chequeo]);
  const [pagando, setPagando] = useState<PlanId | null>(null);
  const [whatsapp, setWhatsapp] = useState("");
  const [error, setError] = useState("");

  async function pagar(plan: PlanId) {
    trackEvent("InitiateCheckout", `fondo-listo-${plan}`, { value: PLANES[plan].precio, currency: "UYU" });
    setPagando(plan);
    setError("");
    onPagar();
    try {
      const res = await fetch("/api/fondo-listo/pago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, plan }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) throw new Error(data.error ?? "No pudimos iniciar el pago.");
      if (data.whatsapp) {
        setWhatsapp(data.url);
        window.open(data.url, "_blank", "noopener");
      } else {
        window.location.href = data.url;
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "No pudimos iniciar el pago.");
    } finally {
      setPagando(null);
    }
  }

  return (
    <section className={panel}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">Chequeo de encaje · {c.nombre}</p>
          <h2 className="mt-1 text-2xl font-semibold text-zinc-900">{d.respuestas.titulo}</h2>
        </div>
        <span className="rounded-md bg-zinc-100 px-2 py-1 font-mono text-xs text-zinc-600">{code}</span>
      </div>

      <div className="grid items-center gap-4 sm:grid-cols-[auto_1fr]">
        <p className="font-serif text-6xl tabular-nums text-zinc-900">
          {total}
          <span className="text-xl text-zinc-400"> / {maximo}</span>
        </p>
        <p className="text-zinc-600">{chequeo.resumen}</p>
      </div>

      <div className="grid gap-3">
        <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">Puntaje estimado según la grilla del jurado</p>
        {chequeo.criterios.map((k) => {
          const pct = k.maximo ? Math.round((k.estimado / k.maximo) * 100) : 0;
          return (
            <div key={k.nombre} className="grid gap-1">
              <div className="flex justify-between gap-3 text-sm">
                <span className="text-zinc-800">{k.nombre}</span>
                <span className="tabular-nums text-zinc-500">
                  {k.estimado} / {k.maximo}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
                <div className={`h-full rounded-full ${pct < 65 ? "bg-amber-500" : "bg-zinc-900"}`} style={{ width: `${pct}%` }} />
              </div>
              <p className="text-sm text-zinc-500">{k.comentario}</p>
            </div>
          );
        })}
        {c.minimo ? <p className="text-sm font-semibold text-[#7a4a22]">Mínimo para ser seleccionable: {c.minimo}.</p> : null}
      </div>

      <div className="grid gap-2">
        <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">¿Podés postular?</p>
        <ul className="grid gap-2">
          {chequeo.admisibilidad.map((a, j) => (
            <li key={j} className="flex gap-3 text-sm text-zinc-700">
              <span
                aria-label={a.estado}
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  a.estado === "ok"
                    ? "bg-emerald-50 text-emerald-700"
                    : a.estado === "atencion"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-red-50 text-red-700"
                }`}
              >
                {a.estado === "ok" ? "✓" : a.estado === "atencion" ? "!" : "✕"}
              </span>
              {a.texto}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-2">
        <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">Tres cosas para reforzar</p>
        {chequeo.refuerzos.map((r) => (
          <div key={r.titulo} className="rounded-lg border border-zinc-200 p-3 text-sm">
            <p className="font-semibold text-zinc-900">{r.titulo}</p>
            <p className="text-zinc-600">{r.detalle}</p>
          </div>
        ))}
      </div>

      {chequeo.documentos.length ? (
        <div className="grid gap-2">
          <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">Documentos que te faltan</p>
          <ul className="list-disc pl-5 text-sm text-zinc-700">
            {chequeo.documentos.map((doc) => (
              <li key={doc}>{doc}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-3">
        <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">Tu proyecto completo, escrito para estas bases</p>
        <div className="grid gap-4 md:grid-cols-2">
          {(Object.keys(PLANES) as PlanId[]).map((id) => {
            const plan = PLANES[id];
            const destacado = id === "revision";
            return (
              <div key={id} className={`grid content-start gap-3 rounded-xl border bg-white p-5 ${destacado ? "border-zinc-900" : "border-zinc-200"}`}>
                <h3 className="text-xl font-semibold text-zinc-900">{plan.nombre}</h3>
                <p className="font-serif text-3xl tabular-nums text-zinc-900">
                  {formatoPesos(plan.precio)} <span className="font-sans text-sm text-zinc-500">pago único</span>
                </p>
                <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-600">
                  {plan.incluye.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  disabled={pagando !== null}
                  onClick={() => pagar(id)}
                  className={destacado ? botonPrimario : botonSecundario}
                >
                  {pagando === id ? "Abriendo el pago…" : `Elegir ${plan.nombre}`}
                </button>
              </div>
            );
          })}
        </div>
        {error ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
        {whatsapp ? (
          <div className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-900">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">Enviá tu pedido por WhatsApp</a>{" "}
            con tu código <strong>{code}</strong> y te paso el enlace de pago. Cuando se confirme el pago, tu proyecto se
            escribe en esta dirección, que te conviene guardar:{" "}
            <a href={`/arma-tu-proyecto/p/${token}`} className="font-semibold underline underline-offset-2">
              ver mi proyecto
            </a>
            .
          </div>
        ) : null}
        <p className="text-xs text-zinc-500">
          El proyecto lo firma y lo presenta quien postula. Ningún servicio puede garantizar que un proyecto sea
          seleccionado: Fondo Listo te ayuda a presentarlo completo, coherente y dentro de las bases.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-zinc-100 pt-4">
        <button type="button" onClick={onEditar} className={botonSecundario}>
          Corregir respuestas
        </button>
        <button type="button" onClick={onReiniciar} className={botonSecundario}>
          Empezar otro proyecto
        </button>
      </div>
    </section>
  );
}

const panel = "grid gap-6 rounded-xl border border-zinc-200 bg-white p-5 md:p-8";
const campo =
  "w-full rounded-lg border border-zinc-200 bg-[#f8f7f4] px-3 py-2 text-[15px] text-zinc-900 outline-none focus:border-zinc-900";
const botonPrimario =
  "rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40";
const botonSecundario =
  "rounded-lg border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-900 disabled:opacity-40";
