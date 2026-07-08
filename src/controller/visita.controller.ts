import { Request, Response, RequestHandler } from "express";
import VisitaService from "../service/visita.service";
import { AppErrosCustom } from "../errors/appError";

export default class VisitaController {
  static createVisita: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const newVisita = await VisitaService.createVisita(req.body);
    res.status(201).json(newVisita);
  };

  static getAllvisitas: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const visitas = await VisitaService.getAllVisitas();
    res.status(200).json(visitas);
  };

  static getVisitasById: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    const visita = await VisitaService.getById(id);
    if (!visita) throw new AppErrosCustom("Visita não encontrada", 404);
    res.status(200).json(visita);
  };

  static editVisita: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedVisita = await VisitaService.editVisitaById(id, req.body);
    if (!updatedVisita) throw new AppErrosCustom("Visita não encontrada", 404);
    res.status(200).json(updatedVisita);
  };

  static deleteById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const deletedVisita = await VisitaService.deleteVisitaById(id);
    if (!deletedVisita) throw new AppErrosCustom("Visita não encontrada", 404);
    res.status(200).json(deletedVisita);
  };
}
