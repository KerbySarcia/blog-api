import mongoose, { Schema } from "mongoose";
import z from "zod";

export const Blog = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.string()),
  likes: z.number().optional(),
  comments: z.number().optional(),
});

export type Blog = z.infer<typeof Blog>;

export const BlogSchema = new Schema<Blog>(
  {
    title: { type: String },
    content: { type: String },
    tags: { type: [String] },
    comments: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

export const BlogModel = mongoose.model("Blog", BlogSchema);
