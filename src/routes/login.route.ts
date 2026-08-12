import express from "express";
import LoginController from "../controller/login.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema } from "../schemas/login.schema";
import { verifyToken } from "../middlewares/verifyJwt.middleware";

export const LoginRouter = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autenticar usuário
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna token JWT
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Email ou senha inválidos
 */
LoginRouter.post('/', validate(loginSchema), LoginController.login);

/**
 * @swagger
 * /login/me:
 *   get:
 *     summary: Obter informações do usuário autenticado
 *     description: Retorna dados do usuário logado de acordo com seu papel. Admin recebe uuid e email. Assistente social recebe nome, email e telefone.
 *     tags: [Login]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informações do usuário autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MeResponse'
 *       401:
 *         description: Token não informado, inválido ou expirado
 *       404:
 *         description: Usuário não encontrado
 */
LoginRouter.get('/me', verifyToken, LoginController.me);