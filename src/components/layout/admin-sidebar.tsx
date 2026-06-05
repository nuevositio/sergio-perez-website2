import Link from "next/link";
import { logoutAction } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/columnas", label: "Columnas" },
  { href: "/admin/columnas/nueva", label: "Nueva columna" },
  { href: "/admin/accounting", label: "💰 Contabilidad" },
];

export function AdminSidebar() {
  return (
    <aside className="flex w-full flex-col gap-6 border-b border-zinc-200 bg-white p-6 md:min-h-screen md:w-72 md:border-b-0 md:border-r">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900">Panel admin</h2>
        <p className="text-sm text-zinc-600">Gestion de columnas</p>
      </div>

      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <form action={logoutAction} className="mt-auto">
        <Button type="submit" variant="secondary" className="w-full">
          Cerrar sesion
        </Button>
      </form>
    </aside>
  );
}
