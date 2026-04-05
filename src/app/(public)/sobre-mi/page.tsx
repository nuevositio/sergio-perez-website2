import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre mí — Sergio Pérez",
  description:
    "Conocé a Sergio Pérez: gestor cultural uruguayo con más de una década combinando producción cultural, periodismo especializado y desarrollo web profesional.",
  alternates: { canonical: "https://www.sergioperez.uy/sobre-mi" },
  openGraph: {
    title: "Sobre mí — Sergio Pérez",
    description:
      "Gestor cultural, columnista y desarrollador web uruguayo. Una década en la intersección entre cultura, narrativa y tecnología.",
    url: "https://www.sergioperez.uy/sobre-mi",
    type: "profile",
  },
};

const timeline = [
  {
    period: "2018 – actualidad",
    role: "Gestor cultural independiente",
    description:
      "Diseño y coordinación de festivales, ciclos, convocatorias y proyectos culturales en Uruguay y la región.",
  },
  {
    period: "2015 – actualidad",
    role: "Columnista y comunicador",
    description:
      "Producción de columnas de opinión e investigación periodística en medios especializados en cultura e identidad.",
  },
  {
    period: "2020 – actualidad",
    role: "Desarrollador web",
    description:
      "Construcción de sitios y plataformas profesionales con Next.js, con foco en rendimiento, SEO y conversión.",
  },
];

export default function SobreMiPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-16">
      <section className="space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Sobre mí</p>
        <h1 className="text-4xl font-semibold leading-tight text-zinc-900">
          Trabajo en la intersección entre cultura, comunicación y tecnología.
        </h1>
        <div className="space-y-4 text-base leading-relaxed text-zinc-600">
          <p>
            Soy Sergio Pérez, gestor cultural, comunicador y desarrollador web uruguayo. Desde hace más de
            una década combino la producción cultural con la estrategia digital para acompañar a
            profesionales, instituciones y proyectos que quieren posicionarse con claridad y autoridad.
          </p>
          <p>
            Mi trabajo parte de una convicción: la cultura es un activo estratégico, no un adorno.
            Por eso cada proyecto que desarrollo —ya sea un festival, una columna o una plataforma web—
            está pensado para generar presencia real y conexión genuina con las audiencias.
          </p>
          <p>
            Si buscás un profesional que entienda tanto el texto como el código, tanto la narrativa
            como la arquitectura de sistemas, estás en el lugar correcto.
          </p>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xl font-semibold text-zinc-900">Trayectoria</h2>
        <div className="space-y-4">
          {timeline.map((item) => (
            <div key={item.role} className="rounded-xl border border-zinc-200 bg-white p-5">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  {item.period}
                </span>
              </div>
              <h3 className="mt-1 font-semibold text-zinc-900">{item.role}</h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
