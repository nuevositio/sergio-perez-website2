import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Desarrollo Web Profesional en Uruguay — Next.js, Hosting y Dominios",
  description:
    "Servicios de desarrollo web profesional, hosting, dominios, redes sociales y registro de marca en Uruguay. Sitios rápidos, seguros y diseñados para convertir.",
  alternates: { canonical: "https://www.sergioperez.uy/desarrollo" },
  openGraph: {
    title: "Desarrollo Web Profesional en Uruguay | Sergio Pérez",
    description:
      "Desarrollo web con Next.js, hosting, dominios, redes sociales y registro de marca en Uruguay.",
    url: "https://www.sergioperez.uy/desarrollo",
    type: "website",
  },
};

const WA_URL =
  "https://wa.me/59895342022?text=Hola%20Sergio%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20tus%20servicios%20digitales";

const services = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l2 2" />
        <path d="M8.5 8.5h.01M15.5 8.5h.01" />
        <path d="M9 15c.83.63 1.87 1 3 1s2.17-.37 3-1" />
      </svg>
    ),
    title: "Registro de Marca",
    description:
      "Protegé tu marca legalmente en Uruguay y el mundo. Asesoramiento completo para registro de marcas.",
    features: [
      "Búsqueda de antecedentes marcarios",
      "Asesoramiento legal especializado",
      "Gestión completa del trámite",
      "Registro nacional e internacional",
      "Renovaciones y mantenimiento",
    ],
    featured: true,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Desarrollo Web Profesional",
    description:
      "Sitios web modernos, responsivos y optimizados para SEO. Desde landing pages hasta e-commerce completos.",
    features: [
      "Diseño responsive (móvil y desktop)",
      "Optimización para buscadores (SEO)",
      "Velocidad de carga optimizada",
      "Panel de administración intuitivo",
      "Integración con redes sociales",
    ],
    featured: false,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    title: "Gestión de Redes Sociales",
    description:
      "Estrategia completa para redes sociales. Contenido, diseño y crecimiento orgánico de tu audiencia.",
    features: [
      "Estrategia de contenido personalizada",
      "Diseño gráfico para posts",
      "Programación automática",
      "Análisis y reportes mensuales",
      "Gestión de comunidad",
    ],
    featured: false,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Hosting Web Profesional",
    description:
      "Alojamiento web confiable y rápido con soporte técnico y certificados SSL incluidos.",
    features: [
      "99.9% de tiempo de actividad garantizado",
      "Certificado SSL gratuito",
      "Copias de seguridad automáticas",
      "Soporte técnico especializado",
      "Panel de control cPanel",
    ],
    featured: false,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 0 20" />
        <path d="M12 2a15.3 15.3 0 0 0 0 20" />
      </svg>
    ),
    title: "Registro de Dominios",
    description:
      "Asegurá tu identidad digital con el dominio perfecto. Gestión completa de dominios .com, .uy y más.",
    features: [
      "Dominios .com, .uy, .com.uy",
      "Configuración DNS profesional",
      "Protección de privacidad incluida",
      "Transferencias y migraciones",
      "Renovación automatizada",
    ],
    featured: false,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "Correo Corporativo",
    description:
      "Email profesional con tu dominio. Proyectá una imagen más seria y confiable para tu negocio.",
    features: [
      "Correo con tu dominio (@tuempresa.com)",
      "Suite de productividad incluida",
      "Antispam y seguridad avanzada",
      "Acceso desde cualquier dispositivo",
      "Soporte técnico dedicado",
    ],
    featured: false,
  },
];

export default function DesarrolloPage() {
  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
          Servicios Digitales
        </p>
        <h1 className="text-4xl font-semibold text-zinc-900">Desarrollo Web</h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-600">
          Soluciones digitales profesionales para tu marca, emprendimiento u organización cultural.
          Desde el diseño hasta el lanzamiento.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/cotizacion"
            className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Solicitar cotización
          </Link>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-green-500 hover:text-green-600"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488" />
            </svg>
            Consultar por WhatsApp
          </a>
        </div>
      </section>

      {/* Services grid */}
      <section>
        <h2 className="mb-6 text-xl font-semibold text-zinc-900">Nuestros servicios</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className={`relative flex flex-col rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md ${
                service.featured
                  ? "border-zinc-900 ring-1 ring-zinc-900/10"
                  : "border-zinc-200"
              }`}
            >
              {service.featured && (
                <span className="absolute -top-3 right-4 rounded-full bg-zinc-900 px-3 py-0.5 text-xs font-semibold text-white">
                  Más solicitado
                </span>
              )}
              <div className="mb-4 text-zinc-700">{service.icon}</div>
              <h3 className="mb-1 text-base font-semibold text-zinc-900">{service.title}</h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-500">
                {service.description}
              </p>
              <ul className="mb-5 space-y-1.5">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-400"><polyline points="20 6 9 17 4 12" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/59895342022?text=Hola%20Sergio%2C%20quiero%20informaci%C3%B3n%20sobre%20${encodeURIComponent(service.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700"
              >
                Cotizar
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="rounded-2xl bg-zinc-900 px-8 py-10 text-center text-white">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-zinc-400">
          ¿Tenés un proyecto?
        </p>
        <h2 className="mb-4 text-2xl font-semibold">Hablemos y creamos juntos</h2>
        <p className="mb-6 text-sm text-zinc-400">
          Contame tu idea y te doy una propuesta personalizada sin compromiso.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/cotizacion"
            className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
          >
            Formulario de cotización
          </Link>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488" />
            </svg>
            WhatsApp directo
          </a>
        </div>
      </section>
    </div>
  );
}
