import { Router } from 'express';
import AssistenteSocialController from '../controller/assisenteSocial.controller';
import { verifyToken } from '../middlewares/verifyJwt.middleware';

const AssistenteRouter = Router();
AssistenteRouter.use(verifyToken);

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
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - telefone
 *               - nome
 *             properties:
 *               email:
 *                 type: string
 *                 example: "assistente@email.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               telefone:
 *                 type: string
 *                 example: "(83) 99999-1111"
 *               nome:
 *                 type: string
 *                 example: "Maria Silva"
 *     responses:
 *       201:
 *         description: Assistente social criado com sucesso
 *       400:
 *         description: Erro ao cadastrar assistente
 */
AssistenteRouter.post('/', verifyToken, AssistenteSocialController.createAssistenteSocial);

/**
 * @openapi
 * /assists:
 *   get:
 *     summary: Listar todos os assistentes sociais
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
AssistenteRouter.get('/', verifyToken, AssistenteSocialController.getAllAssistentes);

/**
 * @openapi
 * /assists/{id}:
 *   get:
 *     summary: Buscar assistente social por ID
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
 *       400:
 *         description: ID não informado
 */
AssistenteRouter.get('/:id', verifyToken, AssistenteSocialController.getAssistById);

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
 *       400:
 *         description: ID não informado
 *       404:
 *         description: Assistente social não encontrado
 */
AssistenteRouter.delete('/:id', verifyToken, AssistenteSocialController.deleteAssist);

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
 */
AssistenteRouter.patch('/:id', verifyToken, AssistenteSocialController.editAssist);

export default AssistenteRouter;
