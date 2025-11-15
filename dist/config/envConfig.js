"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().int().positive().default(3333),
    DATABASE_URL: zod_1.z.string(),
    JWT_SECRET: zod_1.z.string(),
    JWT_EXPIRES: zod_1.z.string()
});
const envParseResult = envSchema.safeParse(process.env);
if (!envParseResult.success) {
    console.error("❌ Variáveis de ambiente inválidas:", envParseResult.error.flatten().fieldErrors);
    process.exit(1);
}
exports.env = envParseResult.data;
