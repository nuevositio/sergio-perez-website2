import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre mí — Sergio Pérez",
  description:
    "Conocé a Sergio Pérez: gestor cultural, comunicador institucional y creador digital con trayectoria en cultura, territorio, patrimonio y proyectos comunitarios.",
  alternates: { canonical: "https://www.sergioperez.uy/sobre-mi" },
  openGraph: {
    title: "Sobre mí — Sergio Pérez",
    description:
      "Gestión cultural, comunicación institucional, proyectos territoriales y diferencial digital aplicado.",
    url: "https://www.sergioperez.uy/sobre-mi",
    type: "profile",
  },
};

const strengths = [
  {
    title: "Perfil híbrido",
    description:
      "Articula cultura, comunicación institucional, territorio y herramientas digitales con criterio operativo.",
  },
  {
    title: "Redacción sólida",
    description:
      "Produce documentos institucionales, piezas académicas y contenidos comunicacionales con claridad y consistencia.",
  },
  {
    title: "Comprensión territorial",
    description:
      "Trabaja con patrimonio, memoria, comunidad y desarrollo local desde una experiencia práctica sostenida.",
  },
];

const competencies = [
  "Gestión cultural",
  "Comunicación institucional",
  "Formulación de proyectos",
  "Patrimonio",
  "Turismo cultural",
  "Territorio",
  "Coordinación",
  "Redacción profesional",
  "SEO",
  "Analítica web",
  "Desarrollo web",
  "Organización digital",
];

const experience = [
  {
    period: "2009 - actualidad",
    role: "Gestión cultural y trabajo con comunidades",
    meta: "Proyectos, producción y territorio",
    items: [
      "Participación en proyectos culturales, patrimoniales y comunitarios.",
      "Organización de actividades artísticas, formativas y de difusión cultural con instituciones locales y regionales.",
      "Relevamientos patrimoniales, trabajo con comunidades y acciones de circulación cultural.",
      "Producción musical y coordinación de actividades de difusión cultural en Uruguay y Argentina.",
    ],
  },
  {
    period: "2009 - actualidad",
    role: "Desarrollo web y consultoría digital",
    meta: "Servicios para organizaciones y proyectos",
    items: [
      "Diseño y desarrollo de sitios institucionales, culturales y empresariales.",
      "Gestión de hosting, dominios, DNS, Google Workspace y mantenimiento de plataformas.",
      "Implementación de soluciones de organización digital, SEO, accesibilidad y apoyo a comunicación multimedial.",
    ],
  },
  {
    period: "2007 - actualidad",
    role: "Desempeño en ámbitos públicos",
    meta: "Gestión pública, comunicación institucional y territorio",
    items: [
      "Experiencia sostenida en comunicación pública, redacción institucional y tareas de soporte técnico-operativo en distintos ámbitos de gestión.",
      "Elaboración de documentos, actas, comunicaciones públicas y piezas informativas orientadas a claridad, servicio y vínculo ciudadano.",
      "Articulación con equipos, organizaciones comunitarias y actores territoriales en procesos administrativos, culturales y de servicio.",
      "Acompañamiento operativo a iniciativas educativas, comunitarias, patrimoniales y culturales desde una lógica de coordinación y resolución.",
    ],
    highlight:
      "Participó en gestiones que contribuyeron a canalizar más de USD 100.000 en fondos no reembolsables para equipamiento y mejoras edilicias del Teatro Artigas de Cardona.",
  },
];

const education = [
  "Diploma en Gestión Cultural, Universidad Católica del Uruguay, 2024.",
  "Tecnicatura Universitaria en Bienes Culturales, Universidad de la República, en curso.",
  "Posgrado en Políticas Culturales de Base Comunitaria, FLACSO, en curso mediante beca de IberCultura Viva.",
];

const complementaryTraining = [
  "Formulación y Gestión de Proyectos, OPP con apoyo del BID y Plenario de Municipios del Uruguay, 2021.",
  "Estrategias para el Turismo Cultural, Dirección Nacional de Cultura del MEC / MICUY, 2022.",
  "Seminario sobre cultura digital y propiedad intelectual, Universidad de Alicante y OEI, 2025.",
  "Cooperación internacional para gobiernos locales uruguayos, 2025.",
  "Formación complementaria en Java, JavaScript, PHP, MySQL y Python.",
  "SEO, WordPress y WooCommerce.",
  "Business English for Entrepreneurs, Alianza Uruguay - Estados Unidos, 2023.",
];

const tools = [
  "Google Workspace, Notion y entornos colaborativos",
  "HTML, CSS, JavaScript, WordPress, PHP y MySQL",
  "Python, Java, VS Code y GitHub",
  "SEO, analítica web y accesibilidad",
];

export default function SobreMiPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-14">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">Sobre mí</p>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight text-zinc-900 md:text-5xl">
              Sergio Pérez
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-zinc-600">
              Gestión cultural, comunicación institucional, proyectos territoriales y diferencial digital aplicado.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-zinc-600">
            <span className="rounded-full border border-zinc-200 bg-white px-3 py-1.5">Cardona, Soriano, Uruguay</span>
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 hover:border-zinc-300 hover:text-zinc-900" href="mailto:yosoy@sergioperez.uy">yosoy@sergioperez.uy</a>
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 hover:border-zinc-300 hover:text-zinc-900" href="https://www.linkedin.com/in/spgestioncultural/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 hover:border-zinc-300 hover:text-zinc-900" href="https://www.sergioperez.uy" target="_blank" rel="noreferrer">sergioperez.uy</a>
          </div>

          <div className="space-y-4 text-base leading-relaxed text-zinc-600">
            <p>
              Soy gestor cultural, comunicador institucional y creador digital con trayectoria en sector público,
              cultura, patrimonio, territorio y proyectos comunitarios. Combino redacción institucional,
              articulación interinstitucional, apoyo técnico a iniciativas culturales y herramientas digitales
              aplicadas a organización, visibilidad y sostenibilidad.
            </p>
            <p>
              Actualmente curso un posgrado en Políticas Culturales de Base Comunitaria en FLACSO mediante
              beca de IberCultura Viva. Mi objetivo es aportar en roles con mayor margen de incidencia,
              desarrollo y proyección, integrando criterio humanístico, capacidad operativa y soporte digital real.
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <div className="aspect-square overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-3 shadow-[0_24px_60px_rgba(24,35,48,0.08)]">
            <Image
              src="/avatarSP.png"
              alt="Retrato profesional de Sergio Pérez"
              width={941}
              height={941}
              sizes="(min-width: 1024px) 384px, 100vw"
              className="h-full w-full rounded-[1.4rem] object-cover object-[center_42%] grayscale contrast-110"
              priority
            />
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {strengths.map((item) => (
          <article key={item.title} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Fortaleza</p>
            <h2 className="mt-3 text-xl font-semibold text-zinc-900">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="space-y-6">
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Competencias</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {competencies.map((item) => (
                <span key={item} className="rounded-full bg-[#dce6f0] px-3 py-1.5 text-xs font-medium text-[#15385f]">
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Formación académica</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-600">
              {education.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Herramientas e idiomas</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-600">
              {tools.map((item) => (
                <li key={item}>{item}</li>
              ))}
              <li>Español nativo, inglés avanzado y portugués intermedio.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Formación complementaria seleccionada</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-600">
              {complementaryTraining.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </aside>

        <div className="space-y-6">
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Propuesta de valor</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-600">
              <li>Traduce necesidades institucionales y comunitarias en comunicación clara, soporte técnico y acciones coordinadas.</li>
              <li>Integra cultura, territorio y herramientas digitales para fortalecer proyectos, equipos y procesos.</li>
              <li>Aporta una combinación poco frecuente entre sensibilidad cultural, capacidad operativa y criterio técnico.</li>
              <li>Puede integrarse con solvencia a organizaciones públicas, privadas, académicas o de cooperación.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Experiencia profesional</p>
            </div>

            {experience.map((item) => (
              <article key={item.role} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">{item.period}</span>
                  <span className="h-1 w-1 rounded-full bg-zinc-300" />
                  <span className="text-sm text-zinc-500">{item.meta}</span>
                </div>
                <h2 className="mt-2 text-2xl font-semibold text-zinc-900">{item.role}</h2>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-600">
                  {item.items.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
                {item.highlight ? (
                  <div className="mt-5 rounded-2xl border-l-4 border-[#15385f] bg-[#eef3f8] px-4 py-4 text-sm leading-relaxed text-zinc-700">
                    {item.highlight}
                  </div>
                ) : null}
              </article>
            ))}
          </section>
        </div>
      </section>
    </div>
  );
}
