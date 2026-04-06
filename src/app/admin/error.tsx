"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100">
      <div className="w-full max-w-md rounded-xl border border-red-200 bg-white p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-500">Error del servidor</p>
        <h1 className="mt-2 text-xl font-semibold text-zinc-900">Algo salió mal</h1>
        <p className="mt-2 text-sm text-zinc-500">
          {error.message || "Error inesperado en el panel de administración."}
        </p>
        {error.digest && (
          <p className="mt-1 font-mono text-xs text-zinc-400">ID: {error.digest}</p>
        )}
        <button
          onClick={reset}
          className="mt-6 rounded-lg bg-zinc-900 px-5 py-2 text-sm font-semibold text-white hover:bg-zinc-700"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
