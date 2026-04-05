import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedPostBySlug } from "@/features/columns/queries";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

type Params = {
  params: Promise<{ slug: string }>;
};

const BASE = "https://www.sergioperez.uy";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return { title: "Columna no encontrada" };
  }

  const title = post.seoTitle || `${post.title} | Sergio Pérez`;
  const description = post.seoDescription || post.excerpt || post.title;
  const canonicalUrl = `${BASE}/columnas/${slug}`;
  const ogImage = post.featuredImage
    ? [{ url: post.featuredImage, width: 1200, height: 630, alt: post.title }]
    : [{ url: `${BASE}/og-default.jpg`, width: 1200, height: 630, alt: post.title }];

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    authors: post.author?.name ? [{ name: post.author.name }] : undefined,
    openGraph: {
      title: post.seoTitle || post.title,
      description,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: post.author?.name ? [post.author.name] : undefined,
      section: post.category.name,
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description,
      images: ogImage.map((i) => i.url),
    },
  };
}

export default async function ColumnaDetallePage({ params }: Params) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.seoDescription || post.excerpt || post.title}
        slug={post.slug}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        authorName={post.author?.name ?? "Sergio Pérez"}
        category={post.category.name}
        featuredImage={post.featuredImage}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: "https://www.sergioperez.uy" },
          { name: "Columnas", url: "https://www.sergioperez.uy/columnas" },
          { name: post.title, url: `https://www.sergioperez.uy/columnas/${post.slug}` },
        ]}
      />
      <article className="mx-auto max-w-3xl">
      <Link
        href="/columnas"
        className="mb-8 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-700"
      >
        ← Todas las columnas
      </Link>

      <header className="space-y-4 border-b border-zinc-200 pb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
          {post.category.name}
        </p>
        <h1 className="text-3xl font-semibold leading-tight text-zinc-900 md:text-4xl">
          {post.title}
        </h1>
        {post.subtitle ? (
          <p className="text-lg font-medium text-zinc-600">{post.subtitle}</p>
        ) : null}
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
          {post.author.name ? <span>{post.author.name}</span> : null}
          {post.publishedAt ? (
            <time>
              {new Intl.DateTimeFormat("es-UY", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date(post.publishedAt))}
            </time>
          ) : null}
        </div>
      </header>

      {post.featuredImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.featuredImage}
          alt={post.title}
          className="my-8 w-full rounded-xl border border-zinc-200 object-cover"
        />
      ) : null}

      <div className="prose prose-zinc prose-lg mt-8 max-w-none">
        {((post.content ?? "") as string).split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <footer className="mt-12 border-t border-zinc-200 pt-8">
        <Link
          href="/columnas"
          className="text-sm font-semibold text-zinc-600 hover:text-zinc-900"
        >
          ← Volver a columnas
        </Link>
      </footer>
    </article>
    </>
  );
}
