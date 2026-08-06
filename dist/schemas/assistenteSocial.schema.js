"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assistenteSocialUpdateSchema = exports.assistenteSocialCreateSchema = void 0;
const zod_1 = require("zod");
exports.assistenteSocialCreateSchema = zod_1.z.object({
    email: zod_1.z.string().email("Email inválido"),
    password: zod_1.z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    telefone: zod_1.z.string().min(1, "Telefone é obrigatório"),
    nome: zod_1.z.string().min(1, "Nome é obrigatório"),
});
exports.assistenteSocialUpdateSchema = exports.assistenteSocialCreateSchema.partial();
