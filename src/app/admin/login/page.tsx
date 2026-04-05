import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/login-form";

export const metadata: Metadata = {
  title: "Admin Login",
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-6">
      <div className="w-full space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-zinc-900">Panel admin</h1>
          <p className="mt-2 text-sm text-zinc-600">Acceso privado de gestion de columnas.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
