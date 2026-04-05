import slugify from "slugify";

export function buildSlug(input: string) {
  return slugify(input, {
    lower: true,
    strict: true,
    trim: true,
    locale: "es",
  });
}
