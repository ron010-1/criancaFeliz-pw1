import { NextFunction, Request, Response } from "express";
import { env } from "../config/envConfig";
import jwt, { JwtPayload } from "jsonwebtoken";

export default function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
  
    if (!authHeader) {
      res.status(401).json({ message: "Token não fornecido" });
      return;
    }
  
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      res.status(401).json({ message: "Formato inválido" });
      return;
    }
  
    const token = parts[1];
  
    try {
      const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
      // @ts-ignore
      req.userId = payload.sub;
      next();
    } catch (err) {
      console.error("Erro no verify:", err);
      res.status(401).json({ message: "Token inválido ou expirado" });
      return;
    }
  }
  
