import { z } from "zod";

// Aceita tanto o caminho relativo devolvido por POST /uploads ("/uploads/uuid.jpg")
// quanto uma URL absoluta — os registros criados antes do upload próprio guardam
// URLs completas de serviços externos e precisam continuar válidos.
export const mediaPathSchema = z
  .string()
  .min(1)
  .refine(
    (value) => value.startsWith("/uploads/") || /^https?:\/\//.test(value),
    "Deve ser um caminho de /uploads ou uma URL http(s) válida"
  );
