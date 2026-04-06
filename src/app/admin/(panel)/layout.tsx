import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

// Todas las páginas del panel admin son dinámicas (requieren DB en runtime)
export const dynamic = "force-dynamic";

export default function AdminPanelLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-100 md:flex">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
