import { Router } from 'express';
import VisitaController from '../controller/visita.controller';
import { verifyToken } from '../middlewares/verifyJwt.middleware';
import { verifyRole } from '../middlewares/verifyRole.middleware';
import { validate } from '../middlewares/validate.middleware';
import { idParamSchema } from '../schemas/idParam.schema';
import { visitaCreateSchema, visitaUpdateSchema } from '../schemas/visita.schema';

const visitaRouter = Router();
visitaRouter.use(verifyToken);

/**
 * @swagger
 * /visitas:
 *   post:
 *     summary: Criar uma nova visita
 *     tags: [Visitas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VisitaInput'
 *     responses:
 *       201:
 *         description: Visita criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Visita'
 *       400:
 *         description: Erro ao salvar visita
 */
visitaRouter.post('/', validate(visitaCreateSchema), VisitaController.createVisita);

/**
 * @swagger
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
visitaRouter.get('/', VisitaController.getAllvisitas);

/**
 * @swagger
 * /visitas/{id}:
 *   get:
 *     summary: Buscar uma visita pelo ID
 *     tags:
 *       - Visitas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da visita
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Visita encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Visita'
 *       404:
 *         description: Visita não encontrada
 */
visitaRouter.get('/:id', validate(idParamSchema, 'params'), VisitaController.getVisitasById);

/**
 * @swagger
 * /visitas/{id}:
 *   patch:
 *     summary: Atualizar uma visita pelo ID
 *     tags:
 *       - Visitas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da visita
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VisitaInput'
 *     responses:
 *       200:
 *         description: Visita atualizada com sucesso
 *       400:
 *         description: Erro ao atualizar visita
 *       404:
 *         description: Visita não encontrada
 */
visitaRouter.patch(
  '/:id',
  validate(idParamSchema, 'params'),
  validate(visitaUpdateSchema),
  VisitaController.editVisita
);

/**
 * @swagger
 * /visitas/{id}:
 *   delete:
 *     summary: Deletar uma visita pelo ID
 *     tags:
 *       - Visitas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da visita
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Visita deletada com sucesso
 *       403:
 *         description: Acesso negado (somente admin)
 *       404:
 *         description: Visita não encontrada
 */
visitaRouter.delete(
  '/:id',
  validate(idParamSchema, 'params'),
  verifyRole('admin'),
  VisitaController.deleteById
);

export default visitaRouter;
