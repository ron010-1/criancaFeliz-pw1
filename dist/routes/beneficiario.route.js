"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const beneficiario_controller_1 = __importDefault(require("../controller/beneficiario.controller"));
const verifyJwt_middleware_1 = require("../middlewares/verifyJwt.middleware");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const idParam_schema_1 = require("../schemas/idParam.schema");
const beneficiario_schema_1 = require("../schemas/beneficiario.schema");
const BenefRouter = (0, express_1.Router)();
BenefRouter.use(verifyJwt_middleware_1.verifyToken);
/**
 * @swagger
 * tags:
 *   name: Beneficiários
 *   description: Endpoints de gerenciamento de beneficiários
 */
/**
 * @swagger
 * /benefs:
 *   get:
 *     summary: Listar beneficiários
 *     description: Admin vê todos os beneficiários. Assistente social vê apenas os que ele mesmo cadastrou.
 *     tags: [Beneficiários]
 *     security:
 *       - bearerAuth: []
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
BenefRouter.get('/', beneficiario_controller_1.default.getBenefs);
/**
 * @swagger
 * /benefs/{id}:
 *   get:
 *     summary: Buscar beneficiário por ID
 *     description: Admin pode buscar qualquer beneficiário. Assistente social só pode buscar um beneficiário cadastrado por ele mesmo.
 *     tags: [Beneficiários]
 *     security:
 *       - bearerAuth: []
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
 *         description: ID não informado ou erro ao buscar
 *       403:
 *         description: Beneficiário não foi cadastrado por você
 *       404:
 *         description: Beneficiário não encontrado
 */
BenefRouter.get('/:id', (0, validate_middleware_1.validate)(idParam_schema_1.idParamSchema, 'params'), beneficiario_controller_1.default.getBenefById);
/**
 * @swagger
 * /benefs:
 *   post:
 *     summary: Criar um novo beneficiário
 *     tags: [Beneficiários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dados do beneficiário a ser criado
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
BenefRouter.post('/', (0, validate_middleware_1.validate)(beneficiario_schema_1.beneficiarioCreateSchema), beneficiario_controller_1.default.createBenefs);
/**
 * @swagger
 * /benefs/{id}:
 *   patch:
 *     summary: Editar beneficiário por ID
 *     description: Admin pode editar qualquer beneficiário. Assistente social só pode editar um beneficiário cadastrado por ele mesmo.
 *     tags: [Beneficiários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "uuid-do-beneficiario"
 *     requestBody:
 *       description: Campos a serem atualizados
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
 *       403:
 *         description: Beneficiário não foi cadastrado por você
 *       404:
 *         description: Beneficiário não encontrado
 */
BenefRouter.patch('/:id', (0, validate_middleware_1.validate)(idParam_schema_1.idParamSchema, 'params'), (0, validate_middleware_1.validate)(beneficiario_schema_1.beneficiarioUpdateSchema), beneficiario_controller_1.default.editBenef);
/**
 * @swagger
 * /benefs/{id}:
 *   delete:
 *     summary: Deletar beneficiário por ID
 *     description: Admin pode deletar qualquer beneficiário. Assistente social só pode deletar um beneficiário cadastrado por ele mesmo.
 *     tags: [Beneficiários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "uuid-do-beneficiario"
 *     responses:
 *       200:
 *         description: Beneficiário excluído com sucesso
 *       403:
 *         description: Beneficiário não foi cadastrado por você
 *       404:
 *         description: Beneficiário não encontrado
 */
BenefRouter.delete('/:id', (0, validate_middleware_1.validate)(idParam_schema_1.idParamSchema, 'params'), beneficiario_controller_1.default.deleteBenef);
exports.default = BenefRouter;
