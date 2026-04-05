import Link from "next/link";
import { deletePostAction } from "@/features/columns/actions";
import { PostStatusBadge } from "@/features/columns/components/post-status-badge";
import { getAdminPosts } from "@/features/columns/queries";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminColumnasPage() {
  const posts = await getAdminPosts();

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-zinc-900">Columnas</h1>
        <Link
          href="/admin/columnas/nueva"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Nueva columna
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-zinc-600">
            <tr>
              <th className="px-4 py-3">Titulo</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-zinc-100">
                <td className="px-4 py-3 text-zinc-800">{post.title}</td>
                <td className="px-4 py-3 text-zinc-600">{post.category.name}</td>
                <td className="px-4 py-3">
                  <PostStatusBadge status={post.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/columnas/${post.id}/editar`}
                      className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-200"
                    >
                      Editar
                    </Link>
                    <form action={deletePostAction}>
                      <input type="hidden" name="postId" value={post.id} />
                      <Button type="submit" variant="danger" className="px-3 py-1.5 text-xs">
                        Eliminar
                      </Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-zinc-500" colSpan={4}>
                  No hay columnas cargadas.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
