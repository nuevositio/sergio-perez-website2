import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma as prismaSingleton } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  // Proteger con la misma lógica que el proxy
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!session?.value || !secret || session.value !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: Record<string, unknown> = {
    node: process.version,
    env: process.env.NODE_ENV,
    vars: {
      DATABASE_URL: process.env.DATABASE_URL ? `set (${process.env.DATABASE_URL.split("@")[1]?.split("/")[0]})` : "MISSING",
      ADMIN_SESSION_SECRET: process.env.ADMIN_SESSION_SECRET ? "set" : "MISSING",
      BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN ? "set" : "MISSING",
    },
  };

  // Test 1: prisma singleton (igual que usa el dashboard)
  try {
    const [posts, cats, authors] = await Promise.all([
      prismaSingleton.post.count(),
      prismaSingleton.category.count(),
      prismaSingleton.user.findMany({ select: { id: true, email: true } }),
    ]);
    results.dbSingleton = { ok: true, posts, cats, authors };
  } catch (e) {
    results.dbSingleton = { ok: false, error: String(e), stack: e instanceof Error ? e.stack : undefined };
  }

  // Test 2: dynamic import (nuevo cliente)
  try {
    const { PrismaClient } = await import("@prisma/client");
    const { PrismaPg } = await import("@prisma/adapter-pg");
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
    const prisma = new PrismaClient({ adapter });
    const [posts, cats] = await Promise.all([
      prisma.post.count(),
      prisma.category.count(),
    ]);
    await prisma.$disconnect();
    results.dbDynamic = { ok: true, posts, cats };
  } catch (e) {
    results.dbDynamic = { ok: false, error: String(e), stack: e instanceof Error ? e.stack : undefined };
  }

  return NextResponse.json(results);
}
