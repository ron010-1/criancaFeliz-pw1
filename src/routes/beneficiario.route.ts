import { Router } from 'express';
import BeneficiarioController from '../controller/beneficiario.controller';
import { verifyToken } from '../middlewares/verifyJwt.middleware';

const BenefRouter = Router();
BenefRouter.use(verifyToken);

/**
 * @openapi
 * /benefs:
 *   get:
 *     summary: Listar todos os beneficiários
 *     tags:
 *       - Beneficiários
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de beneficiários retornada
 *       400:
 *         description: Nenhum beneficiário encontrado
 */
BenefRouter.get('/', verifyToken, BeneficiarioController.getBenefs);

/**
 * @openapi
 * /benefs/{id}:
 *   get:
 *     summary: Buscar beneficiário por ID
 *     tags:
 *       - Beneficiários
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
 *       400:
 *         description: ID não informado ou erro ao buscar beneficiário
 */
BenefRouter.get('/:id', verifyToken, BeneficiarioController.getBenefById);

/**
 * @openapi
 * /benefs:
 *   post:
 *     summary: Criar um novo beneficiário
 *     tags:
 *       - Beneficiários
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dados do beneficiário a ser criado
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - nome_responsavel
 *               - data_nascimento
 *               - location
 *               - phone1
 *               - phone2
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João da Silva"
 *               nome_responsavel:
 *                 type: string
 *                 example: "Maria da Silva"
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *                 example: "2015-03-12"
 *               location:
 *                 type: string
 *                 example: "Rua A, 123, Cidade, Estado"
 *               phone1:
 *                 type: string
 *                 example: "(83) 99999-1111"
 *               phone2:
 *                 type: string
 *                 example: "(83) 98888-2222"
 *     responses:
 *       201:
 *         description: Beneficiário criado com sucesso
 *       400:
 *         description: Erro ao cadastrar beneficiário
 */
BenefRouter.post('/', verifyToken, BeneficiarioController.createBenefs);

/**
 * @openapi
 * /benefs/{id}:
 *   patch:
 *     summary: Editar beneficiário por ID
 *     tags:
 *       - Beneficiários
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
 *       description: Campos a serem atualizados do beneficiário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João da Silva"
 *               nome_responsavel:
 *                 type: string
 *                 example: "Maria da Silva"
 *               location:
 *                 type: string
 *                 example: "Rua B, 456, Cidade, Estado"
 *     responses:
 *       200:
 *         description: Beneficiário editado com sucesso
 *       400:
 *         description: Erro ao editar beneficiário
 */
BenefRouter.patch('/:id', verifyToken, BeneficiarioController.editBenef);

/**
 * @openapi
 * /benefs/{id}:
 *   delete:
 *     summary: Deletar beneficiário por ID
 *     tags:
 *       - Beneficiários
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
 *       400:
 *         description: ID não informado
 *       404:
 *         description: Beneficiário não encontrado
 */
BenefRouter.delete('/:id', verifyToken, BeneficiarioController.deleteBenef);

export default BenefRouter;
