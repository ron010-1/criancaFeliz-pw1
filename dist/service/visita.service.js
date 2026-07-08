"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Visita_model_1 = require("../models/Visita.model");
class VisitaService {
    static async getAllVisitas() {
        return await Visita_model_1.Visita.findAndCountAll();
    }
    static async createVisita(visitaData) {
        return await Visita_model_1.Visita.create(visitaData);
    }
    static async getById(id) {
        return await Visita_model_1.Visita.findByPk(id);
    }
    static async editVisitaById(id, data) {
        const [updated] = await Visita_model_1.Visita.update(data, {
            where: { uuid: id }
        });
        if (updated) {
            const updatedVisita = await Visita_model_1.Visita.findOne({ where: { uuid: id } });
            return updatedVisita;
        }
        ;
    }
    static async deleteVisitaById(id) {
        const visita = await Visita_model_1.Visita.findOne({
            where: { uuid: id }
        });
        if (visita) {
            await visita.destroy();
            return true;
        }
    }
}
exports.default = VisitaService;
