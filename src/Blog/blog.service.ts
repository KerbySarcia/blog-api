import { GetBlogsByInterests } from "./blog.interface";
import { Blog, BlogModel } from "./blog.schema";

export const getBlogsByInterests = async (params: GetBlogsByInterests): Promise<Blog[]> => {
  const limit = 10;
  const skip = params.page * limit;
  const options = { $in: params.tags };
  const blogs = await BlogModel.find({ tags: options }).limit(limit).skip(skip);
  return blogs;
};

export const createBlog = async (blog: Blog): Promise<Blog> => {
  return BlogModel.create(blog);
};

export const deleteBlog = async (id: string): Promise<Blog | null> => {
  const blog = await BlogModel.findByIdAndDelete(id).lean();
  return blog;
};

export const updateBlog = async (id: string, blog: Blog): Promise<Blog | null> => {
  const updatedBlog = await BlogModel.findByIdAndUpdate(id, blog).lean();
  return updatedBlog;
};
