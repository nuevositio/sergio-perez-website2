import { notFound } from "next/navigation";
import { getCategories, getPostById } from "@/features/columns/queries";
import { PostForm } from "@/features/columns/components/post-form";
import { updatePostAction } from "@/features/columns/actions";

type Params = {
  params: Promise<{ id: string }>;
};

export default async function EditarColumnaPage({ params }: Params) {
  const { id } = await params;

  const [post, categories] = await Promise.all([getPostById(id), getCategories()]);

  if (!post) {
    notFound();
  }

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold text-zinc-900">Editar columna</h1>
      <PostForm
        categories={categories}
        post={post}
        submitLabel="Actualizar columna"
        action={updatePostAction.bind(null, post.id)}
      />
    </section>
  );
}
