import { Router } from 'express';
import BeneficiarioController from '../controller/beneficiario.controller';
import { verifyToken } from '../middlewares/verifyJwt.middleware';
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
BenefRouter.get('/', BeneficiarioController.getBenefs);

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
BenefRouter.delete(
  '/:id',
  validate(idParamSchema, 'params'),
  BeneficiarioController.deleteBenef
);

export default BenefRouter;
