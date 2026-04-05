import { defineConfig } from "prisma/config";
import { PrismaPg } from "@prisma/adapter-pg";

export default defineConfig({
  schema: "prisma/schema.prisma",
  // Adapter para PrismaClient (conexión pooled para queries)
  adapter: () =>
    new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
  // Adapter para Prisma Migrate (usa conexión directa si está disponible)
  migrate: {
    adapter: () =>
      new PrismaPg({
        connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL!,
      }),
  },
});
