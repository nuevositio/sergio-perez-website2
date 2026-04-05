import type { SelectHTMLAttributes } from "react";

export function Select({ className = "", ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-zinc-400 focus:ring-2 ${className}`.trim()}
      {...props}
    />
  );
}
