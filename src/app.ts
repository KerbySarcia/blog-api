require("dotenv").config();

import cors from "cors";
import express from "express";

import AUTH from "./Auth/auth.router";
import BLOG from "./Blog/blog.router";
import { connectDB } from "./db";
import health from "./HealthCheck/HealthCheck.routes";
import errorHandler from "./middlewares/error-handler";
import USER from "./User/user.router";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Routers
app.use("/health", health);
app.use("/auth", AUTH);
app.use("/user", USER);
app.use("/blog", BLOG);

app.use(errorHandler);

export default app;
