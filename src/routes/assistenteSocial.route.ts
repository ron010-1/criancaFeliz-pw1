import { Router } from 'express';
import AssistenteSocialController from '../controller/assisenteSocial.controller';
import { verifyToken } from '../middlewares/verifyJwt.middleware';
import { verifyRole } from '../middlewares/verifyRole.middleware';
import { validate } from '../middlewares/validate.middleware';
import { idParamSchema } from '../schemas/idParam.schema';
import { assistenteSocialCreateSchema, assistenteSocialUpdateSchema } from '../schemas/assistenteSocial.schema';

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
 *             $ref: '#/components/schemas/AssistenteSocialInput'
 *     responses:
 *       201:
 *         description: Assistente social criado com sucesso
 *       400:
 *         description: Erro ao cadastrar assistente
 *       403:
 *         description: Acesso negado (somente admin)
 */
AssistenteRouter.post(
  '/',
  validate(assistenteSocialCreateSchema),
  verifyRole('admin'),
  AssistenteSocialController.createAssistenteSocial
);

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
AssistenteRouter.get('/', AssistenteSocialController.getAllAssistentes);

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
 *       404:
 *         description: Assistente social não encontrado
 */
AssistenteRouter.get('/:id', validate(idParamSchema, 'params'), AssistenteSocialController.getAssistById);

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
AssistenteRouter.delete(
  '/:id',
  validate(idParamSchema, 'params'),
  verifyRole('admin'),
  AssistenteSocialController.deleteAssist
);

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
AssistenteRouter.patch(
  '/:id',
  validate(idParamSchema, 'params'),
  validate(assistenteSocialUpdateSchema),
  verifyRole('admin'),
  AssistenteSocialController.editAssist
);

export default AssistenteRouter;
