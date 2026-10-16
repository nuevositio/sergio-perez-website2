"use client";

import { useRef, useState, type ReactNode } from "react";

const WHATSAPP_NUMBER = "59895342022";

type Block =
  | { type: "h1" | "h2" | "h3" | "p"; text: string }
  | { type: "ul" | "ol"; items: string[] };

// Renderer mínimo para el subconjunto de Markdown que pide la metodología.
function parse(markdown: string): Block[] {
  const blocks: Block[] = [];
  for (const raw of markdown.split("\n")) {
    const line = raw.trim();
    const last = blocks[blocks.length - 1];
    if (!line) continue;

    const heading = /^(#{1,3})\s+(.*)$/.exec(line);
    const bullet = /^[-*]\s+(.*)$/.exec(line);
    const numbered = /^\d+[.)]\s+(.*)$/.exec(line);

    if (heading) {
      blocks.push({ type: (["h1", "h2", "h3"] as const)[heading[1].length - 1], text: heading[2] });
    } else if (bullet || numbered) {
      const type = bullet ? "ul" : "ol";
      const text = (bullet ?? numbered)![1];
      if (last?.type === type) last.items.push(text);
      else blocks.push({ type, items: [text] });
    } else {
      blocks.push({ type: "p", text: line });
    }
  }
  return blocks;
}

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\[COMPLETAR[^\]]*\])/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("[COMPLETAR"))
      return (
        <mark key={i} className="rounded bg-amber-100 px-1 text-amber-900">
          {part}
        </mark>
      );
    return part;
  });
}

function DraftBody({ markdown }: { markdown: string }) {
  return parse(markdown).map((block, i) => {
    switch (block.type) {
      case "h1":
        return <h1 key={i} className="text-2xl font-semibold text-zinc-900">{inline(block.text)}</h1>;
      case "h2":
        return <h2 key={i} className="pt-4 text-lg font-semibold text-zinc-900">{inline(block.text)}</h2>;
      case "h3":
        return <h3 key={i} className="pt-1 text-base font-semibold text-zinc-800">{inline(block.text)}</h3>;
      case "ul":
      case "ol": {
        const List = block.type;
        return (
          <List key={i} className={`space-y-1 pl-5 ${block.type === "ul" ? "list-disc" : "list-decimal"}`}>
            {block.items.map((item, j) => <li key={j}>{inline(item)}</li>)}
          </List>
        );
      }
      default:
        return <p key={i}>{inline(block.text)}</p>;
    }
  });
}

export function DraftView({
  markdown,
  code,
  title,
  status,
}: {
  markdown: string;
  code: string | null;
  title: string;
  status: "generating" | "done";
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const done = status === "done";

  const filename = `Borrador - ${title || "proyecto"}`.replace(/[\\/:*?"<>|]/g, "");

  function documentHtml() {
    return `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${filename}</title>
<style>body{font-family:Georgia,serif;max-width:720px;margin:40px auto;padding:0 16px;line-height:1.55;color:#18181b}
h1{font-size:24px}h2{font-size:18px;margin-top:28px}h3{font-size:15px}mark{background:#fef3c7}
footer{margin-top:40px;font-size:12px;color:#71717a}</style></head><body>
${bodyRef.current?.innerHTML ?? ""}
<footer>Borrador de trabajo generado en sergioperez.uy/arma-tu-proyecto${code ? ` · Código ${code}` : ""}</footer>
</body></html>`;
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* el navegador no permite copiar: no hacemos nada */
    }
  }

  function download() {
    const blob = new Blob(["﻿", documentHtml()], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function print() {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(documentHtml());
    win.document.close();
    win.focus();
    win.print();
  }

  const waText =
    `Hola Sergio, generé el borrador de mi proyecto "${title}" en tu web` +
    (code ? ` (código ${code})` : "") +
    " y me gustaría trabajarlo con tu acompañamiento.";

  return (
    <section
      aria-live="polite"
      aria-busy={!done}
      className="space-y-6 rounded-xl border border-zinc-200 bg-white p-6 md:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
            Tu borrador de proyecto
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            {done ? (
              <>
                Primera versión para trabajar. Lo marcado en{" "}
                <mark className="rounded bg-amber-100 px-1 text-amber-900">amarillo</mark> son datos que tenés que completar.
              </>
            ) : (
              "Redactando tu borrador… suele llevar uno o dos minutos."
            )}
          </p>
        </div>
        {code ? (
          <span className="rounded-md bg-zinc-100 px-2 py-1 font-mono text-xs text-zinc-600">{code}</span>
        ) : null}
      </div>

      <div ref={bodyRef} className="space-y-3 text-[15px] leading-relaxed text-zinc-700">
        <DraftBody markdown={markdown} />
        {!done ? <span className="inline-block h-4 w-2 animate-pulse bg-zinc-400 align-middle" /> : null}
      </div>

      {done ? (
        <div className="space-y-4 border-t border-zinc-100 pt-5">
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={download} className={secondaryButton}>
              Descargar (Word)
            </button>
            <button type="button" onClick={print} className={secondaryButton}>
              Imprimir / PDF
            </button>
            <button type="button" onClick={copy} className={secondaryButton}>
              {copied ? "¡Copiado!" : "Copiar texto"}
            </button>
          </div>
          <div className="rounded-lg bg-zinc-50 p-4">
            <p className="text-sm font-medium text-zinc-900">¿Querés llevarlo a una versión para postular?</p>
            <p className="mt-1 text-sm text-zinc-600">
              Ya tengo una copia de este borrador. Escribime y lo trabajamos juntos: ajustes a las bases,
              presupuesto, redacción final y documentación.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Quiero acompañamiento
            </a>
          </div>
        </div>
      ) : null}
    </section>
  );
}

const secondaryButton =
  "rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-900";
