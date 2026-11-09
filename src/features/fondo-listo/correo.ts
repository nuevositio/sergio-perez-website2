import nodemailer from "nodemailer";
import type { FondoListoSolicitud } from "@prisma/client";
import { getConvocatoria } from "./convocatorias";
import { LINKS_PAGO, PLANES, formatoPesos, type Chequeo, type PlanId } from "./schema";
import { SITE_URL, WHATSAPP } from "./server";

/*
 * Correos de Fondo Listo, enviados por SMTP desde una casilla @sergioperez.uy.
 * Variables: SMTP_HOST, SMTP_PORT (465 por defecto), SMTP_USER, SMTP_PASS,
 * MAIL_FROM (opcional, por defecto SMTP_USER) y FONDO_LISTO_AVISOS (a quién avisar de pedidos nuevos;
 * por defecto ADMIN_EMAIL). Sin SMTP configurado, no se envía nada y el sitio sigue funcionando.
 */

export function correoActivo() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

async function enviar(to: string, subject: string, html: string, text: string) {
  if (!correoActivo() || !to) return;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const transporte = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  const desde = process.env.MAIL_FROM ?? process.env.SMTP_USER!;
  try {
    await transporte.sendMail({
      from: { name: "Sergio Pérez · Gestor cultural", address: desde },
      replyTo: desde,
      to,
      subject,
      html,
      text,
    });
  } catch (e) {
    console.error("[fondo-listo] no se pudo enviar el correo", subject, e);
  }
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function plantilla(cuerpo: string) {
  return `<!doctype html><html lang="es"><body style="margin:0;background:#f8f7f4;padding:24px 12px;font-family:Helvetica,Arial,sans-serif;color:#171717">
<div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e6e4df;border-radius:16px;padding:28px 24px">
<p style="margin:0 0 18px;font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#9b9ba1">Fondo Listo · sergioperez.uy</p>
${cuerpo}
<hr style="border:0;border-top:1px solid #e6e4df;margin:28px 0 14px">
<p style="margin:0;font-size:13px;color:#5a5a5a">Sergio Pérez · Gestor cultural<br>
<a href="${SITE_URL}" style="color:#171717">sergioperez.uy</a> · WhatsApp <a href="https://wa.me/${WHATSAPP}" style="color:#171717">095 342 022</a></p>
</div></body></html>`;
}

const boton = (href: string, texto: string) =>
  `<p style="margin:22px 0"><a href="${href}" style="display:inline-block;background:#171717;color:#fff;text-decoration:none;font-weight:600;font-size:15px;padding:13px 20px;border-radius:10px">${esc(texto)}</a></p>`;

const h = (t: string) => `<h1 style="font-family:Georgia,serif;font-size:24px;line-height:1.25;margin:0 0 12px">${esc(t)}</h1>`;
const p = (t: string) => `<p style="font-size:15px;line-height:1.6;color:#3a3a3a;margin:0 0 12px">${t}</p>`;

function avisos() {
  return process.env.FONDO_LISTO_AVISOS ?? process.env.ADMIN_EMAIL ?? "";
}

/** Después del chequeo: a la persona (con el link a su página) y aviso a Sergio. */
export async function correoChequeo(s: FondoListoSolicitud, chequeo: Chequeo) {
  const conv = getConvocatoria(s.convocatoria);
  const total = chequeo.criterios.reduce((a, k) => a + k.estimado, 0);
  const maximo = chequeo.criterios.reduce((a, k) => a + k.maximo, 0);
  const link = `${SITE_URL}/arma-tu-proyecto/p/${s.token}`;
  const nombre = s.nombre.split(" ")[0];
  const refuerzos = chequeo.refuerzos
    .map((r) => `<li style="margin-bottom:6px"><strong>${esc(r.titulo)}.</strong> ${esc(r.detalle)}</li>`)
    .join("");

  await enviar(
    s.email,
    `Tu chequeo: ${total}/${maximo} en ${conv?.nombre ?? "la convocatoria"}`,
    plantilla(
      h(`Hola, ${nombre}: este es tu chequeo`) +
        p(`<strong>${esc(s.titulo)}</strong> · ${esc(conv?.nombre ?? "")}`) +
        `<p style="font-family:Georgia,serif;font-size:40px;margin:8px 0 4px">${total}<span style="font-size:20px;color:#9b9ba1"> / ${maximo}</span></p>` +
        (conv?.minimo ? p(`Mínimo: ${esc(conv.minimo)}.`) : "") +
        p(esc(chequeo.resumen)) +
        (refuerzos ? `<p style="font-size:15px;font-weight:600;margin:18px 0 8px">Qué reforzar</p><ul style="font-size:14.5px;line-height:1.55;color:#3a3a3a;padding-left:18px;margin:0">${refuerzos}</ul>` : "") +
        p(
          `<br>Con <strong>Fondo Listo</strong> te entregamos el proyecto escrito para las bases, campo por campo y con el presupuesto en pesos: ${formatoPesos(PLANES.listo.precio)}, o ${formatoPesos(PLANES.revision.precio)} con mi revisión y una reunión por Zoom.`,
        ) +
        boton(link, "Ver mi chequeo y elegir plan") +
        p(`<span style="font-size:13px;color:#5a5a5a">Tu código es <strong>${s.code}</strong>. Guardá este correo: el link es tu acceso a tu proyecto.</span>`),
    ),
    `Hola, ${nombre}. Tu chequeo de "${s.titulo}" para ${conv?.nombre ?? "la convocatoria"}: ${total}/${maximo}.\n\n${chequeo.resumen}\n\nVer tu chequeo y elegir plan: ${link}\nCódigo: ${s.code}\n\nSergio Pérez · Gestor cultural · sergioperez.uy`,
  );

  await enviar(
    avisos(),
    `[Fondo Listo] Nuevo chequeo ${s.code}: ${total}/${maximo} · ${s.nombre}`,
    plantilla(
      h(`Nuevo chequeo ${s.code}`) +
        p(
          `<strong>${esc(s.nombre)}</strong> · ${esc(s.email)}${s.telefono ? ` · ${esc(s.telefono)}` : ""}<br>${esc(s.titulo)}<br>${esc(conv?.nombre ?? s.convocatoria)} · ${total}/${maximo}`,
        ) +
        boton(`${SITE_URL}/admin/fondo-listo`, "Ver en el panel"),
    ),
    `Nuevo chequeo ${s.code}: ${s.nombre} (${s.email}) · ${s.titulo} · ${total}/${maximo}`,
  );
}

/** Cuando la persona elige un plan: aviso a Sergio para cruzar el pago. */
export async function correoPlanElegido(s: FondoListoSolicitud, plan: PlanId) {
  const pl = PLANES[plan];
  await enviar(
    avisos(),
    `[Fondo Listo] ${s.code} eligió ${pl.nombre} (${formatoPesos(pl.precio)}) · esperando pago`,
    plantilla(
      h(`${s.code} eligió ${pl.nombre}`) +
        p(`<strong>${esc(s.nombre)}</strong> · ${esc(s.email)}<br>${esc(s.titulo)}<br>Monto: ${formatoPesos(pl.precio)}`) +
        p(
          LINKS_PAGO[plan]
            ? "Paga con el link de Mercado Pago. Cuando veas el cobro acreditado, marcalo como pagado en el panel."
            : "Este plan no tiene link de pago: coordiná el cobro por WhatsApp.",
        ) +
        boton(`${SITE_URL}/admin/fondo-listo`, "Ver en el panel"),
    ),
    `${s.code} eligió ${pl.nombre} (${formatoPesos(pl.precio)}): ${s.nombre} (${s.email}).`,
  );
}

/** Cuando el pago queda confirmado: a la persona, con el link para que se escriba su proyecto. */
export async function correoPagado(s: FondoListoSolicitud) {
  const link = `${SITE_URL}/arma-tu-proyecto/p/${s.token}`;
  const nombre = s.nombre.split(" ")[0];
  const conRevision = s.plan === "revision";
  await enviar(
    s.email,
    `Tu proyecto está habilitado · ${s.titulo}`,
    plantilla(
      h(`¡Listo, ${nombre}! Recibimos tu pago`) +
        p(
          `Tu proyecto <strong>${esc(s.titulo)}</strong> ya está habilitado. Entrá al link y se escribe en unos minutos, campo por campo y según las bases. Después lo descargás en Word.`,
        ) +
        boton(link, "Ver mi proyecto") +
        (conRevision
          ? p("Como elegiste la revisión, te escribo por WhatsApp para coordinar la reunión por Zoom.")
          : "") +
        p(`<span style="font-size:13px;color:#5a5a5a">Código: <strong>${s.code}</strong>. Guardá este correo: el link es tu acceso.</span>`),
    ),
    `¡Listo, ${nombre}! Recibimos tu pago. Tu proyecto "${s.titulo}" está habilitado: ${link}\nCódigo: ${s.code}`,
  );
}
