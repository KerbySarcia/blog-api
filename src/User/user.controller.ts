import { NextFunction, Request, Response } from "express";

import { CustomError } from "../common/CustomError";
import { User } from "./user.schema";
import * as userService from "./user.service";

export const createUser = async (req: Request, res: Response<User>, next: NextFunction) => {
  try {
    const user = await userService.createUser(req.body);
    return res.status(201).json(user);
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      res.status(error.statusCode);
    }
    next(error);
  }
};

export const getUser = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUser(res.locals.id);
    return res.json(user);
  } catch (error:unknown) {
    if (error instanceof CustomError) {
      res.status(error.statusCode);
    }
    next(error);
  }
};
