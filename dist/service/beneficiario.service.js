"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Beneficiario_model_1 = require("../models/Beneficiario.model");
class BeneficiarioService {
    static async getAllBeneficiarios() {
        return await Beneficiario_model_1.Beneficiario.findAndCountAll();
    }
    ;
    static async insertBeneficiario(beneficiarioData) {
        return await Beneficiario_model_1.Beneficiario.create(beneficiarioData);
    }
    ;
    static async getById(id) {
        return await Beneficiario_model_1.Beneficiario.findByPk(id);
    }
    ;
    static async editBenefById(id, data) {
        const [updated] = await Beneficiario_model_1.Beneficiario.update(data, {
            where: { uuid: id }
        });
        if (updated) {
            const updatedBenef = await Beneficiario_model_1.Beneficiario.findOne({ where: { uuid: id } });
            return updatedBenef;
        }
        ;
    }
    ;
    static async deleteBenefById(id) {
        const beneficiario = await Beneficiario_model_1.Beneficiario.findOne({
            where: { uuid: id }
        });
        if (beneficiario) {
            await beneficiario.destroy();
            return true;
        }
    }
}
exports.default = BeneficiarioService;
