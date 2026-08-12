"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Visita_model_1 = require("../models/Visita.model");
const Imagem_model_1 = require("../models/Imagem.model");
class VisitaService {
    static async getAllVisitas(assistenteId) {
        return await Visita_model_1.Visita.findAndCountAll({
            where: assistenteId ? { assistenteId } : {},
            include: [Imagem_model_1.Imagem],
        });
    }
    static async createVisita(data) {
        const { imagens, ...visitaFields } = data;
        const visita = await Visita_model_1.Visita.create(visitaFields);
        if (Array.isArray(imagens) && imagens.length) {
            await Imagem_model_1.Imagem.bulkCreate(imagens.map((url) => ({ url, visitaId: visita.uuid })));
        }
        return await Visita_model_1.Visita.findOne({ where: { uuid: visita.uuid }, include: [Imagem_model_1.Imagem] });
    }
    static async getById(id) {
        return await Visita_model_1.Visita.findOne({ where: { uuid: id }, include: [Imagem_model_1.Imagem] });
    }
    static async editVisitaById(id, data) {
        const { imagens, ...visitaFields } = data;
        const visita = await Visita_model_1.Visita.findOne({ where: { uuid: id } });
        if (!visita)
            return null;
        if (Object.keys(visitaFields).length > 0) {
            await visita.update(visitaFields);
        }
        if (imagens !== undefined) {
            await Imagem_model_1.Imagem.destroy({ where: { visitaId: id } });
            if (Array.isArray(imagens) && imagens.length) {
                await Imagem_model_1.Imagem.bulkCreate(imagens.map((url) => ({ url, visitaId: id })));
            }
        }
        return await Visita_model_1.Visita.findOne({ where: { uuid: id }, include: [Imagem_model_1.Imagem] });
    }
    static async deleteVisitaById(id) {
        const visita = await Visita_model_1.Visita.findOne({
            where: { uuid: id },
        });
        if (visita) {
            await Imagem_model_1.Imagem.destroy({ where: { visitaId: id } });
            await visita.destroy();
            return true;
        }
    }
}
exports.default = VisitaService;
