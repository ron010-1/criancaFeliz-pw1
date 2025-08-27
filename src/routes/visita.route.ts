import { Router } from 'express';
import VisitaController from '../controller/visita.controller';
import { verifyToken } from '../middlewares/verifyJwt.middleware';

const visitaRouter = Router();
visitaRouter.use(verifyToken);

/**
 * @openapi
 * /visitas:
 *   post:
 *     summary: Criar uma nova visita
 *     tags:
 *       - Visitas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dados da visita a serem criados
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
 *                 example: ["https://img.com/foto1.png"]
 *               evolucao:
 *                 type: string
 *                 example: "Paciente estável."
 *               acompanhamento_familiar:
 *                 type: string
 *                 example: "Família presente."
 *               estimulo_familiar:
 *                 type: string
 *                 example: "Família estimula paciente em casa."
 *               beneficiarioId:
 *                 type: string
 *                 example: "uuid-do-beneficiario"
 *     responses:
 *       201:
 *         description: Visita criada com sucesso
 *       400:
 *         description: Erro ao salvar visita
 */
visitaRouter.post('/', verifyToken, VisitaController.createVisita);

/**
 * @openapi
 * /visitas:
 *   get:
 *     summary: Listar todas as visitas
 *     tags:
 *       - Visitas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de visitas retornada
 *       500:
 *         description: Erro ao buscar visitas
 */
visitaRouter.get('/', verifyToken, VisitaController.getAllvisitas);

export default visitaRouter;
