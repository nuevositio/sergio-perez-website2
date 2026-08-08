import type { Metadata } from "next";
import { Lora, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@/components/analytics";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const BASE_URL = "https://www.sergioperez.uy";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Sergio Pérez — Gestor Cultural, Comunicador y Desarrollador Web",
    template: "%s | Sergio Pérez",
  },
  description:
    "Sergio Pérez: gestor cultural, columnista y desarrollador web en Uruguay. Proyectos culturales, comunicación estratégica y plataformas web con criterio profesional.",
  keywords: [
    "gestor cultural Uruguay",
    "gestión cultural",
    "columnista Uruguay",
    "desarrollo web Uruguay",
    "diseño web Uruguay",
    "páginas web Uruguay",
    "diseño de páginas web Uruguay",
    "comunicación estratégica",
    "proyectos culturales Uruguay",
    "consultor cultural",
    "Sergio Pérez Uruguay",
    "fondos concursables Uruguay",
    "FONAM",
    "web profesional Uruguay",
  ],
  authors: [{ name: "Sergio Pérez", url: BASE_URL }],
  creator: "Sergio Pérez",
  publisher: "Sergio Pérez",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_UY",
    url: BASE_URL,
    siteName: "Sergio Pérez",
    title: "Sergio Pérez — Gestor Cultural, Comunicador y Desarrollador Web",
    description:
      "Proyectos culturales, comunicación estratégica y plataformas web profesionales en Uruguay.",
    images: [
      {
        url: "/logoSP.png",
        width: 2172,
        height: 724,
        alt: "Sergio Pérez — Gestor Cultural, Comunicador y Desarrollador Web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sergio Pérez — Gestor Cultural, Comunicador y Desarrollador Web",
    description:
      "Proyectos culturales, comunicación estratégica y plataformas web profesionales en Uruguay.",
    images: ["/logoSP.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${lora.variable} ${sourceSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
