/**
 * JSON-LD Structured Data components
 * Mejorar visibilidad orgánica mediante datos estructurados schema.org
 */

const BASE = "https://www.sergioperez.uy";

// ─── Persona / Autor ───────────────────────────────────────────────────────────
export function PersonJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE}/#person`,
    name: "Sergio Pérez",
    url: BASE,
    email: "yosoy@sergioperez.uy",
    jobTitle: "Gestor Cultural, Comunicador y Desarrollador Web",
    description:
      "Gestor cultural, columnista y desarrollador web uruguayo. Diseño proyectos culturales, estrategia editorial y plataformas web profesionales.",
    nationality: {
      "@type": "Country",
      name: "Uruguay",
    },
    sameAs: [
      "https://www.instagram.com/sergioperez.uy",
      "https://www.facebook.com/sergioperez.uy",
      "https://www.linkedin.com/in/sergioperezuy",
      "https://themesh.art/perfil/spgestioncultural/",
    ],
    knowsAbout: [
      "Gestión Cultural",
      "Comunicación Estratégica",
      "Desarrollo Web",
      "Periodismo Cultural",
      "Fondos Concursables Uruguay",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── WebSite con SearchAction ─────────────────────────────────────────────────
export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    url: BASE,
    name: "Sergio Pérez",
    description:
      "Sitio profesional de Sergio Pérez: gestión cultural, comunicación estratégica y desarrollo web en Uruguay.",
    publisher: { "@id": `${BASE}/#person` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE}/columnas?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Servicio Profesional ─────────────────────────────────────────────────────
export function ProfessionalServiceJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE}/#service`,
    name: "Sergio Pérez — Servicios Profesionales",
    url: `${BASE}/servicios`,
    provider: { "@id": `${BASE}/#person` },
    areaServed: [
      { "@type": "Country", name: "Uruguay" },
      { "@type": "AdministrativeArea", name: "América Latina" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Gestión de Proyectos Culturales",
            description:
              "Diseño, planificación y coordinación de festivales, ciclos, exposiciones y convocatorias.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Columnismo y Estrategia Editorial",
            description:
              "Producción de columnas de opinión, plan editorial y construcción de autoridad narrativa.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Desarrollo Web Profesional",
            description:
              "Construcción de sitios y plataformas con Next.js. SEO técnico, rendimiento y diseño orientado a conversión.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Article / BlogPosting ────────────────────────────────────────────────────
interface ArticleJsonLdProps {
  title: string;
  description: string;
  slug: string;
  publishedAt: Date | null;
  updatedAt: Date;
  authorName: string;
  category: string;
  featuredImage?: string | null;
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  authorName,
  category,
  featuredImage,
}: ArticleJsonLdProps) {
  const url = `${BASE}/columnas/${slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    datePublished: publishedAt?.toISOString() ?? updatedAt.toISOString(),
    dateModified: updatedAt.toISOString(),
    author: {
      "@id": `${BASE}/#person`,
      name: authorName,
    },
    publisher: {
      "@id": `${BASE}/#person`,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: category,
    ...(featuredImage && {
      image: {
        "@type": "ImageObject",
        url: featuredImage,
        width: 1200,
        height: 630,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
