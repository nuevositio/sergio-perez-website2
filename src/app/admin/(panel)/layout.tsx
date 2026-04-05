import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default function AdminPanelLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-100 md:flex">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
