import { Request, Response, RequestHandler } from "express";
import { hashPassword } from "../utils/hashPassword";
import AssistenteSocialService from "../service/assistenteSocial.service";
import { AppErrosCustom } from "../errors/appError";

export default class AssistenteSocialController {
  static createAssistenteSocial: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { email, password, telefone, nome } = req.body;

    const existingAssist = await AssistenteSocialService.getByEmail(email);
    if (existingAssist) throw new AppErrosCustom("Este email já está cadastrado", 400);

    const hashPass = await hashPassword(password);
    const assistData = {
      email,
      password: hashPass,
      telefone,
      nome,
      adminId: req.userId,
    };

    const newAssist = await AssistenteSocialService.createAssistenteSocial(assistData);
    res.status(201).json(newAssist);
  };

  static getAllAssistentes: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const assistentes = await AssistenteSocialService.getAllAssistentes();
    res.status(200).json(assistentes);
  };

  static getAssistById: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    const assistente = await AssistenteSocialService.getById(id);
    if (!assistente) throw new AppErrosCustom("Assistente social não encontrado", 404);
    res.status(200).json(assistente);
  };

  static editAssist: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const assistente = await AssistenteSocialService.editAssistById(id, req.body);
    if (!assistente) throw new AppErrosCustom("Assistente social não encontrado", 404);
    res.status(200).json(assistente);
  };

  static deleteAssist: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const deleted = await AssistenteSocialService.deleteAssistById(id);
    if (!deleted) throw new AppErrosCustom("Assistente social não encontrado", 404);
    res.status(200).json("Assistente social deletado com sucesso");
  };
}
