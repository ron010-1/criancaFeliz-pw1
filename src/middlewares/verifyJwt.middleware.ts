import { NextFunction, Request, Response } from "express";
import { env } from "../config/envConfig";
import jwt, { JwtPayload } from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["token"] as string;

    if (!token) {
        res.status(401).json({ message: "token not provided"});
    }

    try {
        const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
        req.userId = payload.sub as string;
        next();
    } catch (err) {
        res.status(401).json({message : "token invalid"});
    }
}
