import { Request, Response, NextFunction } from "express";
import { AppErrosCustom } from "../errors/appError";
import { AppErrorsZod } from "../errors/appErrorZods";

export function exceptionsVerify(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppErrosCustom) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  if (error instanceof AppErrorsZod) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }
  res.status(500).json({
    status: "Error",
    message: "Internal server error or database error",
  });
}
