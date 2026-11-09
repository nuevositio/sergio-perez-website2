import { z } from "zod";
import { CONVOCATORIAS } from "./convocatorias";

// ─── Entrevista guiada ──────────────────────────────────────────────────────

export type Pregunta = {
  id: string;
  titulo: string;
  ayuda: string;
  tipo: "texto" | "largo" | "opciones";
  opciones?: string[];
  max: number;
  min?: number;
};

export const PREGUNTAS: Pregunta[] = [
  { id: "titulo", titulo: "¿Cómo se llama tu proyecto?", ayuda: "Un título provisorio alcanza. Lo podemos mejorar.", tipo: "texto", max: 120, min: 2 },
  {
    id: "disciplina",
    titulo: "¿En qué área se ubica?",
    ayuda: "Elegí la más cercana. Si la convocatoria tiene categorías, la vamos a ajustar a ellas.",
    tipo: "opciones",
    opciones: ["Música", "Artes escénicas", "Artes visuales", "Letras y edición", "Audiovisual", "Patrimonio y memoria", "Diseño y artesanía", "Multidisciplinario"],
    max: 40,
    min: 2,
  },
  { id: "idea", titulo: "Contá el proyecto: ¿qué vas a hacer?", ayuda: "Con tus palabras. Qué es, en qué consiste y qué queda al final (una obra, un disco, una gira, un libro, un ciclo…).", tipo: "largo", max: 1500, min: 60 },
  { id: "necesidad", titulo: "¿Por qué es necesario hacerlo ahora y ahí?", ayuda: "Qué vacío, necesidad u oportunidad atiende. Los jurados valoran que el proyecto responda a algo concreto del territorio o del sector.", tipo: "largo", max: 1000, min: 30 },
  { id: "publico", titulo: "¿A quién va dirigido y dónde se hace?", ayuda: "Quiénes participan o asisten, cuántas personas aproximadamente y en qué localidades.", tipo: "largo", max: 800, min: 20 },
  { id: "actividades", titulo: "¿Qué actividades concretas incluye?", ayuda: "Ensayos, talleres, funciones, grabación, presentaciones… Si sabés cuántas y cuándo, mejor.", tipo: "largo", max: 1000, min: 20 },
  { id: "equipo", titulo: "¿Quiénes integran el equipo?", ayuda: "Nombres o roles y qué antecedentes tiene cada persona relacionados con este proyecto.", tipo: "largo", max: 1000, min: 10 },
  { id: "antecedentes", titulo: "Tus antecedentes", ayuda: "Obras, premios, trabajos anteriores, prensa. Solo lo que sea real: no inventamos nada.", tipo: "largo", max: 1000, min: 10 },
  {
    id: "aliados",
    titulo: "¿Tenés instituciones o espacios aliados?",
    ayuda: "Salas, escuelas, centros culturales, municipios o colectivos que participen o te avalen.",
    tipo: "opciones",
    opciones: ["Sí, con carta firmada", "Conversado, sin carta todavía", "Todavía no"],
    max: 40,
    min: 2,
  },
  { id: "aliadosDetalle", titulo: "¿Cuáles son?", ayuda: "Nombralos. Si todavía no tenés, contá con cuáles te gustaría trabajar.", tipo: "largo", max: 600 },
  { id: "monto", titulo: "¿Cuánto vas a pedir, en pesos uruguayos?", ayuda: "Un número aproximado. Si no sabés, poné 0 y te sugerimos un monto dentro del tope.", tipo: "texto", max: 20, min: 1 },
  { id: "otrasFuentes", titulo: "¿Tenés otras fuentes de financiamiento?", ayuda: "Aportes propios, entradas, apoyos privados u otros fondos. Algunas bases no permiten tener otro apoyo público para el mismo proyecto.", tipo: "largo", max: 600 },
  { id: "plazos", titulo: "¿Cuándo se haría y cuánto dura?", ayuda: "Meses aproximados. Cada convocatoria tiene su período de ejecución.", tipo: "texto", max: 200, min: 2 },
  {
    id: "derechos",
    titulo: "¿Usás obras de otras personas?",
    ayuda: "Canciones, textos, imágenes o música que no son tuyas.",
    tipo: "opciones",
    opciones: ["No, todo es propio", "Sí, con autorización", "Sí, sin autorización todavía", "No sé"],
    max: 40,
    min: 2,
  },
  { id: "departamento", titulo: "¿En qué departamento vivís?", ayuda: "Algunas convocatorias son solo para el interior o tienen cupos por territorio.", tipo: "texto", max: 40, min: 2 },
];

const respuestasShape = Object.fromEntries(
  PREGUNTAS.map((p) => [p.id, z.string().trim().max(p.max).min(p.min ?? 0)]),
) as Record<string, z.ZodString>;

export const solicitudSchema = z.object({
  convocatoria: z.enum(CONVOCATORIAS.map((c) => c.id) as [string, ...string[]]),
  respuestas: z.object(respuestasShape),
  nombre: z.string().trim().min(2).max(120),
  email: z.email().max(200),
  telefono: z.string().trim().max(40).default(""),
  // Honeypot: lo completan solo los bots
  website: z.string().max(0).default(""),
});

export type Solicitud = z.infer<typeof solicitudSchema>;

export function describirRespuestas(respuestas: Record<string, string>) {
  return PREGUNTAS.map((p) => `### ${p.titulo}\n${respuestas[p.id]?.trim() || "(sin respuesta)"}`).join("\n\n");
}

// ─── Resultado del chequeo (salida estructurada de la IA) ──────────────────

export const chequeoSchema = z.object({
  resumen: z.string().describe("Dos o tres oraciones: cómo está el proyecto frente a esta convocatoria."),
  criterios: z
    .array(
      z.object({
        nombre: z.string(),
        maximo: z.number(),
        estimado: z.number(),
        comentario: z.string().describe("Una oración concreta: qué suma y qué resta."),
      }),
    )
    .describe("Uno por criterio de evaluación de la convocatoria, en el orden de las bases."),
  admisibilidad: z
    .array(
      z.object({
        estado: z.enum(["ok", "atencion", "riesgo"]),
        texto: z.string(),
      }),
    )
    .describe("Requisitos de las bases: quién puede postular, montos, incompatibilidades, documentación."),
  refuerzos: z
    .array(z.object({ titulo: z.string(), detalle: z.string() }))
    .describe("Exactamente tres cosas para reforzar, las que más puntos pueden sumar."),
  documentos: z.array(z.string()).describe("Documentos que la persona todavía tiene que conseguir."),
});

export type Chequeo = z.infer<typeof chequeoSchema>;

// ─── Planes ────────────────────────────────────────────────────────────────

export const PLANES = {
  listo: {
    nombre: "Proyecto Listo",
    precio: 1490,
    incluye: [
      "El proyecto completo, campo por campo, según el formulario de la convocatoria",
      "Presupuesto en pesos por rubro, dentro del tope",
      "Cronograma, indicadores y plan de difusión",
      "Modelos de carta de aval y de cesión de derechos",
      "Lista de documentos para el cierre",
      "Descarga en Word",
    ],
  },
  revision: {
    nombre: "Proyecto Listo + revisión de Sergio",
    precio: 4900,
    incluye: [
      "Todo lo de Proyecto Listo",
      "Reunión de 45 minutos por Zoom con Sergio",
      "Correcciones escritas sobre tu versión final",
      "Revisión del presupuesto y la documentación antes del cierre",
    ],
  },
} as const;

export type PlanId = keyof typeof PLANES;

export function formatoPesos(n: number) {
  return "$U " + n.toLocaleString("es-UY");
}
