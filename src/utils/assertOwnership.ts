import { Request } from "express";
import { AppErrosCustom } from "../errors/appError";

export function assertOwnership(
  req: Request,
  ownerId: string | null | undefined,
  message = "Você só pode acessar recursos cadastrados por você."
): void {
  if (req.userRole === "admin") return;
  if (ownerId !== req.userId) {
    throw new AppErrosCustom(message, 403);
  }
}
