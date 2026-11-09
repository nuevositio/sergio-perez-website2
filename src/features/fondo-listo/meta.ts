import { createHash } from "node:crypto";
import type { FondoListoSolicitud } from "@prisma/client";
import { SITE_URL } from "./server";

const META_API_VERSION = "v26.0";
const sha = (v: string) => createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

/**
 * Compra confirmada → evento Purchase por la API de conversiones (el pago ocurre fuera del sitio).
 * Requiere META_ACCESS_TOKEN y el ID del píxel; sin ellos no hace nada.
 */
export async function enviarCompraMeta(s: FondoListoSolicitud) {
  const pixelId = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_ACCESS_TOKEN;
  if (!pixelId || !token || !s.monto) return;

  const userData: Record<string, unknown> = { em: [sha(s.email)], country: [sha("uy")] };
  const tel = (s.telefono ?? "").replace(/\D/g, "");
  if (tel.length >= 8) userData.ph = [sha(tel.startsWith("598") ? tel : `598${tel.replace(/^0/, "")}`)];
  const [fn, ...resto] = s.nombre.trim().split(/\s+/);
  if (fn) userData.fn = [sha(fn)];
  if (resto.length) userData.ln = [sha(resto[resto.length - 1])];

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: `fondo-listo-${s.code}`,
        action_source: "website",
        event_source_url: `${SITE_URL}/arma-tu-proyecto`,
        user_data: userData,
        custom_data: { value: s.monto, currency: "UYU", content_name: `fondo-listo-${s.plan ?? "listo"}`, order_id: s.code },
      },
    ],
  };
  if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE;

  try {
    const res = await fetch(`https://graph.facebook.com/${META_API_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(token)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) console.error("[fondo-listo] Purchase a Meta", res.status, await res.text());
  } catch (e) {
    console.error("[fondo-listo] Purchase a Meta", e);
  }
}
