"use client";

import { useEffect, useState } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [diag, setDiag] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch("/api/admin/diag")
      .then((r) => r.json())
      .then(setDiag)
      .catch(() => null);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-6">
      <div className="w-full max-w-lg rounded-xl border border-red-200 bg-white p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-500">Error del servidor</p>
        <h1 className="mt-2 text-xl font-semibold text-zinc-900">Algo salió mal</h1>
        {error.digest && (
          <p className="mt-1 font-mono text-xs text-zinc-400">Digest: {error.digest}</p>
        )}
        {diag && (
          <pre className="mt-4 overflow-auto rounded-lg bg-zinc-900 p-4 text-left font-mono text-xs text-green-400">
            {JSON.stringify(diag, null, 2)}
          </pre>
        )}
        <div className="mt-6 flex gap-3">
          <button
            onClick={reset}
            className="rounded-lg bg-zinc-900 px-5 py-2 text-sm font-semibold text-white hover:bg-zinc-700"
          >
            Reintentar
          </button>
          <a
            href="/admin/login"
            className="rounded-lg border border-zinc-300 px-5 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
          >
            Volver al login
          </a>
        </div>
      </div>
    </div>
  );
}
