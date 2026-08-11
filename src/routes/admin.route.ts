import { Router } from 'express';
import AdminController from '../controller/admin.controller';
import { verifyToken } from '../middlewares/verifyJwt.middleware';
import { verifyRole } from '../middlewares/verifyRole.middleware';
import { validate } from '../middlewares/validate.middleware';
import { adminUpdateSchema } from '../schemas/admin.schema';

const AdminRouter = Router();
AdminRouter.use(verifyToken);

/**
 * @openapi
 * /admin/me:
 *   patch:
 *     summary: Editar informações do próprio admin
 *     description: Permite que um admin autenticado edite algumas de suas informações (email e/ou senha). Campos não enviados permanecem inalterados.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Campos a serem atualizados do admin
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "novoadmin@email.com"
 *               password:
 *                 type: string
 *                 example: "novaSenha123"
 *     responses:
 *       200:
 *         description: Informações atualizadas com sucesso
 *       400:
 *         description: Erro de validação ou email já cadastrado
 *       401:
 *         description: Token não informado, inválido ou expirado
 *       403:
 *         description: Acesso negado (somente admin)
 *       404:
 *         description: Usuário não encontrado
 */
AdminRouter.patch(
  '/me',
  verifyRole('admin'),
  validate(adminUpdateSchema),
  AdminController.updateMe
);

export default AdminRouter;