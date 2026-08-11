import { z } from "zod";
import { mediaPathSchema } from "./media.schema";

const geoPointSchema = z.object({
  type: z.literal("Point"),
  coordinates: z.tuple([z.number(), z.number()]),
});

export const visitaCreateSchema = z.object({
  date: z.string().min(1, "Data é obrigatória"),
  imagens: z.array(mediaPathSchema).optional(),
  evolucao: z.string().min(1, "Evolução é obrigatória"),
  acompanhamento_familiar: z.string().min(1, "Acompanhamento familiar é obrigatório"),
  estimulo_familiar: z.string().min(1, "Estímulo familiar é obrigatório"),
  beneficiarioId: z.string().min(1, "ID do beneficiário é obrigatório"),
  location: geoPointSchema.optional().nullable(),
});

export const visitaUpdateSchema = visitaCreateSchema.partial();