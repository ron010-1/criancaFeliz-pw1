import dotenv from "dotenv";
import { z } from "zod";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3333),
  DATABASE_URL: z.string().regex(/^postgres(ql)?:\/\//, "Invalid Postgres URL"),
  JWT_SECRET: z.string(),
  JWT_EXPIRES: z.string(),
});

console.log("DATABASE_URL recebida:", process.env.DATABASE_URL);
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Variáveis de ambiente inválidas:", _env.error.format());
  process.exit(1);
}

export const env = _env.data;
