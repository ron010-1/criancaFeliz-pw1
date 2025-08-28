import express from "express";
import LoginController from "../controller/login.controller";

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
LoginRouter.post('/', LoginController.login);
