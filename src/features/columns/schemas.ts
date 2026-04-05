import { z } from "zod";

export const postFormSchema = z.object({
  title: z.string().min(5),
  subtitle: z.string().optional(),
  slug: z.string().min(3),
  excerpt: z.string().min(20),
  content: z.string().min(50),
  status: z.enum(["draft", "published"]),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  categoryId: z.string().min(1),
});

export type PostFormInput = z.infer<typeof postFormSchema>;
