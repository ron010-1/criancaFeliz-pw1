import { NextFunction, Request, Response } from "express";
import { env } from "../config/envConfig";
import jwt, { JwtPayload } from "jsonwebtoken";

export default function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["token"] as string;

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
        req.userId = payload.sub as string;
        next();
    } catch (err) {
        return res.sendStatus(401);
    }
}
