"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const assisenteSocial_controller_1 = __importDefault(require("../controller/assisenteSocial.controller"));
const verifyJwt_middleware_1 = require("../middlewares/verifyJwt.middleware");
const verifyRole_middleware_1 = require("../middlewares/verifyRole.middleware");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const idParam_schema_1 = require("../schemas/idParam.schema");
const assistenteSocial_schema_1 = require("../schemas/assistenteSocial.schema");
const AssistenteRouter = (0, express_1.Router)();
AssistenteRouter.use(verifyJwt_middleware_1.verifyToken);
/**
 * @openapi
 * /assists:
 *   post:
 *     summary: Criar um novo assistente social
 *     tags:
 *       - Assistentes Sociais
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dados do assistente social a ser criado
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssistenteSocialInput'
 *     responses:
 *       201:
 *         description: Assistente social criado com sucesso
 *       400:
 *         description: Erro ao cadastrar assistente
 *       403:
 *         description: Acesso negado (somente admin)
 */
AssistenteRouter.post('/', (0, validate_middleware_1.validate)(assistenteSocial_schema_1.assistenteSocialCreateSchema), (0, verifyRole_middleware_1.verifyRole)('admin'), assisenteSocial_controller_1.default.createAssistenteSocial);
/**
 * @openapi
 * /assists:
 *   get:
 *     summary: Listar assistentes sociais
 *     description: Admin vê todos os assistentes sociais. Assistente social vê apenas o próprio perfil.
 *     tags:
 *       - Assistentes Sociais
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de assistentes retornada
 *       500:
 *         description: Erro ao buscar assistentes
 */
AssistenteRouter.get('/', assisenteSocial_controller_1.default.getAllAssistentes);
/**
 * @openapi
 * /assists/{id}:
 *   get:
 *     summary: Buscar assistente social por ID
 *     description: Admin pode buscar qualquer assistente. Assistente social só pode buscar o próprio perfil (id igual ao seu).
 *     tags:
 *       - Assistentes Sociais
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "uuid-do-assistente"
 *     responses:
 *       200:
 *         description: Assistente social encontrado
 *       403:
 *         description: Você só pode acessar o próprio perfil
 *       404:
 *         description: Assistente social não encontrado
 */
AssistenteRouter.get('/:id', (0, validate_middleware_1.validate)(idParam_schema_1.idParamSchema, 'params'), assisenteSocial_controller_1.default.getAssistById);
/**
 * @openapi
 * /assists/{id}:
 *   delete:
 *     summary: Deletar assistente social por ID
 *     tags:
 *       - Assistentes Sociais
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "uuid-do-assistente"
 *     responses:
 *       200:
 *         description: Assistente social deletado com sucesso
 *       403:
 *         description: Acesso negado (somente admin)
 *       404:
 *         description: Assistente social não encontrado
 */
AssistenteRouter.delete('/:id', (0, validate_middleware_1.validate)(idParam_schema_1.idParamSchema, 'params'), (0, verifyRole_middleware_1.verifyRole)('admin'), assisenteSocial_controller_1.default.deleteAssist);
/**
 * @openapi
 * /assists/{id}:
 *   patch:
 *     summary: Editar assistente social por ID
 *     tags:
 *       - Assistentes Sociais
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "uuid-do-assistente"
 *     requestBody:
 *       description: Campos a serem atualizados do assistente social
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "novo@email.com"
 *               telefone:
 *                 type: string
 *                 example: "(83) 98888-2222"
 *               nome:
 *                 type: string
 *                 example: "Maria Souza"
 *     responses:
 *       200:
 *         description: Assistente social editado com sucesso
 *       400:
 *         description: Erro ao editar assistente
 *       403:
 *         description: Acesso negado (somente admin)
 *       404:
 *         description: Assistente social não encontrado
 */
AssistenteRouter.patch('/:id', (0, validate_middleware_1.validate)(idParam_schema_1.idParamSchema, 'params'), (0, validate_middleware_1.validate)(assistenteSocial_schema_1.assistenteSocialUpdateSchema), (0, verifyRole_middleware_1.verifyRole)('admin'), assisenteSocial_controller_1.default.editAssist);
exports.default = AssistenteRouter;
