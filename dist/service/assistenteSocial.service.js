"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AssistenteSocial_model_1 = require("./../models/AssistenteSocial.model");
const crypto_1 = require("crypto");
class AssistenteSocialService {
    static async createAssistenteSocial(assistenteSocialData) {
        const assist = {
            ...assistenteSocialData,
            uuid: (0, crypto_1.randomUUID)(),
        };
        return await AssistenteSocial_model_1.AssistenteSocial.create(assist);
    }
    static async getAllAssistentes(ownUuid) {
        return await AssistenteSocial_model_1.AssistenteSocial.findAll({
            where: ownUuid ? { uuid: ownUuid } : {},
            attributes: { exclude: ["password"] },
            order: [["nome", "ASC"]],
        });
    }
    static async getById(id) {
        return await AssistenteSocial_model_1.AssistenteSocial.findByPk(id, {
            attributes: { exclude: ["password"] },
        });
    }
    ;
    static async getByEmail(email) {
        return await AssistenteSocial_model_1.AssistenteSocial.findOne({ where: { email } });
    }
    static async editAssistById(id, data) {
        const [updated] = await AssistenteSocial_model_1.AssistenteSocial.update(data, {
            where: { uuid: id }
        });
        if (updated) {
            return await this.getById(id);
        }
        ;
        return null;
    }
    ;
    static async deleteAssistById(id) {
        const assistente = await AssistenteSocial_model_1.AssistenteSocial.findOne({ where: { uuid: id } });
        if (assistente) {
            await assistente.destroy();
            return true;
        }
        return false;
    }
}
exports.default = AssistenteSocialService;
