import { NextFunction, Request, Response } from "express";

import ErrorResponse from "../interface/error-response";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function errorHandler(err: Error, _req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    statusCode: res.statusCode,
    message: err.message,
    stack: err.stack,
  });
}
