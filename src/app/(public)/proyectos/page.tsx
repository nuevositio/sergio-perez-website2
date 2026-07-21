import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos — Desarrollo Web en Uruguay",
  description:
    "Portfolio de sitios web desarrollados por Sergio Pérez: marcas personales, empresas, turismo e industria en Uruguay.",
  alternates: { canonical: "https://www.sergioperez.uy/proyectos" },
  openGraph: {
    title: "Proyectos — Sergio Pérez",
    description:
      "Portfolio de sitios web desarrollados en Uruguay: marcas, empresas y plataformas digitales.",
    url: "https://www.sergioperez.uy/proyectos",
    type: "website",
  },
};

const projects = [
  {
    name: "Radio Centro",
    url: "https://www.radiocentro.uy",
    display: "radiocentro.uy",
    category: "Medios & comunicación",
    description: "Sitio web para medio radial de Cardona con programación, noticias y escucha en vivo.",
    screenshot: "/images/proyectos/radiocentro.jpg",
    recent: true,
  },
  {
    name: "Expo Deporte Latam",
    url: "https://www.expodeportelatam.com",
    display: "expodeportelatam.com",
    category: "Eventos & plataforma regional",
    description: "Plataforma internacional para conectar deporte, salud, turismo y oportunidades en América Latina.",
    screenshot: "/images/proyectos/expodeportelatam.jpg",
    recent: true,
  },
  {
    name: "Cardona",
    url: "http://www.cardona.soriano.gub.uy",
    display: "cardona.soriano.gub.uy",
    category: "Ciudad & comunidad",
    description: "Sitio oficial local con servicios, información institucional y comunicación de Cardona.",
    screenshot: "",
    recent: true,
  },
  {
    name: "Expo Deporte y Bienestar",
    url: "https://www.expodeporteybienestar.uy",
    display: "expodeporteybienestar.uy",
    category: "Eventos & bienestar",
    description: "Sitio web para evento nacional orientado al deporte, la salud y el bienestar.",
    screenshot: "/images/proyectos/expodeporteybienestar.jpg",
    recent: true,
  },
  {
    name: "Juan José Zeballos",
    url: "https://www.zeballos.com.uy",
    display: "zeballos.com.uy",
    category: "Marca personal & cultura",
    description: "Sitio profesional para pianista uruguayo, gestor cultural y trayectoria escénica.",
    screenshot: "/images/proyectos/zeballos.jpg",
    recent: true,
  },
  {
    name: "Metalúrgica Luis Loza",
    url: "https://metalurgicaluisloza.uy",
    display: "metalurgicaluisloza.uy",
    category: "Industria & empresa",
    description: "Sitio institucional para empresa metalúrgica con historia en Uruguay.",
    screenshot: "/images/proyectos/luisloza.jpg",
  },
  {
    name: "Milagus",
    url: "https://www.milagus.uy",
    display: "milagus.uy",
    category: "Marca personal",
    description: "Identidad digital y plataforma web para marca uruguaya.",
    screenshot: "/images/proyectos/milagus.jpg",
  },
  {
    name: "Periódico Centenario",
    url: "https://periodicocentenario.com.uy",
    display: "periodicocentenario.com.uy",
    category: "Medios & periodismo",
    description: "Plataforma digital de noticias con foco en la agenda cultural y social.",
    screenshot: "/images/proyectos/centenario.jpg",
  },
  {
    name: "Empresa Bonjour",
    url: "https://www.empresabonjour.com.uy",
    display: "empresabonjour.com.uy",
    category: "Empresa & servicios",
    description: "Sitio institucional y comunicación digital para empresa uruguaya.",
    screenshot: "/images/proyectos/bonjour.jpg",
  },
  {
    name: "Perfiles",
    url: "https://perfiles.uy",
    display: "perfiles.uy",
    category: "Medios & contenido",
    description: "Portal de entrevistas y perfiles de personajes de la cultura uruguaya.",
    screenshot: "/images/proyectos/perfiles.jpg",
  },
  {
    name: "Mac Travel",
    url: "https://www.mactravel.com.uy",
    display: "mactravel.com.uy",
    category: "Turismo & viajes",
    description: "Plataforma web para agencia de viajes con catálogo de destinos.",
    screenshot: "/images/proyectos/mactravel.jpg",
  },
  {
    name: "Cata Santos",
    url: "https://catasantoslu.com",
    display: "catasantoslu.com",
    category: "Marca personal",
    description: "Presencia digital para marca personal con enfoque en contenido.",
    screenshot: "/images/proyectos/catasantos.jpg",
  },
  {
    name: "Tecnidiesel",
    url: "https://www.tecnidiesel.com.uy",
    display: "tecnidiesel.com.uy",
    category: "Industria & servicios",
    description: "Sitio profesional para empresa especializada en mecánica diesel.",
    screenshot: "/images/proyectos/tecnidiesel.jpg",
  },
  {
    name: "Napilotti",
    url: "https://napilotti.com.uy",
    display: "napilotti.com.uy",
    category: "Comercio & marca",
    description: "Plataforma web para marca comercial uruguaya con identidad propia.",
    screenshot: "/images/proyectos/napilotti.jpg",
  },
];

export default function ProyectosPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Proyectos</p>
        <h1 className="text-4xl font-semibold text-zinc-900">Sitios desarrollados</h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-600">
          Una selección de plataformas web que diseñé y desarrollé para marcas, empresas y profesionales en Uruguay.
          Pasá el cursor para ver cada proyecto en color.
        </p>
      </section>

      {/* Gallery */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
          >
            {/* Screenshot */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
              {project.screenshot ? (
                <Image
                  src={project.screenshot}
                  alt={`Captura de pantalla de ${project.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-all duration-500 ease-out grayscale group-hover:grayscale-0 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 transition-all duration-500 group-hover:from-zinc-50 group-hover:to-zinc-100">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-400">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12a15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    </div>
                    <p className="text-xs font-medium text-zinc-500">{project.display}</p>
                  </div>
                </div>
              )}
              {/* Overlay sutil */}
              <div className="absolute inset-0 bg-zinc-900/5 group-hover:bg-transparent transition-colors duration-500" />
              {project.recent ? (
                <div className="absolute left-3 top-3">
                  <span className="rounded-md bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-sm">
                    RECIENTE
                  </span>
                </div>
              ) : null}
              {/* Badge "Visitar" */}
              <div className="absolute bottom-3 right-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-zinc-900 shadow-lg backdrop-blur-sm">
                  Visitar sitio
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Footer de la card */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    {project.category}
                  </p>
                  <h2 className="mt-0.5 text-base font-semibold text-zinc-900 truncate">
                    {project.name}
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                    {project.description}
                  </p>
                </div>
              </div>
              <p className="mt-3 flex items-center gap-1 text-xs text-zinc-400 group-hover:text-zinc-600 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12a15.3 15.3 0 0 1 4-10z" />
                </svg>
                {project.display}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center">
        <p className="text-sm font-semibold text-zinc-500">¿Querés tu sitio web?</p>
        <h2 className="mt-2 text-xl font-semibold text-zinc-900">
          Desarrollamos tu presencia digital desde cero.
        </h2>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a
            href="/cotizacion"
            className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Cotizá tu proyecto
          </a>
          <a
            href="/contacto"
            className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50"
          >
            Contactame
          </a>
        </div>
      </div>
    </div>
  );
}
