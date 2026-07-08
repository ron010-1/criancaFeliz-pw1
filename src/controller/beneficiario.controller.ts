import { Request, Response } from "express";
import BeneficiarioService from "../service/beneficiario.service";
import { AppErrosCustom } from "../errors/appError";
import { assertOwnership } from "../utils/assertOwnership";

export default class BeneficiarioController {
  static async getBenefs(req: Request, res: Response): Promise<void> {
    const assistenteId = req.userRole === "admin" ? undefined : req.userId;
    const benefs = await BeneficiarioService.getAllBeneficiarios(assistenteId);
    res.status(200).json(benefs);
  }

  static async getBenefById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const benef = await BeneficiarioService.getById(id);
    if (!benef) throw new AppErrosCustom("Beneficiário não encontrado.", 404);
    assertOwnership(req, benef.assistenteId, "Você só pode acessar beneficiários cadastrados por você.");
    res.status(200).json(benef);
  }

  static async createBenefs(req: Request, res: Response): Promise<void> {
    const assistenteId = req.userRole === "assistente" ? req.userId : null;
    const newBenef = await BeneficiarioService.insertBeneficiario({ ...req.body, assistenteId });
    res.status(201).json(newBenef);
  }

  static async editBenef(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const beneficiario = await BeneficiarioService.getById(id);
    if (!beneficiario) throw new AppErrosCustom("Beneficiário não encontrado.", 404);
    assertOwnership(req, beneficiario.assistenteId, "Você só pode editar beneficiários cadastrados por você.");

    const benefEdited = await BeneficiarioService.editBenefById(id, req.body);
    res.status(200).json(benefEdited);
  }

  static deleteBenef = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const beneficiario = await BeneficiarioService.getById(id);
    if (!beneficiario) throw new AppErrosCustom("Beneficiário não encontrado.", 404);
    assertOwnership(req, beneficiario.assistenteId, "Você só pode excluir beneficiários cadastrados por você.");

    await beneficiario.destroy();
    res.status(200).json("Beneficiário excluído!");
  };
}
