"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const hashPassword_1 = require("../utils/hashPassword");
const assistenteSocial_service_1 = __importDefault(require("../service/assistenteSocial.service"));
const appError_1 = require("../errors/appError");
const assertOwnership_1 = require("../utils/assertOwnership");
class AssistenteSocialController {
}
_a = AssistenteSocialController;
AssistenteSocialController.createAssistenteSocial = async (req, res) => {
    const { email, password, telefone, nome } = req.body;
    const existingAssist = await assistenteSocial_service_1.default.getByEmail(email);
    if (existingAssist)
        throw new appError_1.AppErrosCustom("Este email já está cadastrado", 400);
    const hashPass = await (0, hashPassword_1.hashPassword)(password);
    const assistData = {
        email,
        password: hashPass,
        telefone,
        nome,
        adminId: req.userId,
    };
    const newAssist = await assistenteSocial_service_1.default.createAssistenteSocial(assistData);
    const { password: _password, ...safeAssist } = newAssist.toJSON();
    res.status(201).json(safeAssist);
};
AssistenteSocialController.getAllAssistentes = async (req, res) => {
    const ownUuid = req.userRole === "admin" ? undefined : req.userId;
    const assistentes = await assistenteSocial_service_1.default.getAllAssistentes(ownUuid);
    res.status(200).json(assistentes);
};
AssistenteSocialController.getAssistById = async (req, res) => {
    const { id } = req.params;
    const assistente = await assistenteSocial_service_1.default.getById(id);
    if (!assistente)
        throw new appError_1.AppErrosCustom("Assistente social não encontrado", 404);
    (0, assertOwnership_1.assertOwnership)(req, assistente.uuid, "Você só pode acessar o próprio perfil.");
    res.status(200).json(assistente);
};
AssistenteSocialController.editAssist = async (req, res) => {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (updateData.email) {
        const sameEmail = await assistenteSocial_service_1.default.getByEmail(updateData.email);
        if (sameEmail && sameEmail.uuid !== id) {
            throw new appError_1.AppErrosCustom("Este email já está cadastrado", 400);
        }
    }
    if (updateData.password) {
        updateData.password = await (0, hashPassword_1.hashPassword)(updateData.password);
    }
    const assistente = await assistenteSocial_service_1.default.editAssistById(id, updateData);
    if (!assistente)
        throw new appError_1.AppErrosCustom("Assistente social não encontrado", 404);
    res.status(200).json(assistente);
};
AssistenteSocialController.deleteAssist = async (req, res) => {
    const { id } = req.params;
    const deleted = await assistenteSocial_service_1.default.deleteAssistById(id);
    if (!deleted)
        throw new appError_1.AppErrosCustom("Assistente social não encontrado", 404);
    res.status(200).json("Assistente social deletado com sucesso");
};
exports.default = AssistenteSocialController;
