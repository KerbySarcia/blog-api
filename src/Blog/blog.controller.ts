import { NextFunction, Request, Response } from "express";

import { CustomError } from "../common/CustomError";
import { GetBlogsByInterests } from "./blog.interface";
import { Blog } from "./blog.schema";
import * as blogService from "./blog.service";

export const postBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = req.body as unknown as Blog;
    const postedBlog = await blogService.createBlog(blog);
    res.status(201).json(postedBlog);
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      res.status(error.statusCode);
    }
    next(error);
  }
};

export const getBlogsByInterests = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body as unknown as GetBlogsByInterests;
    const blogs = await blogService.getBlogsByInterests(body);
    res.json(blogs);
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      res.status(error.statusCode);
    }
    next(error);
  }
};

export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedBlog = await blogService.updateBlog(req.body.id, req.body);
    res.json(updatedBlog);
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      res.status(error.statusCode);
    }
    next(error);
  }
};

export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedBlog = await blogService.deleteBlog(req.params.id);
    res.json(deletedBlog);
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      res.status(error.statusCode);
    }
    next(error);
  }
};
