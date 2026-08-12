import { Router } from 'express';
import VisitaController from '../controller/visita.controller';
import { verifyToken } from '../middlewares/verifyJwt.middleware';
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
 *     summary: Listar visitas
 *     description: Admin vê todas as visitas. Assistente social vê apenas as que ele mesmo cadastrou.
 *     tags:
 *       - Visitas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de visitas retornada, com as fotos (imagens) de cada visita já resolvidas em URLs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 1
 *                 rows:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Visita'
 *       500:
 *         description: Erro ao buscar visitas
 */
visitaRouter.get('/', VisitaController.getAllvisitas);

/**
 * @swagger
 * /visitas/{id}:
 *   get:
 *     summary: Buscar uma visita pelo ID
 *     description: Admin pode buscar qualquer visita. Assistente social só pode buscar uma visita cadastrada por ele mesmo.
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
 *       403:
 *         description: Visita não foi cadastrada por você
 *       404:
 *         description: Visita não encontrada
 */
visitaRouter.get('/:id', validate(idParamSchema, 'params'), VisitaController.getVisitasById);

/**
 * @swagger
 * /visitas/{id}:
 *   patch:
 *     summary: Atualizar uma visita pelo ID (aceita atualização parcial de campos)
 *     description: >
 *       Todos os campos do body são opcionais nesta edição parcial. Atenção especial ao campo `imagens`:
 *       se enviado, ele SUBSTITUI toda a galeria de fotos da visita (replace-all); se omitido, as fotos
 *       atuais são preservadas. Admin pode editar qualquer visita; assistente social só pode editar uma
 *       visita cadastrada por ele mesmo.
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Visita'
 *       400:
 *         description: Erro ao atualizar visita
 *       403:
 *         description: Visita não foi cadastrada por você
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
 *     description: Admin pode deletar qualquer visita. Assistente social só pode deletar uma visita cadastrada por ele mesmo.
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
 *         description: Visita não foi cadastrada por você
 *       404:
 *         description: Visita não encontrada
 */
visitaRouter.delete(
  '/:id',
  validate(idParamSchema, 'params'),
  VisitaController.deleteById
);

export default visitaRouter;
