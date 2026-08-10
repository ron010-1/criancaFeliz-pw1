import { z } from "zod";

export const mediaPathSchema = z
  .string()
  .min(1)
  .refine(
    (value) => value.startsWith("/uploads/") || /^https?:\/\//.test(value),
    "Deve ser um caminho de /uploads ou uma URL http(s) válida"
  );
