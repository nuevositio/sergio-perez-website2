"use client";

import { useActionState } from "react";
import { loginAction } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: { error?: string } = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6">
      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">Email</label>
        <Input name="email" type="email" required placeholder="admin@sergioperez.uy" />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">Contrasena</label>
        <Input name="password" type="password" required />
      </div>

      {state.error ? <p className="text-sm text-red-700">{state.error}</p> : null}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Ingresando..." : "Ingresar"}
      </Button>
    </form>
  );
}
