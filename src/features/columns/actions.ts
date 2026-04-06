"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { buildSlug } from "@/lib/slug";
import { postFormSchema } from "@/features/columns/schemas";

async function getDefaultAuthorId(): Promise<string> {
  const author = await prisma.user.findFirst({ select: { id: true } });
  if (!author) {
    throw new Error(
      "No hay ningún usuario en la base de datos. " +
        "Crea al menos un usuario antes de publicar columnas."
    );
  }
  return author.id;
}

async function requireAdminSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!session?.value || !secret || session.value !== secret) {
    redirect("/admin/login");
  }
}

async function uploadFeaturedImage(file: File | null | undefined): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.warn(
      "[upload] BLOB_READ_WRITE_TOKEN no está configurado — la imagen no se subirá. " +
        "Configura esta variable en las variables de entorno de Vercel."
    );
    return null;
  }

  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const filename = `columnas/${Date.now()}-${file.name.replace(/[^a-z0-9.]/gi, "-").toLowerCase()}.${extension}`;

  try {
    const blob = await put(filename, file, {
      access: "public",
      contentType: file.type || "image/jpeg",
      token,
    });
    return blob.url;
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error("[upload] Error al subir imagen a Vercel Blob:", detail);
    throw new Error(
      `No se pudo subir la imagen destacada. ` +
        `Verifica que BLOB_READ_WRITE_TOKEN sea válido en las variables de entorno de Vercel. ` +
        `Detalle técnico: ${detail}`
    );
  }
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

  const authorId = await getDefaultAuthorId();

  try {
    await prisma.post.create({
      data: {
        ...data,
        featuredImage,
        authorId,
        publishedAt: data.status === "published" ? new Date() : null,
      },
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error("[createPost] Error Prisma:", detail);
    throw new Error(`No se pudo guardar la columna. Detalle técnico: ${detail}`);
  }

  revalidatePath("/admin/columnas");
  revalidatePath("/columnas");
  redirect("/admin/columnas?success=created");
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

  try {
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
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error("[updatePost] Error Prisma:", detail);
    throw new Error(`No se pudo actualizar la columna. Detalle técnico: ${detail}`);
  }

  revalidatePath("/admin/columnas");
  revalidatePath("/columnas");
  revalidatePath(`/columnas/${current.slug}`);
  redirect("/admin/columnas?success=updated");
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
