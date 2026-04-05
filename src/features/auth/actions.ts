"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginState = { error?: string };

export async function loginAction(_prevState: LoginState, formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!adminEmail || !adminPassword || !secret) {
    return { error: "Admin no configurado. Contactá al desarrollador." };
  }

  if (email !== adminEmail || password !== adminPassword) {
    return { error: "Credenciales inválidas." };
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 horas
    path: "/",
  });

  redirect("/admin/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}
