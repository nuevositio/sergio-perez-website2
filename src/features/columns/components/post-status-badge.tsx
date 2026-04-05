type Props = {
  status: "draft" | "published";
};

export function PostStatusBadge({ status }: Props) {
  const isPublished = status === "published";

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        isPublished ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
      }`}
    >
      {isPublished ? "Publicado" : "Borrador"}
    </span>
  );
}
