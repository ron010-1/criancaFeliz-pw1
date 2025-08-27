import { Request, Response } from "express";
import BeneficiarioService from "../service/beneficiario.service";

export default class BeneficiarioController {
  /**
   * @swagger
   * /benefs:
   *   get:
   *     summary: Listar todos os beneficiários
   *     tags: [Beneficiários]
   *     responses:
   *       200:
   *         description: Lista de beneficiários retornada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Beneficiario'
   *       400:
   *         description: Nenhum beneficiário encontrado
   */
  static async getBenefs(req: Request, res: Response) {
    try {
      const benefs = await BeneficiarioService.getAllBeneficiarios();
      res.status(200).json(benefs);
    } catch {
      res.status(400).json("Nenhum beneficiario encontrado!");
    }
  }

  /**
   * @swagger
   * /benefs/{id}:
   *   get:
   *     summary: Buscar beneficiário por ID
   *     tags: [Beneficiários]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         example: "uuid-do-beneficiario"
   *     responses:
   *       200:
   *         description: Beneficiário encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Beneficiario'
   *       400:
   *         description: ID inválido ou erro de busca
   *       404:
   *         description: Beneficiário não encontrado
   */
  static async getBenefById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      res.status(400).json("O ID do beneficiário não foi identificado.");
    }
    try {
      const benef = await BeneficiarioService.getById(id);
      res.status(200).json(benef);
    } catch (err) {
      console.log(err);
      res.status(400).json("Erro ao buscar beneficiario!");
    }
  }

  /**
   * @swagger
   * /benefs:
   *   post:
   *     summary: Criar um novo beneficiário
   *     tags: [Beneficiários]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/BeneficiarioInput'
   *     responses:
   *       201:
   *         description: Beneficiário criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Beneficiario'
   *       400:
   *         description: Erro ao cadastrar beneficiário
   */
  static async createBenefs(req: Request, res: Response) {
    const { nome, nome_responsavel, data_nascimento, location, phone1, phone2 } = req.body;
    if (!nome || !nome_responsavel || !data_nascimento || !location || !phone1 || !phone2) {
      res.status(400).json("Campos obrigatórios não informados.");
    }
    try {
      const newBenef = await BeneficiarioService.insertBeneficiario(req.body);
      res.status(201).json(newBenef);
    } catch (err) {
      console.log(err);
      res.status(400).json("Erro ao cadastrar beneficiario!");
    }
  }

  /**
   * @swagger
   * /benefs/{id}:
   *   put:
   *     summary: Editar um beneficiário
   *     tags: [Beneficiários]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/BeneficiarioInput'
   *     responses:
   *       200:
   *         description: Beneficiário atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Beneficiario'
   *       400:
   *         description: Erro ao editar beneficiário
   */
  static async editBenef(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      res.status(400).json("O ID do beneficiário não foi identificado.");
    }
    try {
      const benefEdited = await BeneficiarioService.editBenefById(id, req.body);
      res.status(200).json(benefEdited);
    } catch (err) {
      console.log(err);
      res.status(400).json("Erro ao buscar beneficiario!");
    }
  }

  /**
   * @swagger
   * /benefs/{id}:
   *   delete:
   *     summary: Excluir beneficiário por ID
   *     tags: [Beneficiários]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Beneficiário excluído com sucesso
   *       404:
   *         description: Beneficiário não encontrado
   *       500:
   *         description: Erro interno ao excluir beneficiário
   */
  static deleteBenef = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json("O ID do beneficiário não foi identificado.");
      return;
    }
    try {
      const beneficiario = await BeneficiarioService.getById(id);
      if (!beneficiario) {
        res.status(404).json("Beneficiário não encontrado.");
        return;
      }
      await beneficiario.destroy();
      res.status(200).json("Beneficiário excluído!");
    } catch (error) {
      console.error("Erro ao excluir beneficiário:", error);
      res.status(500).json("Erro interno ao excluir o beneficiário.");
    }
  };
}
