import { Request, Response, RequestHandler } from "express";
import VisitaService from "../service/visita.service";
import { AppErrosCustom } from "../errors/appError";
import { mapVisitaResponse } from "../utils/mapVisitaResponse";
import { assertOwnership } from "../utils/assertOwnership";

export default class VisitaController {
  static createVisita: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const assistenteId = req.userRole === "assistente" ? req.userId : null;
    const newVisita = await VisitaService.createVisita({ ...req.body, assistenteId });
    res.status(201).json(mapVisitaResponse(newVisita!));
  };

  static getAllvisitas: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const assistenteId = req.userRole === "admin" ? undefined : req.userId;
    const { count, rows } = await VisitaService.getAllVisitas(assistenteId);
    res.status(200).json({ count, rows: rows.map(mapVisitaResponse) });
  };

  static getVisitasById: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    const visita = await VisitaService.getById(id);
    if (!visita) throw new AppErrosCustom("Visita não encontrada", 404);
    assertOwnership(req, visita.assistenteId, "Você só pode acessar visitas cadastradas por você.");
    res.status(200).json(mapVisitaResponse(visita));
  };

  static editVisita: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const visita = await VisitaService.getById(id);
    if (!visita) throw new AppErrosCustom("Visita não encontrada", 404);
    assertOwnership(req, visita.assistenteId, "Você só pode editar visitas cadastradas por você.");

    const updatedVisita = await VisitaService.editVisitaById(id, req.body);
    if (!updatedVisita) throw new AppErrosCustom("Visita não encontrada", 404);
    res.status(200).json(mapVisitaResponse(updatedVisita));
  };

  static deleteById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const visita = await VisitaService.getById(id);
    if (!visita) throw new AppErrosCustom("Visita não encontrada", 404);
    assertOwnership(req, visita.assistenteId, "Você só pode excluir visitas cadastradas por você.");

    const deletedVisita = await VisitaService.deleteVisitaById(id);
    res.status(200).json(deletedVisita);
  };
}
