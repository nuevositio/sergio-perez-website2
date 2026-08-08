import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/ig",
        destination:
          "/desarrollo?utm_source=instagram&utm_medium=social&utm_campaign=perfil&utm_content=bio",
        permanent: false,
      },
      {
        source: "/instagram",
        destination:
          "/desarrollo?utm_source=instagram&utm_medium=social&utm_campaign=perfil&utm_content=bio",
        permanent: false,
      },
      {
        source: "/fb",
        destination:
          "/desarrollo?utm_source=facebook&utm_medium=social&utm_campaign=perfil&utm_content=page",
        permanent: false,
      },
      {
        source: "/linkedin",
        destination:
          "/desarrollo?utm_source=linkedin&utm_medium=social&utm_campaign=perfil&utm_content=profile",
        permanent: false,
      },
      {
        source: "/wa",
        destination:
          "/cotizacion?utm_source=whatsapp&utm_medium=referral&utm_campaign=consulta_directa",
        permanent: false,
      },
      {
        source: "/ads-web",
        destination:
          "/diseno-web-uruguay?utm_source=meta&utm_medium=paid_social&utm_campaign=diseno_web&utm_content=anuncio",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Impide que la pàgina se cargue en iframes (clickjacking)
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Evita que el navegador infiera el tipo MIME incorrecto
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Fuerza HTTPS por 1 año + subdomains (importante para SEO y ranking)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // Controla qué referrer se envía (útil para Analytics correctos)
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Desactiva acceso a features sensibles del navegador
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días de caché para imágenes
  },
};

export default nextConfig;
