"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
const envConfig_1 = require("../config/envConfig");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
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
        const payload = jsonwebtoken_1.default.verify(token, envConfig_1.env.JWT_SECRET);
        req.userId = payload.sub;
        req.userRole = payload.role;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "token invalid" });
    }
}
