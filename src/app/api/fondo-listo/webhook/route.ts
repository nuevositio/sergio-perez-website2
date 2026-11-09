import { NextRequest, NextResponse } from "next/server";
import { verificarPago } from "@/features/fondo-listo/server";

export const runtime = "nodejs";

// Notificaciones de Mercado Pago. No se confía en el contenido: el pago se consulta a la API.
export async function POST(request: NextRequest) {
  const url = request.nextUrl;
  const body = (await request.json().catch(() => null)) as { type?: string; data?: { id?: string | number } } | null;
  const tipo = body?.type ?? url.searchParams.get("type") ?? url.searchParams.get("topic");
  const id = String(body?.data?.id ?? url.searchParams.get("data.id") ?? url.searchParams.get("id") ?? "");

  if (tipo === "payment" && id) {
    try {
      await verificarPago(id);
    } catch (e) {
      console.error("[fondo-listo] webhook", e);
      return NextResponse.json({ ok: false }, { status: 500 });
    }
  }
  return NextResponse.json({ ok: true });
}
