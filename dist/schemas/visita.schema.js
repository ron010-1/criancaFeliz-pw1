"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitaUpdateSchema = exports.visitaCreateSchema = void 0;
const zod_1 = require("zod");
exports.visitaCreateSchema = zod_1.z.object({
    date: zod_1.z.string().min(1, "Data é obrigatória"),
    imagens: zod_1.z.array(zod_1.z.string().url("Cada imagem deve ser uma URL válida")).optional(),
    evolucao: zod_1.z.string().min(1, "Evolução é obrigatória"),
    acompanhamento_familiar: zod_1.z.string().min(1, "Acompanhamento familiar é obrigatório"),
    estimulo_familiar: zod_1.z.string().min(1, "Estímulo familiar é obrigatório"),
    beneficiarioId: zod_1.z.string().min(1, "ID do beneficiário é obrigatório"),
});
exports.visitaUpdateSchema = exports.visitaCreateSchema.partial();
