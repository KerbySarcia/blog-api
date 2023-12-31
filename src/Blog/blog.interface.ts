import z from "zod";

export const GetBlogsByInterests = z.object({
  page: z.number(),
  tags: z.array(z.string()),
});

export type GetBlogsByInterests = z.infer<typeof GetBlogsByInterests>;
