"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config();
}
const envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().int().positive().default(3333),
    DATABASE_URL: zod_1.z.string().regex(/^postgres(ql)?:\/\//, "Invalid Postgres URL"),
    JWT_SECRET: zod_1.z.string(),
    JWT_EXPIRES: zod_1.z.string(),
    ADMIN_EMAIL: zod_1.z.string().email().default("admin@admin.com"),
    ADMIN_PASSWORD: zod_1.z.string().min(6).default("adminpass"),
});
const _env = envSchema.safeParse(process.env);
if (!_env.success) {
    console.error("❌ Variáveis de ambiente inválidas:", _env.error.format());
    process.exit(1);
}
exports.env = _env.data;
