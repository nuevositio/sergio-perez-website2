import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

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
    results.db = { ok: true, posts, cats };
  } catch (e) {
    results.db = { ok: false, error: String(e) };
  }

  return NextResponse.json(results);
}
