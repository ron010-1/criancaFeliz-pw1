"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultAdmin = createDefaultAdmin;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Admin_model_1 = require("../models/Admin.model");
const node_crypto_1 = require("node:crypto");
const admin_service_1 = __importDefault(require("../service/admin.service"));
async function createDefaultAdmin() {
    const emailAdmin = 'admin@admin.com';
    const senhaAdmin = 'adminpass';
    const adminExistente = await Admin_model_1.Admin.findOne({ where: { email: emailAdmin } });
    if (!adminExistente) {
        const hashSenha = await bcrypt_1.default.hash(senhaAdmin, 10);
        const admin = {
            uuid: (0, node_crypto_1.randomUUID)(),
            email: 'admin@admin.com',
            password: hashSenha
        };
        await admin_service_1.default.createAdmin(admin);
        console.log('Admin padrão criado');
    }
    else {
        console.log('Admin padrão já existe');
    }
}
