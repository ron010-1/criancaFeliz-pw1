import { z } from "zod";

export const assistenteSocialCreateSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  telefone: z.string().min(1, "Telefone é obrigatório"),
  nome: z.string().min(1, "Nome é obrigatório"),
});

export const assistenteSocialUpdateSchema = assistenteSocialCreateSchema.partial();
