"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const visita_service_1 = __importDefault(require("../service/visita.service"));
const appError_1 = require("../errors/appError");
const mapVisitaResponse_1 = require("../utils/mapVisitaResponse");
const assertOwnership_1 = require("../utils/assertOwnership");
class VisitaController {
}
_a = VisitaController;
VisitaController.createVisita = async (req, res) => {
    const assistenteId = req.userRole === "assistente" ? req.userId : null;
    const newVisita = await visita_service_1.default.createVisita({ ...req.body, assistenteId });
    res.status(201).json((0, mapVisitaResponse_1.mapVisitaResponse)(newVisita));
};
VisitaController.getAllvisitas = async (req, res) => {
    const assistenteId = req.userRole === "admin" ? undefined : req.userId;
    const { count, rows } = await visita_service_1.default.getAllVisitas(assistenteId);
    res.status(200).json({ count, rows: rows.map(mapVisitaResponse_1.mapVisitaResponse) });
};
VisitaController.getVisitasById = async (req, res) => {
    const { id } = req.params;
    const visita = await visita_service_1.default.getById(id);
    if (!visita)
        throw new appError_1.AppErrosCustom("Visita não encontrada", 404);
    (0, assertOwnership_1.assertOwnership)(req, visita.assistenteId, "Você só pode acessar visitas cadastradas por você.");
    res.status(200).json((0, mapVisitaResponse_1.mapVisitaResponse)(visita));
};
VisitaController.editVisita = async (req, res) => {
    const { id } = req.params;
    const visita = await visita_service_1.default.getById(id);
    if (!visita)
        throw new appError_1.AppErrosCustom("Visita não encontrada", 404);
    (0, assertOwnership_1.assertOwnership)(req, visita.assistenteId, "Você só pode editar visitas cadastradas por você.");
    const updatedVisita = await visita_service_1.default.editVisitaById(id, req.body);
    if (!updatedVisita)
        throw new appError_1.AppErrosCustom("Visita não encontrada", 404);
    res.status(200).json((0, mapVisitaResponse_1.mapVisitaResponse)(updatedVisita));
};
VisitaController.deleteById = async (req, res) => {
    const { id } = req.params;
    const visita = await visita_service_1.default.getById(id);
    if (!visita)
        throw new appError_1.AppErrosCustom("Visita não encontrada", 404);
    (0, assertOwnership_1.assertOwnership)(req, visita.assistenteId, "Você só pode excluir visitas cadastradas por você.");
    const deletedVisita = await visita_service_1.default.deleteVisitaById(id);
    res.status(200).json(deletedVisita);
};
exports.default = VisitaController;
