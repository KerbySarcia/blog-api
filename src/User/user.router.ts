import { Router } from "express";

import { authenticationMiddleware } from "../middlewares/auth";
import validateRequest from "../middlewares/validate-request";
import * as userController from "./user.controller";
import { User } from "./user.schema";

const router = Router();

router.post("/", validateRequest({ body: User }), userController.createUser);
router.get("/me", authenticationMiddleware, userController.getUser);

export default router;
