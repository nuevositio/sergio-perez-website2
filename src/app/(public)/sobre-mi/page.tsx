import Image from "next/image";
import type { Metadata } from "next";
import { OrganizationJsonLd, PersonJsonLd, ProfilePageJsonLd } from "@/components/seo/json-ld";

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

const certificationGroups = [
  {
    area: "Gestión cultural, patrimonio y territorio",
    summary: "Formación universitaria, patrimonio, turismo cultural y cultura digital aplicada.",
    accent: "bg-[#15385f] text-white",
    items: [
      {
        title: "Diploma en Gestión Cultural",
        issuer: "Universidad Católica del Uruguay",
        year: "2024",
        detail: "Formación académica orientada a gestión, diseño y sostenibilidad de proyectos culturales.",
      },
      {
        title: "Tecnicatura Universitaria en Bienes Culturales",
        issuer: "Universidad de la República",
        year: "En curso",
        detail: "Trayecto universitario vinculado a patrimonio, bienes culturales y territorio.",
      },
      {
        title: "Posgrado en Políticas Culturales de Base Comunitaria",
        issuer: "FLACSO / IberCultura Viva",
        year: "En curso",
        detail: "Formación de posgrado cursada mediante beca de IberCultura Viva.",
      },
      {
        title: "Estrategias para el Turismo Cultural",
        issuer: "Dirección Nacional de Cultura del MEC / MICUY",
        year: "2022",
        detail: "Taller realizado en Trinidad, Flores, del 23 al 26 de junio de 2022.",
      },
      {
        title: "Cultura digital y propiedad intelectual",
        issuer: "Universidad de Alicante / OEI",
        year: "2025",
        detail: "Seminario en línea de 12 horas sobre derecho de autor en el siglo XXI.",
      },
    ],
  },
  {
    area: "Proyectos, cooperación y gestión pública",
    summary: "Herramientas para formular, coordinar, evaluar y escalar iniciativas institucionales.",
    accent: "bg-zinc-900 text-white",
    items: [
      {
        title: "Formulación y Gestión de Proyectos",
        issuer: "OPP, BID y Plenario de Municipios del Uruguay",
        year: "2021",
        detail: "Curso virtual de 30 horas dictado entre el 18/10/2021 y el 29/11/2021.",
      },
      {
        title: "Cooperación internacional para gobiernos locales uruguayos",
        issuer: "Formación especializada",
        year: "2025",
        detail: "Capacitación aplicada a oportunidades de cooperación en ámbitos subnacionales.",
      },
    ],
  },
  {
    area: "Tecnología, desarrollo web y marketing digital",
    summary: "Capacitación técnica orientada a construir, posicionar y mantener plataformas digitales.",
    accent: "bg-[#dce6f0] text-[#15385f]",
    items: [
      {
        title: "Java, JavaScript, PHP, MySQL y Python",
        issuer: "Formación complementaria en programación",
        year: "Formación continua",
        detail: "Bases de desarrollo web, lógica de programación, backend y bases de datos.",
      },
      {
        title: "SEO, WordPress y WooCommerce",
        issuer: "Formación profesional aplicada",
        year: "Formación continua",
        detail: "Optimización orgánica, sitios administrables, mantenimiento web y comercio electrónico.",
      },
    ],
  },
  {
    area: "Idiomas y comunicación profesional",
    summary: "Competencias de comunicación para contextos institucionales, digitales y de negocio.",
    accent: "bg-zinc-100 text-zinc-700",
    items: [
      {
        title: "Business English for Entrepreneurs",
        issuer: "Alianza Uruguay - Estados Unidos",
        year: "2023",
        detail: "Inglés aplicado a emprendimientos, negociación, proyectos y comunicación profesional.",
      },
    ],
  },
];

const certificationCount = certificationGroups.reduce((total, group) => total + group.items.length, 0);

const tools = [
  "Google Workspace, Notion y entornos colaborativos",
  "HTML, CSS, JavaScript, WordPress, PHP y MySQL",
  "Python, Java, VS Code y GitHub",
  "SEO, analítica web y accesibilidad",
];

export default function SobreMiPage() {
  return (
    <>
      <PersonJsonLd />
      <OrganizationJsonLd />
      <ProfilePageJsonLd />
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

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
          Perfil profesional
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-zinc-900">
          Gestión cultural, comunicación pública y desarrollo digital con base territorial
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-relaxed text-zinc-600">
          Sergio Pérez es gestor cultural, comunicador institucional y desarrollador web uruguayo.
          Su trabajo combina gestión cultural, patrimonio, territorio, redacción profesional,
          comunicación pública, SEO técnico y desarrollo digital. Desde Cardona, Soriano, acompaña
          proyectos culturales, instituciones, empresas y profesionales que necesitan ordenar su
          comunicación, formular iniciativas, fortalecer su presencia web y construir confianza con
          públicos reales.
        </p>
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

      <section className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm lg:col-span-2">
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
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Propuesta de valor</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-600">
              <li>Traduce necesidades institucionales y comunitarias en comunicación clara, soporte técnico y acciones coordinadas.</li>
              <li>Integra cultura, territorio y herramientas digitales para fortalecer proyectos, equipos y procesos.</li>
              <li>Aporta una combinación poco frecuente entre sensibilidad cultural, capacidad operativa y criterio técnico.</li>
              <li>Puede integrarse con solvencia a organizaciones públicas, privadas, académicas o de cooperación.</li>
            </ul>
          </section>
        </div>

        <section className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Experiencia profesional</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {experience.map((item) => (
              <article key={item.role} className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
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
          </div>
        </section>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 border-t border-zinc-200 pt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Certificaciones</p>
            <h2 className="mt-2 text-3xl font-semibold text-zinc-900">Formación acreditada y continua</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-zinc-600">
            {certificationCount} certificaciones y trayectos formativos agrupados por área de trabajo.
          </p>
        </div>

        <div className="space-y-8">
          {certificationGroups.map((group) => (
            <section key={group.area} className="space-y-4">
              <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <h3 className="text-2xl font-semibold text-zinc-900">{group.area}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">{group.summary}</p>
                  </div>
                  <div className={`inline-flex w-fit items-center rounded-full px-4 py-2 text-xs font-semibold ${group.accent}`}>
                    {group.items.length} {group.items.length === 1 ? "certificación" : "certificaciones"}
                  </div>
                </div>
              </div>

              <div className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
                {group.items.map((item) => (
                  <article
                    key={`${group.area}-${item.title}`}
                    className="flex h-full min-h-48 flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-500">
                          {item.year}
                        </span>
                        <span className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">
                          {item.issuer}
                        </span>
                      </div>
                      <h4 className="mt-3 text-lg font-semibold leading-snug text-zinc-900">{item.title}</h4>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-600">{item.detail}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

      </section>
      </div>
    </>
  );
}
