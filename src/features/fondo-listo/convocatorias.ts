// Catálogo de convocatorias de Fondo Listo.
// Datos tomados de las bases oficiales (relevamiento del 8/11/2026, ver bases.ts).
// Al publicarse una edición nueva: actualizar `cierre`, `proxima` y `revisada`, y regenerar bases.ts.

export type Criterio = { nombre: string; puntos: number };

export type Convocatoria = {
  id: string;
  nombre: string;
  organismo: string;
  area: "General" | "Música" | "Artes escénicas" | "Audiovisual" | "Patrimonio" | "Internacional";
  /** Cierre de la edición vigente (ISO con zona horaria de Uruguay). null si no hay edición abierta. */
  cierre: string | null;
  /** Cuándo se espera la próxima edición, si la vigente ya cerró. */
  proxima?: string;
  tope: string;
  quien: string;
  criterios: Criterio[];
  /** Puntaje mínimo para ser seleccionable, si las bases lo fijan. */
  minimo?: string;
  documentos: string[];
  noFinancia?: string;
  nota?: string;
  bases: string;
  revisada: string;
};

export const CONVOCATORIAS: Convocatoria[] = [
  {
    id: "fcc",
    nombre: "Fondo Concursable para la Cultura 2026",
    organismo: "MEC · Dirección Nacional de Cultura",
    area: "General",
    cierre: "2026-12-07T17:00:00-03:00",
    tope: "$U 250.000 a $U 500.000 según modalidad",
    quien: "Personas físicas mayores de 18, uruguayas o con residencia legal definitiva. Un proyecto por persona.",
    criterios: [
      { nombre: "Calidad artístico cultural", puntos: 50 },
      { nombre: "Desarrollo y coherencia", puntos: 15 },
      { nombre: "Capacidad y viabilidad de ejecución", puntos: 20 },
      { nombre: "Presupuesto y relación recursos-resultados", puntos: 15 },
    ],
    minimo: "80 de 100",
    documentos: [
      "Cédula y declaración jurada",
      "Portafolio de hasta 10 carillas",
      "Cartas de aceptación del equipo",
      "CV de 1 carilla por integrante",
      "Declaración de derechos de autoría",
      "Cotizaciones para gastos de más de $U 40.000",
    ],
    noFinancia: "Proyectos solo de formación, de equipamiento, de giras al exterior o con otro apoyo público vigente.",
    nota: "El formulario 2026 pide declarar el uso de inteligencia artificial.",
    bases: "https://www.gub.uy/ministerio-educacion-cultura/sites/ministerio-educacion-cultura/files/documentos/noticias/Bases%206-10.pdf",
    revisada: "08/11/2026",
  },
  {
    id: "fnm",
    nombre: "Fondo Nacional de Museos 2026",
    organismo: "MEC · Dirección Nacional de Cultura",
    area: "Patrimonio",
    cierre: "2026-11-10T17:00:00-03:00",
    tope: "Dotación total de $U 8.500.000",
    quien: "Museos y responsables de colecciones según las líneas de las bases.",
    criterios: [
      { nombre: "Pertinencia", puntos: 30 },
      { nombre: "Viabilidad técnica", puntos: 25 },
      { nombre: "Impactos específicos", puntos: 25 },
      { nombre: "Presupuesto y cofinanciamiento", puntos: 20 },
    ],
    minimo: "80 de 100",
    documentos: ["Documentación general de Cultura en Línea", "Presupuesto y cofinanciamiento"],
    bases: "https://culturaenlinea.uy",
    revisada: "08/11/2026",
  },
  {
    id: "fic",
    nombre: "Fondos de Incentivo Cultural",
    organismo: "MEC · CONAEF (beneficio fiscal con empresas)",
    area: "General",
    cierre: null,
    proxima: "Edición 2027 (la de 2026 cerró el 14/09)",
    tope: "Hasta $U 3.600.000 ($U 7.100.000 en audiovisual)",
    quien: "Personas físicas o jurídicas que luego consiguen aportes de empresas con beneficio fiscal.",
    criterios: [
      { nombre: "Calidad artística y relevancia cultural", puntos: 45 },
      { nombre: "Impacto cultural e interés público", puntos: 25 },
      { nombre: "Viabilidad y consistencia", puntos: 20 },
      { nombre: "Antecedentes y méritos", puntos: 10 },
    ],
    minimo: "75 de 100 para entrar al Registro",
    documentos: ["Síntesis de 700 caracteres", "Presupuesto con topes de honorarios"],
    bases: "https://www.fondosdeincentivocultural.gub.uy",
    revisada: "08/11/2026",
  },
  {
    id: "fonam",
    nombre: "FONAM · Fondo Nacional de Música",
    organismo: "Fondo Nacional de Música",
    area: "Música",
    cierre: null,
    proxima: "1.er llamado 2027, en marzo (estimado)",
    tope: "Las bases no fijan topes; se pide en pesos",
    quien: "Personas de 18 años o más; grupos mediante mandatario autorizado. Un proyecto por rubro.",
    criterios: [],
    documentos: [
      "Tres presupuestos de proveedores distintos (excluyente)",
      "Demo o material según el rubro",
      "Cartas oficiales de las salas en conciertos",
    ],
    nota: "Las bases no publican criterios de evaluación: el chequeo usa los criterios generales de formulación.",
    bases: "https://fonam.uy/bases/",
    revisada: "08/11/2026",
  },
  {
    id: "frc",
    nombre: "Fondo Regional para la Cultura",
    organismo: "MEC · Dirección Nacional de Cultura",
    area: "General",
    cierre: null,
    proxima: "Edición 2027, entre julio y setiembre (estimado)",
    tope: "$U 200.000 ($U 500.000 en Circulación)",
    quien: "Residentes permanentes del interior (no Montevideo).",
    criterios: [
      { nombre: "Calidad de la propuesta", puntos: 40 },
      { nombre: "Antecedentes y méritos", puntos: 15 },
      { nombre: "Coherencia global", puntos: 15 },
      { nombre: "Puntos adicionales (descentralización, diversidad, juventudes, accesibilidad, género)", puntos: 30 },
    ],
    minimo: "75 % del puntaje",
    documentos: ["Documentación general de Cultura en Línea"],
    bases: "https://culturaenlinea.uy/oportunidade/2784/",
    revisada: "08/11/2026",
  },
  {
    id: "fefca",
    nombre: "FEFCA · Formación y Creación Artística",
    organismo: "MEC · Dirección Nacional de Cultura",
    area: "General",
    cierre: null,
    proxima: "Edición 2027, entre junio y julio (estimado)",
    tope: "Becas de $U 150.000 a $U 400.000",
    quien: "Artistas según cada beca (Justino Zavala Muniz, Nancy Bacelo, Teresa Vila) y becas de formación.",
    criterios: [
      { nombre: "Propuesta (formación)", puntos: 70 },
      { nombre: "Antecedentes (formación)", puntos: 30 },
    ],
    nota: "En las becas de creación se evalúan solo antecedentes y méritos.",
    documentos: ["Documentación general de Cultura en Línea"],
    bases: "https://culturaenlinea.uy",
    revisada: "08/11/2026",
  },
  {
    id: "acau",
    nombre: "ACAU · Producción de Contenidos Audiovisuales",
    organismo: "Agencia del Cine y el Audiovisual del Uruguay",
    area: "Audiovisual",
    cierre: null,
    proxima: "Edición 2027, entre enero y marzo (estimado)",
    tope: "Cortos $U 600.000 · largos hasta $U 6.050.000",
    quien: "Casas productoras y realizadores según categoría.",
    criterios: [
      { nombre: "Guion y propuesta", puntos: 40 },
      { nombre: "Propuesta cinematográfica y antecedentes de dirección", puntos: 30 },
      { nombre: "Propuesta de producción y viabilidad", puntos: 30 },
    ],
    documentos: ["Guion o tratamiento", "Plan de producción y presupuesto"],
    bases: "https://www.acau.gub.uy",
    revisada: "08/11/2026",
  },
  {
    id: "im-pfa",
    nombre: "Fortalecimiento de las Artes (Teatro, Danza, Música)",
    organismo: "Intendencia de Montevideo",
    area: "Artes escénicas",
    cierre: null,
    proxima: "Ediciones 2027, entre mayo y agosto (estimado)",
    tope: "Según cada llamado",
    quien: "Artistas nacionales o residentes con 2 años o más, inscriptos en el Registro Nacional de Artistas (MTSS).",
    criterios: [],
    nota: "Criterios con igual peso, de 1 a 10 cada uno, según el llamado.",
    documentos: ["Registro Nacional de Artistas y Oficios Conexos"],
    bases: "https://montevideo.gub.uy",
    revisada: "08/11/2026",
  },
  {
    id: "canelones",
    nombre: "Canelones PRENDE · Fondos Culturales",
    organismo: "Intendencia de Canelones",
    area: "General",
    cierre: null,
    proxima: "Edición 2027, entre setiembre y octubre (estimado)",
    tope: "Según categoría",
    quien: "Artistas y colectivos vinculados a Canelones.",
    criterios: [],
    documentos: ["Según las bases de la edición"],
    bases: "https://www.imcanelones.gub.uy",
    revisada: "08/11/2026",
  },
  {
    id: "iberescena",
    nombre: "Iberescena",
    organismo: "Programa Iber · artes escénicas",
    area: "Internacional",
    cierre: null,
    proxima: "Edición 2027-2028, entre mayo y julio (estimado)",
    tope: "Hasta 10.000 € a 20.000 € según la línea",
    quien: "Espacios, festivales y compañías; la coproducción exige núcleos de dos países.",
    criterios: [
      { nombre: "Artística", puntos: 40 },
      { nombre: "Alineación con objetivos estratégicos", puntos: 20 },
      { nombre: "Técnica", puntos: 15 },
      { nombre: "Económica y de ejecución", puntos: 15 },
      { nombre: "Igualdad de género", puntos: 10 },
    ],
    documentos: ["Modelo de proyecto con límites de páginas y caracteres"],
    bases: "https://www.iberescena.org",
    revisada: "08/11/2026",
  },
  {
    id: "ibermusicas",
    nombre: "Ibermúsicas",
    organismo: "Programa Iber · música",
    area: "Internacional",
    cierre: null,
    proxima: "Edición 2027, a mediados de año",
    tope: "Hasta USD 10.000 según la línea",
    quien: "Músicos y programadores; Uruguay participa en 6 de las 15 líneas.",
    criterios: [
      { nombre: "Impacto", puntos: 50 },
      { nombre: "Trayectoria", puntos: 30 },
      { nombre: "Relevancia del anfitrión", puntos: 10 },
      { nombre: "Acciones afirmativas", puntos: 10 },
    ],
    documentos: ["Perfil en el Catálogo del Sector Musical", "Carta de invitación", "Síntesis de hasta 100 palabras"],
    bases: "https://www.ibermusicas.org",
    revisada: "08/11/2026",
  },
];

export function getConvocatoria(id: string) {
  return CONVOCATORIAS.find((c) => c.id === id);
}

export type Estado = { tipo: "abierta"; texto: string } | { tipo: "proxima"; texto: string };

const fechaCorta = new Intl.DateTimeFormat("es-UY", {
  day: "2-digit",
  month: "2-digit",
  timeZone: "America/Montevideo",
});

export function estadoDe(c: Convocatoria, ahora = new Date()): Estado {
  if (c.cierre && new Date(c.cierre) > ahora) {
    return { tipo: "abierta", texto: `Abierta · cierra el ${fechaCorta.format(new Date(c.cierre))}` };
  }
  return { tipo: "proxima", texto: c.proxima ?? "Próxima edición a confirmar" };
}
