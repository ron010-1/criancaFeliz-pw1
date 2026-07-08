import { Request, Response } from "express";
import BeneficiarioService from "../service/beneficiario.service";
import { AppErrosCustom } from "../errors/appError";

export default class BeneficiarioController {
  static async getBenefs(req: Request, res: Response): Promise<void> {
    const benefs = await BeneficiarioService.getAllBeneficiarios();
    res.status(200).json(benefs);
  }

  static async getBenefById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const benef = await BeneficiarioService.getById(id);
    if (!benef) throw new AppErrosCustom("Beneficiário não encontrado.", 404);
    res.status(200).json(benef);
  }

  static async createBenefs(req: Request, res: Response): Promise<void> {
    const newBenef = await BeneficiarioService.insertBeneficiario(req.body);
    res.status(201).json(newBenef);
  }

  static async editBenef(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const benefEdited = await BeneficiarioService.editBenefById(id, req.body);
    if (!benefEdited) throw new AppErrosCustom("Beneficiário não encontrado.", 404);
    res.status(200).json(benefEdited);
  }

  static deleteBenef = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const beneficiario = await BeneficiarioService.getById(id);
    if (!beneficiario) throw new AppErrosCustom("Beneficiário não encontrado.", 404);

    await beneficiario.destroy();
    res.status(200).json("Beneficiário excluído!");
  };
}
