import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3333),
  USERNAME_POSTGIS: z.string(),
  PASSWORD_POSTGIS: z.string(),
  DATABASE_POSTGIS: z.string(),
});

export type Env = z.infer<typeof envSchema>;

const envParseResult = envSchema.safeParse(process.env);

if (!envParseResult.success) {
  console.error(
    "❌ Variáveis de ambiente inválidas:",
    envParseResult.error.flatten().fieldErrors
  );
  process.exit(1);
}

export const env = envParseResult.data;
