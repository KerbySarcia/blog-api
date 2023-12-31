import { NextFunction, Request, Response } from "express";

import { CustomError } from "../common/CustomError";
import { checkUser } from "../User/user.service";
import { signIn } from "../utils/auth";
import comparePassword from "../utils/password-compare";
import { Login } from "./auth.schema";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as unknown as Login;

    const user = await checkUser(email);

    if (!user) throw new CustomError("Invalid Credentials", 401);

    const isMatch = comparePassword(password, user.password as string);

    if (!isMatch) throw new CustomError("Invalid Credentials", 401);

    const authToken = signIn({
      id: user._id,
      mobile_number: user.mobile_number,
      email: user.email,
      interests: user.interests,
    });

    return res.json({ auth_token: authToken });
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      res.status(error.statusCode);
    }
    next(error);
  }
};
