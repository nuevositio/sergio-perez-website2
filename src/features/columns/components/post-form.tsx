"use client";

import { useMemo, useState } from "react";
import type { Category, Post } from "@prisma/client";
import { buildSlug } from "@/lib/slug";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type PostFormProps = {
  categories: Category[];
  submitLabel: string;
  action: (formData: FormData) => Promise<void>;
  post?: Pick<
    Post,
    | "title"
    | "subtitle"
    | "slug"
    | "excerpt"
    | "content"
    | "status"
    | "seoTitle"
    | "seoDescription"
    | "categoryId"
    | "featuredImage"
  >;
};

export function PostForm({ categories, submitLabel, action, post }: PostFormProps) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(post?.slug));
  const [slug, setSlug] = useState(post?.slug ?? "");

  const suggestedSlug = useMemo(() => buildSlug(title), [title]);

  return (
    <form action={action} className="space-y-5 rounded-xl border border-zinc-200 bg-white p-6">
      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">Titulo</label>
        <Input
          name="title"
          value={title}
          onChange={(event) => {
            const nextTitle = event.target.value;
            setTitle(nextTitle);
            if (!slugEdited) {
              setSlug(buildSlug(nextTitle));
            }
          }}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">Subtitulo</label>
        <Input name="subtitle" defaultValue={post?.subtitle ?? ""} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">Slug</label>
        <Input
          name="slug"
          value={slug}
          onChange={(event) => {
            setSlugEdited(true);
            setSlug(buildSlug(event.target.value));
          }}
          required
        />
        {!slugEdited && suggestedSlug ? (
          <p className="mt-1 text-xs text-zinc-500">Sugerido: {suggestedSlug}</p>
        ) : null}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">Categoria</label>
        <Select name="categoryId" defaultValue={post?.categoryId ?? ""} required>
          <option value="" disabled>
            Selecciona una categoria
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">Extracto</label>
        <Textarea name="excerpt" defaultValue={post?.excerpt ?? ""} rows={3} required />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">Contenido</label>
        <Textarea name="content" defaultValue={post?.content ?? ""} rows={14} required />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">Imagen destacada</label>
        <Input name="featuredImageFile" type="file" accept="image/*" />
        {post?.featuredImage ? (
          <p className="mt-1 text-xs text-zinc-500">Imagen actual cargada.</p>
        ) : null}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">SEO title</label>
        <Input name="seoTitle" defaultValue={post?.seoTitle ?? ""} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">SEO description</label>
        <Textarea name="seoDescription" defaultValue={post?.seoDescription ?? ""} rows={3} />
      </div>

      <div className="flex items-center gap-3 border-t border-zinc-100 pt-5">
        <button
          type="submit"
          name="status"
          value="published"
          className="rounded-lg bg-zinc-900 px-5 py-2 text-sm font-semibold text-white hover:bg-zinc-700"
        >
          Publicar
        </button>
        <button
          type="submit"
          name="status"
          value="draft"
          className="rounded-lg border border-zinc-300 px-5 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
        >
          Guardar borrador
        </button>
        {post?.status && (
          <span className="ml-auto text-xs text-zinc-400">
            Estado actual: <span className="font-medium">{post.status === "published" ? "Publicado" : "Borrador"}</span>
          </span>
        )}
      </div>
    </form>
  );
}
