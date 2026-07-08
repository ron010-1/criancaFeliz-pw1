import { Request, Response, NextFunction } from "express";
import { AppErrosCustom } from "../errors/appError";

export function verifyRole(...roles: Array<"admin" | "assistente">) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.userRole || !roles.includes(req.userRole)) {
      throw new AppErrosCustom("Acesso negado para este papel de usuário", 403);
    }
    next();
  };
}
