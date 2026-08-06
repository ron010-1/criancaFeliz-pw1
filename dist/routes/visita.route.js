"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const visita_controller_1 = __importDefault(require("../controller/visita.controller"));
const verifyJwt_middleware_1 = require("../middlewares/verifyJwt.middleware");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const idParam_schema_1 = require("../schemas/idParam.schema");
const visita_schema_1 = require("../schemas/visita.schema");
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
visitaRouter.post('/', (0, validate_middleware_1.validate)(visita_schema_1.visitaCreateSchema), visita_controller_1.default.createVisita);
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
visitaRouter.get('/', visita_controller_1.default.getAllvisitas);
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
visitaRouter.get('/:id', (0, validate_middleware_1.validate)(idParam_schema_1.idParamSchema, 'params'), visita_controller_1.default.getVisitasById);
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
visitaRouter.patch('/:id', (0, validate_middleware_1.validate)(idParam_schema_1.idParamSchema, 'params'), (0, validate_middleware_1.validate)(visita_schema_1.visitaUpdateSchema), visita_controller_1.default.editVisita);
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
visitaRouter.delete('/:id', (0, validate_middleware_1.validate)(idParam_schema_1.idParamSchema, 'params'), visita_controller_1.default.deleteById);
exports.default = visitaRouter;
