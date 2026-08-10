"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRouter = void 0;
const express_1 = __importDefault(require("express"));
const login_controller_1 = __importDefault(require("../controller/login.controller"));
const validate_middleware_1 = require("../middlewares/validate.middleware");
const login_schema_1 = require("../schemas/login.schema");
exports.LoginRouter = express_1.default.Router();
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
exports.LoginRouter.post('/', (0, validate_middleware_1.validate)(login_schema_1.loginSchema), login_controller_1.default.login);
