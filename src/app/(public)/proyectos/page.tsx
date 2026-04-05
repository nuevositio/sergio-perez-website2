import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos — Trabajo Seleccionado",
  description:
    "Proyectos seleccionados de Sergio Pérez: ciclos culturales, columnas de opinión, plataformas web y gestión de fondos públicos en Uruguay.",
  alternates: { canonical: "https://www.sergioperez.uy/proyectos" },
  openGraph: {
    title: "Proyectos — Sergio Pérez",
    description:
      "Ciclos culturales, columnas de opinión y plataformas web con impacto real.",
    url: "https://www.sergioperez.uy/proyectos",
    type: "website",
  },
};

const projects = [
  {
    category: "Comunicación",
    title: "Columnas culturales en medios especializados",
    description:
      "Producción regular de columnas de opinión e investigación sobre cultura, identidad y política cultural en Uruguay y la región.",
    tags: ["Periodismo", "Cultura", "Opinión"],
  },
  {
    category: "Desarrollo web",
    title: "Plataformas de marca personal",
    description:
      "Diseño y desarrollo de sitios profesionales con Next.js para gestores culturales, comunicadores y profesionales creativos.",
    tags: ["Next.js", "TypeScript", "Marca personal"],
  },
  {
    category: "Gestión cultural",
    title: "Ciclos y programación cultural independiente",
    description:
      "Diseño, producción y evaluación de ciclos culturales con impacto comunitario, incluyendo gestión de presupuesto y convocatorias públicas.",
    tags: ["Ciclos", "Fondos", "Gestión"],
  },
];

export default function ProyectosPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Proyectos</p>
        <h1 className="text-4xl font-semibold text-zinc-900">Trabajo seleccionado</h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-600">
          Una muestra de proyectos en los que intervine como gestor, comunicador o desarrollador.
        </p>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="flex flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {project.category}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-zinc-900">{project.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
