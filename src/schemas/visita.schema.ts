import { z } from "zod";

export const visitaCreateSchema = z.object({
  date: z.string().min(1, "Data é obrigatória"),
  imagens: z.array(z.string()).optional(),
  evolucao: z.string().min(1, "Evolução é obrigatória"),
  acompanhamento_familiar: z.string().min(1, "Acompanhamento familiar é obrigatório"),
  estimulo_familiar: z.string().min(1, "Estímulo familiar é obrigatório"),
  beneficiarioId: z.string().min(1, "ID do beneficiário é obrigatório"),
});

export const visitaUpdateSchema = visitaCreateSchema.partial();
