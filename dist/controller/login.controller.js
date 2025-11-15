"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validatePassword_1 = require("../utils/validatePassword");
const Admin_model_1 = require("../models/Admin.model");
const AssistenteSocial_model_1 = require("../models/AssistenteSocial.model");
const envConfig_1 = require("../config/envConfig");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginController {
    /**
     * @openapi
     * /login:
     *   post:
     *     summary: Autenticar usuário (Admin ou Assistente Social)
     *     tags:
     *       - Autenticação
     *     requestBody:
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
     *                 example: "usuario@email.com"
     *               password:
     *                 type: string
     *                 example: "senha123"
     *     responses:
     *       200:
     *         description: Login realizado com sucesso. Retorna token JWT.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
     *       401:
     *         description: Credenciais inválidas (email ou senha incorretos)
     */
    static async login(req, res) {
        const { email, password } = req.body;
        const adminFound = await Admin_model_1.Admin.findOne({ where: { email } });
        const assistenteFound = await AssistenteSocial_model_1.AssistenteSocial.findOne({ where: { email } });
        const user = adminFound || assistenteFound;
        if (!user)
            res.status(401).json({ message: 'Email inválido' });
        const senhaValida = await (0, validatePassword_1.validatePassword)(password, user?.password);
        if (!senhaValida)
            res.status(401).json({ message: 'Senha inválida' });
        const token = jsonwebtoken_1.default.sign({ sub: user?.uuid }, envConfig_1.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    }
}
exports.default = LoginController;
