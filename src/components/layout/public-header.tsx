"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/servicios", label: "Servicios" },
  { href: "/desarrollo", label: "Desarrollo" },
  { href: "/columnas", label: "Columnas" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/arma-tu-proyecto", label: "Armá tu proyecto" },
];

export function PublicHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex flex-col leading-tight hover:opacity-75 transition-opacity">
          <span className="text-base font-semibold tracking-tight text-zinc-900">Sergio Pérez</span>
          <span className="text-[11px] font-normal tracking-wide text-zinc-500">Gestión Cultural e Impulso Digital</span>
        </Link>
        <nav className="hidden gap-1 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-sm transition ${
                  isActive
                    ? "bg-zinc-100 font-semibold text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/contacto"
            className="rounded-lg bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Contacto
          </Link>
          <Link
            href="/admin/login"
            className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
