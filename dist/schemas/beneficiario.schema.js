"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beneficiarioUpdateSchema = exports.beneficiarioCreateSchema = void 0;
const zod_1 = require("zod");
exports.beneficiarioCreateSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1, "Nome é obrigatório"),
    nome_responsavel: zod_1.z.string().min(1, "Nome do responsável é obrigatório"),
    data_nascimento: zod_1.z.string().min(1, "Data de nascimento é obrigatória"),
    location: zod_1.z.any().refine((value) => value !== undefined && value !== null && value !== "", {
        message: "Localização é obrigatória",
    }),
    phone1: zod_1.z.string().min(1, "Telefone é obrigatório"),
    phone2: zod_1.z.string().optional(),
    foto: zod_1.z.string().url("Foto deve ser uma URL válida").optional(),
});
exports.beneficiarioUpdateSchema = exports.beneficiarioCreateSchema.partial();
