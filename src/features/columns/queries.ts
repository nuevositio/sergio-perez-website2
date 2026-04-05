import { prisma } from "@/lib/prisma";

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getAdminPosts() {
  return prisma.post.findMany({
    include: {
      category: true,
      author: true,
    },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getPublishedPosts() {
  return prisma.post.findMany({
    where: { status: "published" },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getPublishedPostBySlug(slug: string) {
  return prisma.post.findFirst({
    where: { slug, status: "published" },
    include: {
      category: true,
      author: true,
    },
  });
}

export async function getPostById(id: string) {
  return prisma.post.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
}
