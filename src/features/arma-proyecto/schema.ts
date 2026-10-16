import { z } from "zod";
import { BUDGETS, DEPARTMENTS, DISCIPLINES, FUNDS, STAGES, labelOf, type Option } from "./options";

const oneOf = (options: Option[]) =>
  z.enum(options.map((o) => o.value) as [string, ...string[]]);
const optional = (options: Option[]) => z.union([oneOf(options), z.literal("")]).default("");

export const DESCRIPTION_MAX = 1200;

export const projectRequestSchema = z.object({
  projectTitle: z.string().trim().min(2).max(120),
  discipline: oneOf(DISCIPLINES),
  stage: oneOf(STAGES),
  description: z.string().trim().min(30).max(DESCRIPTION_MAX),
  department: optional(DEPARTMENTS),
  budget: optional(BUDGETS),
  funds: z.array(oneOf(FUNDS)).max(FUNDS.length).default([]),
  deadline: z.string().trim().max(20).default(""),
  contactName: z.string().trim().min(2).max(120),
  contactEmail: z.email().max(200),
  contactPhone: z.string().trim().max(40).default(""),
  comments: z.string().trim().max(600).default(""),
  // Honeypot: un campo oculto que solo completan los bots
  website: z.string().max(0).default(""),
});

export type ProjectRequest = z.infer<typeof projectRequestSchema>;

export function formDataToRequest(data: FormData) {
  const entries = Object.fromEntries(
    [...data.keys()].filter((k) => k !== "funds").map((k) => [k, String(data.get(k) ?? "")]),
  );
  return { ...entries, funds: data.getAll("funds").map(String) };
}

/** Texto legible de la solicitud, para el prompt y para mensajes. */
export function describeRequest(r: ProjectRequest) {
  const pick = (options: Option[], value: string, fallback: string) =>
    value ? labelOf(options, value) : fallback;
  return [
    `Título: ${r.projectTitle}`,
    `Disciplina: ${labelOf(DISCIPLINES, r.discipline)}`,
    `Etapa: ${labelOf(STAGES, r.stage)}`,
    `Departamento: ${pick(DEPARTMENTS, r.department, "No indicado")}`,
    `Presupuesto estimado: ${pick(BUDGETS, r.budget, "Sin definir")}`,
    `Fondos de interés: ${r.funds.map((f) => labelOf(FUNDS, f)).join(", ") || "No indicados"}`,
    `Fecha de cierre de la convocatoria: ${r.deadline || "Sin definir"}`,
    `Descripción: ${r.description}`,
    `Comentarios adicionales: ${r.comments || "Ninguno"}`,
  ].join("\n");
}
