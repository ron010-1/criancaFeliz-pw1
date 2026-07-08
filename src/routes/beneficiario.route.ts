import { Router } from 'express';
import BeneficiarioController from '../controller/beneficiario.controller';
import { verifyToken } from '../middlewares/verifyJwt.middleware';
import { verifyRole } from '../middlewares/verifyRole.middleware';
import { validate } from '../middlewares/validate.middleware';
import { idParamSchema } from '../schemas/idParam.schema';
import { beneficiarioCreateSchema, beneficiarioUpdateSchema } from '../schemas/beneficiario.schema';

const BenefRouter = Router();
BenefRouter.use(verifyToken);

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
 *     summary: Listar todos os beneficiários
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
BenefRouter.get('/', BeneficiarioController.getBenefs);

/**
 * @swagger
 * /benefs/{id}:
 *   get:
 *     summary: Buscar beneficiário por ID
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
 */
BenefRouter.get('/:id', validate(idParamSchema, 'params'), BeneficiarioController.getBenefById);

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
BenefRouter.post('/', validate(beneficiarioCreateSchema), BeneficiarioController.createBenefs);

/**
 * @swagger
 * /benefs/{id}:
 *   patch:
 *     summary: Editar beneficiário por ID
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
 */
BenefRouter.patch(
  '/:id',
  validate(idParamSchema, 'params'),
  validate(beneficiarioUpdateSchema),
  BeneficiarioController.editBenef
);

/**
 * @swagger
 * /benefs/{id}:
 *   delete:
 *     summary: Deletar beneficiário por ID
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
 *         description: Acesso negado (somente admin)
 *       404:
 *         description: Beneficiário não encontrado
 */
BenefRouter.delete(
  '/:id',
  validate(idParamSchema, 'params'),
  verifyRole('admin'),
  BeneficiarioController.deleteBenef
);

export default BenefRouter;
