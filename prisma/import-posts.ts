/**
 * Script de importación de columnas/posts desde el sitio estático viejo.
 * Ejecutar con: npm run prisma:import
 */

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as fs from "fs";
import * as path from "path";

const STATIC_POSTS_DIR = path.resolve(
  __dirname,
  "../../posts"
);

// UUID fijo para Sergio Pérez (autor de todos los posts)
const SERGIO_ID = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";

// Patrones que identifican slugs con typos (versiones corruptas a descartar)
const TYPO_PATTERNS = [
  "diua",
  "gestioun",
  "sabiduriua",
  "tradicioun",
  "conservacioun",
  "conversacioun",
  "visibilizacioun",
  "muusica",
  "luteriua",
  "-aungel-",
  "maus-",
  "anaos-",
  "diaulogos",
  "garciua",
  "martiun-",
  "entreviusta",
  "-labraga-cuando", // por si acaso
];

// Slugs a excluir explícitamente (duplicados que el prefijo-logic no captura)
const SKIP_SLUGS = new Set([
  "4ta-edicio-guitarras-en-obra",
  "homenaje-a-osiris-sarandi-del-yi-",     // trailing dash (hay versión sin dash)
  "centenario-osiris-sin-reconocimiento-oficial-",
  "alla-en-mi-pago-hay-un-pueblo-que-se-llama-no-me-o", // truncated
]);

function isTypoSlug(slug: string): boolean {
  return TYPO_PATTERNS.some((p) => slug.includes(p));
}

// Normaliza el slug: corrige typos de nombre y elimina trailing dashes
function normalizeSlug(slug: string): string {
  return slug
    .replace("entreivsta-", "entrevista-")
    .replace("entrevisa-a-schubert", "entrevista-a-schubert")
    .replace(/-+$/, ""); // quita trailing dashes
}

// Asigna categoría (slug de categoría) según el slug del post
function getCategorySlug(slug: string): string {
  const techKeywords = [
    "spotify",
    "plataforma-digital",
    "medio-es-el-mensaje",
    "sergio-perez-lanzo",
  ];
  const opinionKeywords = [
    "diferencia-incomoda",
    "propio-incomoda",
    "cultura-ingobernable",
    "sabiduria-en-la-era",
    "identidad-nacional",
    "por-que-la-gestion",
    "importancia-de-una-gestion",
    "integracion-de-las-industrias",
    "valoracion-del-arte",
    "que-hacemos-con-la-estacion",
    "pulso-legal",
    "analisis-a-nuestra",
    "dialogos-de-la-memoria",
    "dialogos-sobre-el-futuro",
    "cuando-lo-propio",
    "cultura-ingobernable",
  ];

  if (techKeywords.some((k) => slug.includes(k))) return "tecnologia-y-desarrollo";
  if (opinionKeywords.some((k) => slug.includes(k))) return "periodismo-y-opinion";
  return "gestion-cultural";
}

function parseTitle(html: string, slug: string): string {
  // og:title es más limpio que <title> en los posts completos
  const ogMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/);
  if (ogMatch && ogMatch[1].trim().length > 3) return ogMatch[1].trim();

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/);
  if (titleMatch && titleMatch[1].trim().length > 3) return titleMatch[1].trim();

  // Fallback: derivar del slug (para posts que son solo fragmentos HTML)
  return slug
    .replace(/-+$/, "")
    .split("-")
    .map((w, i) => (i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function parseExcerpt(html: string): string {
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/);
  if (descMatch && descMatch[1].length > 20) {
    // Limitar a 300 chars para excerpt
    return descMatch[1].trim().substring(0, 300);
  }
  // Fallback: primer párrafo significativo del contenido
  const content = parseContent(html);
  const firstPara = content.split("\n\n")[0] || "";
  return firstPara.substring(0, 300);
}

function parseContent(html: string): string {
  // Usar bloque <main> si existe (posts con HTML completo), sino todo el HTML
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  const sourceHtml = mainMatch ? mainMatch[1] : html;

  // Extraer texto de cada <p>
  const paragraphs: string[] = [];
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/g;
  let m: RegExpExecArray | null;

  while ((m = pRegex.exec(sourceHtml)) !== null) {
    // Strip etiquetas internas
    const text = m[1].replace(/<[^>]+>/g, "").trim();

    // Saltar líneas de boilerplate / meta
    if (
      text.includes("Aquí tienes el artículo completo") ||
      /^Por Sergio Pérez?/.test(text) ||
      /^Escribe:?\s*(Sergio|sergio)/i.test(text) ||
      /^@sergioperezconguitarra/.test(text) ||
      /^Ig:?\s*@/.test(text) ||
      /^Instagram:?\s*@/.test(text) ||
      /^Música\/Gestor/.test(text) ||
      /^Musico\s*\//.test(text) ||
      /^© /.test(text) ||
      text.length < 15
    ) {
      continue;
    }

    paragraphs.push(text);
  }

  return paragraphs.join("\n\n");
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL no está definida");
  }

  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  // 1. Asegurar que el usuario autor existe
  await prisma.user.upsert({
    where: { id: SERGIO_ID },
    update: {},
    create: {
      id: SERGIO_ID,
      email: "yosoy@sergioperez.uy",
      name: "Sergio Pérez",
    },
  });

  // 2. Cargar categorías
  const categories = await prisma.category.findMany();
  const catMap = Object.fromEntries(categories.map((c) => [c.slug, c.id]));

  if (!catMap["gestion-cultural"]) {
    throw new Error(
      "Categorías no encontradas. Ejecutá primero: npm run prisma:seed"
    );
  }

  // 3. Leer directorios de posts
  const entries = fs.readdirSync(STATIC_POSTS_DIR);
  const allSlugs = entries.filter((e) => {
    const fullPath = path.join(STATIC_POSTS_DIR, e);
    return (
      fs.statSync(fullPath).isDirectory() &&
      fs.existsSync(path.join(fullPath, "index.html"))
    );
  });

  // 4. Filtrar typos y slugs explícitamente excluídos
  const step1 = allSlugs.filter(
    (s) => !SKIP_SLUGS.has(s) && !isTypoSlug(s)
  );

  // 5. Filtrar slugs que son prefijo de otro (versiones más cortas del mismo post)
  const canonicalSlugs = step1.filter((slug) => {
    return !step1.some(
      (other) => other !== slug && other.startsWith(slug + "-")
    );
  });

  console.log(`Total dirs encontradas: ${allSlugs.length}`);
  console.log(`Posts a importar: ${canonicalSlugs.length}`);
  console.log("---");

  let imported = 0;
  let skipped = 0;
  let errors = 0;

  for (const rawSlug of canonicalSlugs) {
    const htmlPath = path.join(STATIC_POSTS_DIR, rawSlug, "index.html");
    const html = fs.readFileSync(htmlPath, "utf-8");

    const slug = normalizeSlug(rawSlug);
    const title = parseTitle(html, slug);
    const excerpt = parseExcerpt(html);
    const content = parseContent(html);

    if (!content || content.length < 50) {
      console.log(`  SKIP (sin contenido): ${rawSlug}`);
      skipped++;
      continue;
    }

    const categorySlug = getCategorySlug(slug);
    const categoryId = catMap[categorySlug] ?? catMap["gestion-cultural"];

    try {
      await prisma.post.upsert({
        where: { slug },
        update: {
          title,
          excerpt,
          content,
          categoryId,
          status: "published",
          publishedAt: new Date(),
        },
        create: {
          title,
          slug,
          excerpt,
          content,
          status: "published",
          publishedAt: new Date(),
          authorId: SERGIO_ID,
          categoryId,
        },
      });
      console.log(`  ✓ [${categorySlug.split("-")[0]}] ${title}`);
      imported++;
    } catch (err) {
      console.error(`  ✗ ${rawSlug}: ${err}`);
      errors++;
    }
  }

  console.log(
    `\nResultado: ${imported} importados, ${skipped} sin contenido, ${errors} errores`
  );

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
