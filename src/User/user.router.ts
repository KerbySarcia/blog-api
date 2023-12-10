import { Router } from "express";

import validateRequest from "../middlewares/validate-request";
import * as userController from "./user.controller";
import { User } from "./user.schema";

const router = Router();

router.post("/", validateRequest({ body: User }), userController.createUser);

export default router;
