"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function SuccessBanner({ message }: { message: string }) {
  const router = useRouter();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      // Limpiar el query param de la URL sin recargar
      router.replace(window.location.pathname, { scroll: false });
    }, 3500);
    return () => clearTimeout(timer);
  }, [router]);

  if (!visible) return null;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
      <span className="text-green-500">✓</span>
      {message}
    </div>
  );
}
