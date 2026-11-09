import { createHash, randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { PLANES, type PlanId } from "./schema";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sergioperez.uy";
export const WHATSAPP = "59895342022";
export const MODELO = "claude-opus-5-5";

export function hashIp(ip: string) {
  const salt = process.env.ADMIN_SESSION_SECRET ?? "";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

export function ipDe(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return headers.get("x-real-ip") ?? "unknown";
}

/** Código legible para dictar por WhatsApp (sin 0/O ni 1/I). */
export function nuevoCodigo() {
  const alfabeto = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return "FL-" + Array.from(randomBytes(6), (b) => alfabeto[b % alfabeto.length]).join("");
}

/** Token secreto de la página del proyecto. */
export function nuevoToken() {
  return randomBytes(24).toString("base64url");
}

// ─── Mercado Pago (Checkout Pro, API REST) ─────────────────────────────────

const MP_API = "https://api.mercadopago.com";

export function mercadoPagoActivo() {
  return Boolean(process.env.MP_ACCESS_TOKEN);
}

export async function crearPreferencia(s: { code: string; token: string; email: string; titulo: string }, plan: PlanId) {
  const p = PLANES[plan];
  const res = await fetch(`${MP_API}/checkout/preferences`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      "X-Idempotency-Key": `${s.code}-${plan}`,
    },
    body: JSON.stringify({
      items: [
        {
          id: plan,
          title: `${p.nombre} · ${s.titulo}`.slice(0, 250),
          quantity: 1,
          unit_price: p.precio,
          currency_id: "UYU",
        },
      ],
      payer: { email: s.email },
      external_reference: s.code,
      back_urls: {
        success: `${SITE_URL}/arma-tu-proyecto/p/${s.token}`,
        pending: `${SITE_URL}/arma-tu-proyecto/p/${s.token}`,
        failure: `${SITE_URL}/arma-tu-proyecto/p/${s.token}`,
      },
      auto_return: "approved",
      notification_url: `${SITE_URL}/api/fondo-listo/webhook`,
      statement_descriptor: "SERGIOPEREZ.UY",
    }),
  });
  if (!res.ok) {
    throw new Error(`Mercado Pago respondió ${res.status}: ${await res.text()}`);
  }
  const data = (await res.json()) as { id: string; init_point: string };
  return data;
}

/**
 * Consulta un pago en Mercado Pago y, si está aprobado y el monto coincide,
 * marca la solicitud como pagada. Devuelve true si quedó pagada.
 * Se consulta siempre a la API (no se confía en lo que llega por la URL o el webhook).
 */
export async function verificarPago(paymentId: string) {
  if (!mercadoPagoActivo() || !/^\d+$/.test(paymentId)) return false;
  const res = await fetch(`${MP_API}/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
    cache: "no-store",
  });
  if (!res.ok) return false;
  const pago = (await res.json()) as {
    status: string;
    external_reference: string | null;
    transaction_amount: number;
    currency_id: string;
  };
  if (pago.status !== "approved" || !pago.external_reference) return false;

  const s = await prisma.fondoListoSolicitud.findUnique({ where: { code: pago.external_reference } });
  if (!s || !s.monto) return false;
  if (pago.currency_id !== "UYU" || Math.round(pago.transaction_amount) < s.monto) return false;

  const r = await prisma.fondoListoSolicitud.updateMany({
    where: { id: s.id, estado: { in: ["chequeo", "pago_pendiente"] } },
    data: { estado: "pagado", mpPago: paymentId, pagadoAt: new Date() },
  });
  if (r.count > 0) {
    const [{ correoPagado }, { enviarCompraMeta }] = await Promise.all([import("./correo"), import("./meta")]);
    await Promise.all([correoPagado({ ...s, estado: "pagado" }), enviarCompraMeta(s)]);
  }
  return true;
}
