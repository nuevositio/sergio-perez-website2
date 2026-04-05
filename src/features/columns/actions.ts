"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { buildSlug } from "@/lib/slug";
import { postFormSchema } from "@/features/columns/schemas";

// UUID del autor por defecto (ya existe en la DB)
const DEFAULT_AUTHOR_ID = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";

async function requireAdminSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!session?.value || !secret || session.value !== secret) {
    redirect("/admin/login");
  }
}

async function uploadFeaturedImage(file: File | null | undefined) {
  if (!file || file.size === 0) return null;

  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const filename = `columnas/${Date.now()}-${file.name.replace(/[^a-z0-9.]/gi, "-").toLowerCase()}.${extension}`;

  const blob = await put(filename, file, {
    access: "public",
    contentType: file.type || "image/jpeg",
  });

  return blob.url;
}

function normalizePostData(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();

  const parsed = postFormSchema.safeParse({
    title,
    subtitle: String(formData.get("subtitle") || "").trim() || undefined,
    slug: buildSlug(slugInput || title),
    excerpt: String(formData.get("excerpt") || "").trim(),
    content: String(formData.get("content") || "").trim(),
    status: String(formData.get("status") || "draft"),
    seoTitle: String(formData.get("seoTitle") || "").trim() || undefined,
    seoDescription: String(formData.get("seoDescription") || "").trim() || undefined,
    categoryId: String(formData.get("categoryId") || "").trim(),
  });

  if (!parsed.success) {
    throw new Error("Formulario invalido. Revisa los campos obligatorios.");
  }

  return parsed.data;
}

export async function createPostAction(formData: FormData) {
  await requireAdminSession();
  const data = normalizePostData(formData);

  const slugExists = await prisma.post.findUnique({ where: { slug: data.slug } });
  if (slugExists) {
    throw new Error("Ya existe una columna con ese slug.");
  }

  const featuredImageFile = formData.get("featuredImageFile");
  const featuredImage =
    featuredImageFile instanceof File
      ? await uploadFeaturedImage(featuredImageFile)
      : null;

  await prisma.post.create({
    data: {
      ...data,
      featuredImage,
      authorId: DEFAULT_AUTHOR_ID,
      publishedAt: data.status === "published" ? new Date() : null,
    },
  });

  revalidatePath("/admin/columnas");
  revalidatePath("/columnas");
  redirect("/admin/columnas");
}

export async function updatePostAction(postId: string, formData: FormData) {
  await requireAdminSession();
  const data = normalizePostData(formData);

  const current = await prisma.post.findUnique({ where: { id: postId } });
  if (!current) {
    throw new Error("No se encontro la columna.");
  }

  const slugExists = await prisma.post.findUnique({ where: { slug: data.slug } });
  if (slugExists && slugExists.id !== postId) {
    throw new Error("Ya existe otra columna con ese slug.");
  }

  const featuredImageFile = formData.get("featuredImageFile");
  const featuredImage =
    featuredImageFile instanceof File && featuredImageFile.size > 0
      ? await uploadFeaturedImage(featuredImageFile)
      : current.featuredImage;

  await prisma.post.update({
    where: { id: postId },
    data: {
      ...data,
      featuredImage,
      publishedAt:
        data.status === "published"
          ? current.publishedAt ?? new Date()
          : null,
    },
  });

  revalidatePath("/admin/columnas");
  revalidatePath("/columnas");
  revalidatePath(`/columnas/${current.slug}`);
  redirect("/admin/columnas");
}

export async function deletePostAction(formData: FormData) {
  await requireAdminSession();
  const postId = String(formData.get("postId") || "").trim();

  if (!postId) {
    throw new Error("ID de columna invalido.");
  }

  const current = await prisma.post.findUnique({ where: { id: postId } });

  await prisma.post.delete({ where: { id: postId } });

  revalidatePath("/admin/columnas");
  revalidatePath("/columnas");

  if (current?.slug) {
    revalidatePath(`/columnas/${current.slug}`);
  }
}
