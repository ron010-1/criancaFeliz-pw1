import { NextFunction, Request, Response } from "express";
import { env } from "../config/envConfig";
import jwt, { JwtPayload } from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(401).json({ message: "token not provided" });
    return;
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    res.status(401).json({ message: "invalid token format" });
    return;
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.userId = payload.sub as string;
    next();
  } catch (err) {
    res.status(401).json({ message: "token invalid" });
  }
}
