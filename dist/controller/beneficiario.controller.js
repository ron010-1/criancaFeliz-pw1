"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const beneficiario_service_1 = __importDefault(require("../service/beneficiario.service"));
const appError_1 = require("../errors/appError");
const assertOwnership_1 = require("../utils/assertOwnership");
class BeneficiarioController {
    static async getBenefs(req, res) {
        const assistenteId = req.userRole === "admin" ? undefined : req.userId;
        const benefs = await beneficiario_service_1.default.getAllBeneficiarios(assistenteId);
        res.status(200).json(benefs);
    }
    static async getBenefById(req, res) {
        const { id } = req.params;
        const benef = await beneficiario_service_1.default.getById(id);
        if (!benef)
            throw new appError_1.AppErrosCustom("Beneficiário não encontrado.", 404);
        (0, assertOwnership_1.assertOwnership)(req, benef.assistenteId, "Você só pode acessar beneficiários cadastrados por você.");
        res.status(200).json(benef);
    }
    static async createBenefs(req, res) {
        const assistenteId = req.userRole === "assistente" ? req.userId : null;
        const newBenef = await beneficiario_service_1.default.insertBeneficiario({ ...req.body, assistenteId });
        res.status(201).json(newBenef);
    }
    static async editBenef(req, res) {
        const { id } = req.params;
        const beneficiario = await beneficiario_service_1.default.getById(id);
        if (!beneficiario)
            throw new appError_1.AppErrosCustom("Beneficiário não encontrado.", 404);
        (0, assertOwnership_1.assertOwnership)(req, beneficiario.assistenteId, "Você só pode editar beneficiários cadastrados por você.");
        const benefEdited = await beneficiario_service_1.default.editBenefById(id, req.body);
        res.status(200).json(benefEdited);
    }
}
_a = BeneficiarioController;
BeneficiarioController.deleteBenef = async (req, res) => {
    const { id } = req.params;
    const beneficiario = await beneficiario_service_1.default.getById(id);
    if (!beneficiario)
        throw new appError_1.AppErrosCustom("Beneficiário não encontrado.", 404);
    (0, assertOwnership_1.assertOwnership)(req, beneficiario.assistenteId, "Você só pode excluir beneficiários cadastrados por você.");
    await beneficiario.destroy();
    res.status(200).json("Beneficiário excluído!");
};
exports.default = BeneficiarioController;
