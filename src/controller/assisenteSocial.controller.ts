import { Request, Response, RequestHandler } from "express";
import { hashPassword } from "../utils/hashPassword";
import AssistenteSocialService from "../service/assistenteSocial.service";
import { AppErrosCustom } from "../errors/appError";
import { assertOwnership } from "../utils/assertOwnership";

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
    const { password: _password, ...safeAssist } = newAssist.toJSON();
    res.status(201).json(safeAssist);
  };

  static getAllAssistentes: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const ownUuid = req.userRole === "admin" ? undefined : req.userId;
    const assistentes = await AssistenteSocialService.getAllAssistentes(ownUuid);
    res.status(200).json(assistentes);
  };

  static getAssistById: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    const assistente = await AssistenteSocialService.getById(id);
    if (!assistente) throw new AppErrosCustom("Assistente social não encontrado", 404);
    assertOwnership(req, assistente.uuid, "Você só pode acessar o próprio perfil.");
    res.status(200).json(assistente);
  };

  static editAssist: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.email) {
      const sameEmail = await AssistenteSocialService.getByEmail(updateData.email);
      if (sameEmail && sameEmail.uuid !== id) {
        throw new AppErrosCustom("Este email já está cadastrado", 400);
      }
    }

    if (updateData.password) {
      updateData.password = await hashPassword(updateData.password);
    }

    const assistente = await AssistenteSocialService.editAssistById(id, updateData);
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
