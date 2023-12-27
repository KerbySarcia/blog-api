import { Router } from "express";

import validateRequest from "../middlewares/validate-request";
import { login } from "./auth.controller";
import { Login } from "./auth.schema";
const router = Router();

router.post("/", validateRequest({ body: Login }), login);

export default router;
