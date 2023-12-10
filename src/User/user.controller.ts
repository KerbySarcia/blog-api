import { NextFunction, Request, Response } from "express";

import { CustomError } from "../common/CustomError";
import { User } from "./user.schema";
import * as userService from "./user.service";

export const createUser = async (req: Request, res: Response<User>, next: NextFunction) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      res.status(error.statusCode);
    }
    next(error);
  }
};
