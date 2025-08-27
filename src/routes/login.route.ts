import express from "express";
import LoginController from "../controller/login.controller";

export const LoginRouter = express.Router();

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Autenticar usuário (Admin ou Assistente Social)
 *     tags:
 *       - Login
 *     requestBody:
 *       description: Credenciais do usuário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "usuario@email.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Email ou senha inválidos
 */
LoginRouter.post('/', LoginController.login);
