import { redirect } from "next/navigation";
import { createPostAction } from "@/features/columns/actions";
import { PostForm } from "@/features/columns/components/post-form";
import { getCategories } from "@/features/columns/queries";

export default async function NuevaColumnaPage() {
  const categories = await getCategories();

  if (categories.length === 0) {
    redirect("/admin/dashboard");
  }

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold text-zinc-900">Nueva columna</h1>
      <PostForm categories={categories} submitLabel="Guardar columna" action={createPostAction} />
    </section>
  );
}
