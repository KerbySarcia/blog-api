import { Router } from "express";
import z from "zod";

import { authenticationMiddleware } from "../middlewares/auth";
import validateRequest from "../middlewares/validate-request";
import * as blogController from "./blog.controller";
import { GetBlogsByInterests } from "./blog.interface";
import { Blog } from "./blog.schema";
import { UpdateBlog } from "./blog.validation";

const router = Router();

router.post("/", authenticationMiddleware, validateRequest({ body: Blog }), blogController.postBlog);
router.get(
  "/",
  authenticationMiddleware,
  validateRequest({ body: GetBlogsByInterests }),
  blogController.getBlogsByInterests,
);
router.delete(
  "/:id",
  authenticationMiddleware,
  validateRequest({ params: z.object({ id: z.string() }) }),
  blogController.deleteBlog,
);
router.put("/", authenticationMiddleware, validateRequest({ body: UpdateBlog }), blogController.updateBlog);

export default router;
