"use client";

import { useEffect, useRef, useState } from "react";
import { DraftBody } from "@/features/arma-proyecto/draft-view";
import { PLANES, formatoPesos, type PlanId } from "./schema";

const WHATSAPP = "59895342022";

type Props = {
  token: string;
  code: string;
  titulo: string;
  convocatoria: string;
  estado: string;
  plan: string | null;
  proyecto: string | null;
  paymentId: string | null;
  linkPago: string | null;
  monto: string | null;
  chequeo: { total: number; maximo: number; minimo: string | null; texto: string } | null;
};

export function ProyectoView(props: Props) {
  const [texto, setTexto] = useState(props.proyecto ?? "");
  const [fase, setFase] = useState<"esperando" | "escribiendo" | "listo" | "error">(
    props.proyecto ? "listo" : "esperando",
  );
  const iniciado = useRef(false);
  const [eligiendo, setEligiendo] = useState<PlanId | null>(null);

  async function elegir(plan: PlanId) {
    setEligiendo(plan);
    try {
      const res = await fetch("/api/fondo-listo/pago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: props.token, plan }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.whatsapp && data.url) window.open(data.url, "_blank", "noopener");
      window.location.reload();
    } catch {
      setEligiendo(null);
    }
  }
  const cuerpo = useRef<HTMLDivElement>(null);

  async function escribir() {
    setFase("escribiendo");
    setTexto("");
    try {
      const qs = props.paymentId ? `?payment_id=${encodeURIComponent(props.paymentId)}` : "";
      const res = await fetch(`/api/fondo-listo/proyecto/${props.token}${qs}`, { method: "POST" });
      if (res.status === 402) return setFase("esperando");
      if (res.status === 409) {
        setTimeout(escribir, 20_000);
        return;
      }
      if (!res.ok || !res.body) throw new Error();
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acumulado = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acumulado += dec.decode(value, { stream: true });
        setTexto(acumulado);
      }
      setFase("listo");
    } catch {
      setFase("error");
    }
  }

  useEffect(() => {
    if (iniciado.current || props.proyecto) return;
    iniciado.current = true;
    if (["pagado", "generando"].includes(props.estado) || props.paymentId) void escribir();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nombreArchivo = `Proyecto - ${props.titulo}`.replace(/[\\/:*?"<>|]/g, "");

  function descargar() {
    const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${nombreArchivo}</title>
<style>body{font-family:Georgia,serif;max-width:720px;margin:40px auto;padding:0 16px;line-height:1.55;color:#18181b}
h1{font-size:24px}h2{font-size:18px;margin-top:28px}h3{font-size:15px}mark{background:#fef3c7}</style></head><body>
${cuerpo.current?.innerHTML ?? ""}
<p style="margin-top:40px;font-size:12px;color:#71717a">Fondo Listo · sergioperez.uy · ${props.code}</p></body></html>`;
    const blob = new Blob(["﻿", html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${nombreArchivo}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const waTexto = props.linkPago
    ? `Hola Sergio, ya pagué Fondo Listo para mi proyecto "${props.titulo}". Mi código es ${props.code}. Te adjunto el comprobante.`
    : `Hola Sergio, tengo una consulta sobre mi proyecto "${props.titulo}" (código ${props.code}).`;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Fondo Listo · {props.convocatoria}</p>
        <h1 className="text-3xl font-semibold text-zinc-900">{props.titulo}</h1>
        <p className="font-mono text-xs text-zinc-500">{props.code}</p>
      </div>

      {fase === "esperando" && props.chequeo && (
        <section className="space-y-5 rounded-xl border border-zinc-200 bg-white p-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Tu chequeo</p>
            <p className="font-serif text-5xl tabular-nums text-zinc-900">
              {props.chequeo.total}
              <span className="text-2xl text-zinc-400"> / {props.chequeo.maximo}</span>
            </p>
            {props.chequeo.minimo ? <p className="text-sm text-zinc-500">Mínimo: {props.chequeo.minimo}.</p> : null}
            <p className="text-zinc-600">{props.chequeo.texto}</p>
          </div>
          <div className="space-y-3 border-t border-zinc-100 pt-5">
            <h2 className="text-xl font-semibold text-zinc-900">Elegí tu plan</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {(Object.keys(PLANES) as PlanId[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  disabled={eligiendo !== null}
                  onClick={() => elegir(id)}
                  className="grid gap-1 rounded-lg border border-zinc-200 p-4 text-left hover:border-zinc-900"
                >
                  <span className="font-semibold text-zinc-900">{PLANES[id].nombre}</span>
                  <span className="text-sm text-zinc-600">{formatoPesos(PLANES[id].precio)}</span>
                  <span className="text-xs text-zinc-400">{eligiendo === id ? "Un momento…" : PLANES[id].incluye[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {fase === "esperando" && !props.chequeo && (
        <section className="space-y-3 rounded-xl border border-zinc-200 bg-white p-6">
          {props.linkPago ? (
            <>
              <h2 className="text-xl font-semibold text-zinc-900">Último paso: el pago</h2>
              <p className="text-zinc-600">
                Pagá {props.monto ?? ""} con Mercado Pago (tarjeta, débito o efectivo). Cuando el pago se acredite,
                habilitamos tu proyecto y se escribe en esta misma página. <strong>Guardá esta dirección</strong> para
                volver.
              </p>
              <p className="text-sm text-zinc-600">
                Tu código de pedido es <strong className="font-mono">{props.code}</strong>. Para habilitarlo más rápido,
                mandanos el comprobante por WhatsApp con ese código.
              </p>
              <a
                href={props.linkPago}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-[#009ee3] px-5 py-3 text-sm font-semibold text-white"
              >
                Pagar {props.monto ?? ""} con Mercado Pago
              </a>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-zinc-900">Esperando la confirmación del pago</h2>
              <p className="text-zinc-600">
                Cuando el pago se confirme, tu proyecto se escribe en esta misma página. Guardá esta dirección. Si ya
                pagaste, probá de nuevo en unos minutos.
              </p>
            </>
          )}
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={escribir} className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white">
              Ya pagué, revisar
            </button>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waTexto)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </section>
      )}

      {fase === "error" && (
        <section className="space-y-3 rounded-xl border border-red-200 bg-red-50 p-6 text-red-900">
          <p>No pudimos terminar de escribir tu proyecto. Tu pago está registrado: probá de nuevo.</p>
          <button type="button" onClick={escribir} className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white">
            Reintentar
          </button>
        </section>
      )}

      {(fase === "escribiendo" || fase === "listo") && (
        <section aria-live="polite" aria-busy={fase !== "listo"} className="space-y-6 rounded-xl border border-zinc-200 bg-white p-6 md:p-8">
          <p className="text-sm text-zinc-500">
            {fase === "listo" ? (
              <>
                Revisalo con calma. Lo marcado en <mark className="rounded bg-amber-100 px-1 text-amber-900">amarillo</mark> son
                datos que tenés que completar antes de postular.
              </>
            ) : (
              "Escribiendo tu proyecto según las bases… suele llevar entre 2 y 4 minutos. No cierres esta página."
            )}
          </p>
          <div ref={cuerpo} className="space-y-3 text-[15px] leading-relaxed text-zinc-700">
            <DraftBody markdown={texto} />
            {fase !== "listo" ? <span className="inline-block h-4 w-2 animate-pulse bg-zinc-400 align-middle" /> : null}
          </div>
          {fase === "listo" && (
            <div className="flex flex-wrap gap-3 border-t border-zinc-100 pt-5">
              <button type="button" onClick={descargar} className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white">
                Descargar en Word
              </button>
              {props.plan === "revision" ? (
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hola Sergio, quiero agendar la revisión de mi proyecto (código ${props.code}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Agendar mi revisión con Sergio
                </a>
              ) : null}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
