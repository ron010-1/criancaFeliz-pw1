"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const visita_controller_1 = __importDefault(require("../controller/visita.controller"));
const verifyJwt_middleware_1 = require("../middlewares/verifyJwt.middleware");
const visitaRouter = (0, express_1.Router)();
visitaRouter.use(verifyJwt_middleware_1.verifyToken);
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
visitaRouter.post('/', verifyJwt_middleware_1.verifyToken, visita_controller_1.default.createVisita);
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
visitaRouter.get('/', verifyJwt_middleware_1.verifyToken, visita_controller_1.default.getAllvisitas);
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
visitaRouter.get('/:id', verifyJwt_middleware_1.verifyToken, visita_controller_1.default.getVisitasById);
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
visitaRouter.patch('/:id', verifyJwt_middleware_1.verifyToken, visita_controller_1.default.editVisita);
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
visitaRouter.delete('/:id', verifyJwt_middleware_1.verifyToken, visita_controller_1.default.deleteById);
exports.default = visitaRouter;
