import z from "zod";

export const UpdateBlog = z.object({
  id: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
  tags: z.array(z.string()).optional(),
  likes: z.number().optional(),
  comments: z.number().optional(),
});

export type UpdateBlog = z.infer<typeof UpdateBlog>;
