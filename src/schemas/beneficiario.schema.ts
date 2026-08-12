import { z } from "zod";
import { mediaPathSchema } from "./media.schema";

export const beneficiarioCreateSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  nome_responsavel: z.string().min(1, "Nome do responsável é obrigatório"),
  data_nascimento: z.string().min(1, "Data de nascimento é obrigatória"),
  location: z.any().refine((value) => value !== undefined && value !== null && value !== "", {
    message: "Localização é obrigatória",
  }),
  phone1: z.string().min(1, "Telefone é obrigatório"),
  phone2: z.string().optional(),
  foto: mediaPathSchema.optional(),
});

export const beneficiarioUpdateSchema = beneficiarioCreateSchema.partial();
