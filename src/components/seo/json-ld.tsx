/**
 * JSON-LD Structured Data components
 * Mejorar visibilidad orgánica mediante datos estructurados schema.org
 */

const BASE = "https://www.sergioperez.uy";
const CONTACT_EMAIL = "yosoy@sergioperez.uy";
const CONTACT_PHONE = "+59895342022";
const SAME_AS = [
  "https://www.instagram.com/sergioperez.uy",
  "https://www.facebook.com/sergioperez.uy",
  "https://www.linkedin.com/in/spgestioncultural/",
  "https://themesh.art/perfil/spgestioncultural/",
  "https://www.youtube.com/@nuevositiouruguay868",
];

function JsonLdScript({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}

// ─── Persona / Autor ───────────────────────────────────────────────────────────
export function PersonJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE}/#person`,
    name: "Sergio Pérez",
    url: BASE,
    email: CONTACT_EMAIL,
    jobTitle: "Gestor Cultural, Comunicador y Desarrollador Web",
    description:
      "Gestor cultural, columnista y desarrollador web uruguayo. Diseño proyectos culturales, estrategia editorial y plataformas web profesionales.",
    nationality: {
      "@type": "Country",
      name: "Uruguay",
    },
    sameAs: SAME_AS,
    knowsAbout: [
      "Gestión Cultural",
      "Comunicación Estratégica",
      "Desarrollo Web",
      "Periodismo Cultural",
      "Fondos Concursables Uruguay",
    ],
  };

  return <JsonLdScript schema={schema} />;
}

// ─── Perfil profesional / About ──────────────────────────────────────────────
export function ProfilePageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${BASE}/sobre-mi#profile`,
    url: `${BASE}/sobre-mi`,
    name: "Sobre Sergio Pérez",
    description:
      "Perfil profesional de Sergio Pérez: gestor cultural, comunicador institucional y desarrollador web uruguayo radicado en Cardona, Soriano.",
    mainEntity: {
      "@id": `${BASE}/#person`,
    },
    about: {
      "@id": `${BASE}/#person`,
    },
  };

  return <JsonLdScript schema={schema} />;
}

// ─── Organización / proveedor formal ─────────────────────────────────────────
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE}/#organization`,
    name: "SERGIO PÉREZ",
    url: BASE,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    founder: { "@id": `${BASE}/#person` },
    description:
      "Empresa formalmente constituida, habilitada para operar comercialmente y con RUPE activo para contratar con organismos públicos.",
    areaServed: [
      { "@type": "Country", name: "Uruguay" },
      { "@type": "AdministrativeArea", name: "América Latina" },
    ],
    sameAs: SAME_AS,
  };

  return <JsonLdScript schema={schema} />;
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

  return <JsonLdScript schema={schema} />;
}

// ─── Servicio Profesional ─────────────────────────────────────────────────────
export function ProfessionalServiceJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE}/#service`,
    name: "Sergio Pérez — Servicios Profesionales",
    url: `${BASE}/servicios`,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    provider: { "@id": `${BASE}/#person` },
    parentOrganization: { "@id": `${BASE}/#organization` },
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

  return <JsonLdScript schema={schema} />;
}

// ─── Servicio de diseño y desarrollo web ─────────────────────────────────────
export function WebDesignServiceJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE}/desarrollo#web-design-service`,
    name: "Diseño web y desarrollo web en Uruguay - Sergio Pérez",
    url: `${BASE}/desarrollo`,
    image: `${BASE}/logoSP.png`,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    priceRange: "$$",
    founder: { "@id": `${BASE}/#person` },
    provider: { "@id": `${BASE}/#person` },
    areaServed: [
      { "@type": "Country", name: "Uruguay" },
      { "@type": "City", name: "Montevideo" },
      { "@type": "City", name: "Cardona" },
      { "@type": "AdministrativeArea", name: "Soriano" },
      { "@type": "AdministrativeArea", name: "Colonia" },
    ],
    knowsAbout: [
      "diseño web Uruguay",
      "desarrollo web Uruguay",
      "páginas web para empresas",
      "sitios web institucionales",
      "Next.js",
      "SEO técnico",
      "hosting y dominios",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        url: `${BASE}/desarrollo`,
        itemOffered: {
          "@type": "Service",
          name: "Diseño de páginas web en Uruguay",
          serviceType: "Diseño web",
          description:
            "Diseño de sitios web profesionales, responsivos y orientados a consultas para empresas, profesionales, instituciones y proyectos culturales.",
          areaServed: { "@type": "Country", name: "Uruguay" },
        },
      },
      {
        "@type": "Offer",
        url: `${BASE}/desarrollo`,
        itemOffered: {
          "@type": "Service",
          name: "Desarrollo web profesional",
          serviceType: "Desarrollo web",
          description:
            "Desarrollo de sitios rápidos con Next.js, SEO técnico, formularios, paneles de gestión, hosting, dominios y mantenimiento.",
          areaServed: { "@type": "Country", name: "Uruguay" },
        },
      },
      {
        "@type": "Offer",
        url: `${BASE}/cotizacion`,
        itemOffered: {
          "@type": "Service",
          name: "Cotización de página web",
          serviceType: "Cotización web",
          description:
            "Diagnóstico y presupuesto para sitios institucionales, landing pages, catálogos, medios digitales y plataformas a medida.",
          areaServed: { "@type": "Country", name: "Uruguay" },
        },
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios web en Uruguay",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Sitio institucional" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Landing page" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "E-commerce y catálogo" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Mantenimiento web" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "SEO técnico" },
        },
      ],
    },
  };

  return <JsonLdScript schema={schema} />;
}

// ─── Página de servicios ─────────────────────────────────────────────────────
export function ServicesPageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE}/servicios#webpage`,
    url: `${BASE}/servicios`,
    name: "Servicios de gestión cultural, comunicación y desarrollo web",
    description:
      "Servicios profesionales de Sergio Pérez en gestión cultural, estrategia editorial, comunicación institucional y desarrollo web en Uruguay.",
    about: { "@id": `${BASE}/#service` },
    mainEntity: { "@id": `${BASE}/#service` },
  };

  return <JsonLdScript schema={schema} />;
}

interface ProjectItem {
  name: string;
  url: string;
  description: string;
  category: string;
}

export function ProjectsItemListJsonLd({ projects }: { projects: ProjectItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${BASE}/proyectos#projects`,
    name: "Portfolio de sitios desarrollados por Sergio Pérez",
    url: `${BASE}/proyectos`,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.name,
        url: project.url,
        description: project.description,
        genre: project.category,
        creator: { "@id": `${BASE}/#person` },
      },
    })),
  };

  return <JsonLdScript schema={schema} />;
}

interface PostListItem {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: Date | null;
}

export function ColumnsCollectionJsonLd({ posts }: { posts: PostListItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE}/columnas#collection`,
    url: `${BASE}/columnas`,
    name: "Columnas de Sergio Pérez",
    description:
      "Artículos de opinión e investigación sobre cultura, identidad, política cultural, patrimonio y comunicación estratégica en Uruguay.",
    isPartOf: { "@id": `${BASE}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.slice(0, 30).map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          url: `${BASE}/columnas/${post.slug}`,
          author: { "@id": `${BASE}/#person` },
          ...(post.publishedAt && { datePublished: post.publishedAt.toISOString() }),
        },
      })),
    },
  };

  return <JsonLdScript schema={schema} />;
}

export function ContactPageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${BASE}/contacto#contact`,
    url: `${BASE}/contacto`,
    name: "Contacto — Sergio Pérez",
    description:
      "Página de contacto para proyectos culturales, desarrollo web y comunicación estratégica con Sergio Pérez.",
    mainEntity: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      availableLanguage: ["Spanish", "English", "Portuguese"],
      areaServed: { "@type": "Country", name: "Uruguay" },
    },
  };

  return <JsonLdScript schema={schema} />;
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

  return <JsonLdScript schema={schema} />;
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

  return <JsonLdScript schema={schema} />;
}
