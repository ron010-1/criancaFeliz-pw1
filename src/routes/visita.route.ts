import { Router } from 'express';
import VisitaController from '../controller/visita.controller';
import { verifyToken } from '../middlewares/verifyJwt.middleware';

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
visitaRouter.post('/', verifyToken, VisitaController.createVisita);

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
visitaRouter.get('/', verifyToken, VisitaController.getAllvisitas);

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
visitaRouter.get('/:id', verifyToken, VisitaController.getVisitasById);

/**
 * @swagger
 * /visitas/{id}:
 *   put:
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
visitaRouter.patch('/:id', verifyToken, VisitaController.editVisita);

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
 *       204:
 *         description: Visita deletada com sucesso
 *       404:
 *         description: Visita não encontrada
 */
visitaRouter.delete('/:id', verifyToken, VisitaController.deleteById);
export default visitaRouter;
