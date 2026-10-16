// Opciones del formulario "Armá tu proyecto".
// `value` viaja en el form; `label` es lo que se lee en el mensaje de WhatsApp/email.

export type Option = { value: string; label: string };

export const DISCIPLINES: Option[] = [
  { value: "musica", label: "Música" },
  { value: "teatro", label: "Teatro / Artes escénicas" },
  { value: "danza", label: "Danza" },
  { value: "artes-visuales", label: "Artes visuales" },
  { value: "audiovisual", label: "Audiovisual / Cine" },
  { value: "literatura", label: "Literatura / Edición" },
  { value: "patrimonio", label: "Patrimonio cultural" },
  { value: "multidisciplinario", label: "Multidisciplinario" },
  { value: "otro", label: "Otro" },
];

export const STAGES: Option[] = [
  { value: "idea", label: "Es una idea, todavía sin escribir" },
  { value: "borrador", label: "Tengo un borrador o notas" },
  { value: "avanzado", label: "Proyecto escrito, necesito revisión" },
  { value: "postulacion", label: "Estoy por postular a una convocatoria" },
];

export const BUDGETS: Option[] = [
  { value: "menos-50k", label: "Menos de $U 50.000" },
  { value: "50k-150k", label: "$U 50.000 – 150.000" },
  { value: "150k-300k", label: "$U 150.000 – 300.000" },
  { value: "300k-500k", label: "$U 300.000 – 500.000" },
  { value: "mas-500k", label: "Más de $U 500.000" },
];

export const DEPARTMENTS: Option[] = [
  "Artigas", "Canelones", "Cerro Largo", "Colonia", "Durazno",
  "Flores", "Florida", "Lavalleja", "Maldonado", "Montevideo",
  "Paysandú", "Río Negro", "Rivera", "Rocha", "Salto",
  "San José", "Soriano", "Tacuarembó", "Treinta y Tres",
]
  .map((d) => ({ value: d, label: d }))
  .concat({ value: "exterior", label: "Fuera de Uruguay" });

export const FUNDS: Option[] = [
  { value: "fonam", label: "FONAM – Fondo Nacional de Música" },
  { value: "foca", label: "Fondos Concursables para la Cultura (MEC)" },
  { value: "fic", label: "Fondos de Incentivo Cultural (MEC)" },
  { value: "iber", label: "Programas Iber (Ibermúsicas, Iberescena…)" },
  { value: "icau", label: "Fomento audiovisual (ICAU)" },
  { value: "departamentales", label: "Llamados de Intendencias departamentales" },
  { value: "internacionales", label: "Cooperación internacional (OEI, embajadas…)" },
  { value: "auspicios", label: "Auspicios / patrocinio empresarial" },
  { value: "orientacion", label: "No sé / necesito orientación" },
];

export function labelOf(options: Option[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}
