"use client";

import { useMemo, useState } from "react";
import type { Category, Post } from "@prisma/client";
import { buildSlug } from "@/lib/slug";
import { Button } from "@/components/ui/button";
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
        <label className="mb-1 block text-sm font-medium text-zinc-700">Estado</label>
        <Select name="status" defaultValue={post?.status ?? "draft"}>
          <option value="draft">Borrador</option>
          <option value="published">Publicado</option>
        </Select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">SEO title</label>
        <Input name="seoTitle" defaultValue={post?.seoTitle ?? ""} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">SEO description</label>
        <Textarea name="seoDescription" defaultValue={post?.seoDescription ?? ""} rows={3} />
      </div>

      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
