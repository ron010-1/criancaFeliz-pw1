import { z } from "zod";

export const adminUpdateSchema = z.object({
  email: z.string().email("Email inválido").optional(),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres").optional(),
});