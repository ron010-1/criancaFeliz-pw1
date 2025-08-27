import { Request, Response, RequestHandler } from "express";
import VisitaService from "../service/visita.service";

export default class VisitaController {
  /**
   * @openapi
   * /visitas:
   *   post:
   *     summary: Criar uma nova visita
   *     tags:
   *       - Visitas
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - date
   *               - evolucao
   *               - acompanhamento_familiar
   *               - estimulo_familiar
   *               - beneficiarioId
   *             properties:
   *               date:
   *                 type: string
   *                 format: date
   *                 example: "2025-08-27"
   *               imagens:
   *                 type: array
   *                 items:
   *                   type: string
   *                   example: "https://exemplo.com/imagem1.png"
   *               evolucao:
   *                 type: string
   *                 example: "Paciente apresentou melhora significativa."
   *               acompanhamento_familiar:
   *                 type: string
   *                 example: "Família presente nas atividades."
   *               estimulo_familiar:
   *                 type: string
   *                 example: "Família estimulando paciente em casa."
   *               beneficiarioId:
   *                 type: string
   *                 example: "uuid-do-beneficiario"
   *     responses:
   *       201:
   *         description: Visita criada com sucesso
   *       400:
   *         description: Erro ao salvar visita
   */
  static createVisita: RequestHandler = async (req: Request, res: Response) => {
    const {
      date,
      imagens,
      evolucao,
      acompanhamento_familiar,
      estimulo_familiar,
      beneficiarioId,
    } = req.body;

    if (
      !date ||
      !evolucao ||
      !acompanhamento_familiar ||
      !estimulo_familiar ||
      !beneficiarioId
    ) {
      res.status(400).json("Preencha todos os campos");
    }

    const visitaData = {
      date,
      imagens,
      evolucao,
      acompanhamento_familiar,
      estimulo_familiar,
      beneficiarioId,
    };

    try {
      const newVisita = await VisitaService.createVisita(visitaData);
      res.status(201).json(newVisita);
    } catch (err) {
      console.error(err);
      res.status(400).json("Erro ao salvar visita!");
    }
  };

  /**
   * @openapi
   * /visitas:
   *   get:
   *     summary: Listar todas as visitas
   *     tags:
   *       - Visitas
   *     responses:
   *       200:
   *         description: Lista de visitas retornada com sucesso
   *       500:
   *         description: Erro ao buscar visitas
   */
  static getAllvisitas: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    try {
      const visitas = await VisitaService.getAllVisitas();
      res.status(200).json(visitas);
    } catch (err) {
      console.error(err);
      res.status(500).json("Erro ao buscar visitas!");
    }
  };

  /**
   * @openapi
   * /visitas/{id}:
   *   get:
   *     summary: Buscar visita por ID
   *     tags:
   *       - Visitas
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         example: "uuid-da-visita"
   *     responses:
   *       200:
   *         description: Visita encontrada
   *       400:
   *         description: ID não informado
   *       500:
   *         description: Erro ao buscar visita
   */
  static getVisitasById: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "ID da visita é obrigatório" });
    }
    try {
      const visitas = await VisitaService.getById(id);
      res.status(200).json(visitas);
    } catch (err) {
      console.error(err);
      res.status(500).json("Erro ao buscar visita!");
    }
  };

  /**
   * @openapi
   * /visitas:
   *   put:
   *     summary: Editar visita existente
   *     tags:
   *       - Visitas
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - id
   *               - date
   *               - evolucao
   *               - acompanhamento_familiar
   *               - estimulo_familiar
   *             properties:
   *               id:
   *                 type: string
   *                 example: "uuid-da-visita"
   *               date:
   *                 type: string
   *                 format: date
   *                 example: "2025-08-27"
   *               imagens:
   *                 type: array
   *                 items:
   *                   type: string
   *                   example: "https://exemplo.com/imagem.png"
   *               evolucao:
   *                 type: string
   *                 example: "Paciente estável."
   *               acompanhamento_familiar:
   *                 type: string
   *                 example: "Família pouco participativa."
   *               estimulo_familiar:
   *                 type: string
   *                 example: "Pouco estímulo em casa."
   *     responses:
   *       200:
   *         description: Visita editada com sucesso
   *       400:
   *         description: Erro ao editar visita
   */
  static editVisita: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params; 
    const { date, imagens, evolucao, acompanhamento_familiar, estimulo_familiar } = req.body;
  
    if (!id) {
      res.status(400).json({ message: "ID da visita é obrigatório" });
    }
  
    // Monta apenas os campos que foram enviados no body
    const visitaData: any = {};
    if (date !== undefined) visitaData.date = date;
    if (imagens !== undefined) visitaData.imagens = imagens;
    if (evolucao !== undefined) visitaData.evolucao = evolucao;
    if (acompanhamento_familiar !== undefined) visitaData.acompanhamento_familiar = acompanhamento_familiar;
    if (estimulo_familiar !== undefined) visitaData.estimulo_familiar = estimulo_familiar;
  
    try {
      const updatedVisita = await VisitaService.editVisitaById(id, visitaData);
  
      if (!updatedVisita) {
        res.status(404).json({ message: "Visita não encontrada" });
      }
  
      res.status(200).json(updatedVisita);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Erro ao atualizar visita!" });
    }
  };

  /**
   * @openapi
   * /visitas/{id}:
   *   delete:
   *     summary: Deletar visita por ID
   *     tags:
   *       - Visitas
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         example: "uuid-da-visita"
   *     responses:
   *       200:
   *         description: Visita deletada com sucesso
   *       400:
   *         description: ID da visita não informado
   *       500:
   *         description: Erro ao deletar visita
   */
  static deleteById: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).json("ID da visita é obrigatório");
    }

    try {
      const deletedVisita = await VisitaService.deleteVisitaById(id);
      res.status(200).json(deletedVisita);
    } catch (err) {
      console.error(err);
      res.status(400).json("Erro ao deletar visita!");
    }
  };
}
