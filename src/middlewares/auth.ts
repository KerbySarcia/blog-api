import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { get } from "lodash";

import { CustomError } from "../common/CustomError";
import { UserModel } from "../User/user.schema";

const PASS_PHRASE = get(process, "env.TOKEN_SECRET", "pogi");

export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization || "";

  try {
    if (!authToken) throw new CustomError("token does not exist", 401);

    const token = authToken.replace("Bearer ", "");

    const verifiedToken = jwt.verify(token, PASS_PHRASE);

    const userId = get(verifiedToken, "id", "");

    if (!userId) throw new CustomError("userId does not exist", 401);

    const user = await UserModel.findById(userId).lean().exec();
  
    if (!user) throw new CustomError("user does not exist", 401);

    res.locals = user;
    res.locals.id = user._id;
    next();

  } catch (error: unknown) {
    if (error instanceof CustomError) {
      res.status(error.statusCode);
    }
    next(error);
  }
};
