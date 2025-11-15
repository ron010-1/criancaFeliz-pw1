"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const hashPassword_1 = require("../utils/hashPassword");
const assistenteSocial_service_1 = __importDefault(require("../service/assistenteSocial.service"));
class AssistenteSocialController {
}
_a = AssistenteSocialController;
/**
 * @openapi
 * /assistentes:
 *   post:
 *     summary: Cadastrar um novo assistente social
 *     tags:
 *       - Assistentes Sociais
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - telefone
 *               - nome
 *             properties:
 *               email:
 *                 type: string
 *                 example: "assistente@email.com"
 *               password:
 *                 type: string
 *                 example: "senhaSegura123"
 *               telefone:
 *                 type: string
 *                 example: "(83) 98888-7777"
 *               nome:
 *                 type: string
 *                 example: "Maria Souza"
 *     responses:
 *       201:
 *         description: Assistente social criado com sucesso
 *       400:
 *         description: Erro de validação ou email já cadastrado
 */
AssistenteSocialController.createAssistenteSocial = async (req, res) => {
    const { email, password, telefone, nome } = req.body;
    if (!email || !password || !telefone || !nome) {
        res.status(400).json("Email, password, telefone e nome são obrigatórios");
    }
    const hashPass = await (0, hashPassword_1.hashPassword)(password);
    const assistData = {
        email,
        password: hashPass,
        telefone,
        nome,
        adminId: req.userId,
    };
    try {
        const existingAssist = await assistenteSocial_service_1.default.getByEmail(email);
        if (existingAssist) {
            res.status(400).json("Este email já está cadastrado");
            return;
        }
        const newAssist = await assistenteSocial_service_1.default.createAssistenteSocial(assistData);
        res.status(201).json(newAssist);
    }
    catch (err) {
        console.error(err);
        res.status(400).json("Erro ao cadastrar assistente!");
    }
};
/**
 * @openapi
 * /assistentes:
 *   get:
 *     summary: Listar todos os assistentes sociais
 *     tags:
 *       - Assistentes Sociais
 *     responses:
 *       200:
 *         description: Lista de assistentes retornada com sucesso
 *       500:
 *         description: Erro ao buscar assistentes
 */
AssistenteSocialController.getAllAssistentes = async (req, res, next) => {
    try {
        const assistentes = await assistenteSocial_service_1.default.getAllAssistentes();
        res.status(200).json(assistentes);
    }
    catch (err) {
        next(err); // manda para exceptionsVerify
    }
};
/**
 * @openapi
 * /assistentes/{id}:
 *   get:
 *     summary: Buscar assistente social por ID
 *     tags:
 *       - Assistentes Sociais
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assistente social encontrado
 *       400:
 *         description: ID não informado
 *       404:
 *         description: Assistente social não encontrado
 */
AssistenteSocialController.getAssistById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json("O ID do assistente social não foi identificado");
    }
    try {
        const assistente = await assistenteSocial_service_1.default.getById(id);
        res.status(200).json(assistente);
    }
    catch (err) {
        console.error(err);
        res.status(400).json("Erro ao buscar assistente social");
    }
};
/**
 * @openapi
 * /assistentes/{id}:
 *   put:
 *     summary: Editar assistente social
 *     tags:
 *       - Assistentes Sociais
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               telefone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Assistente social editado com sucesso
 *       400:
 *         description: Erro ao editar
 */
AssistenteSocialController.editAssist = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json("O ID do assistente social não foi identificado");
    }
    try {
        const assistente = await assistenteSocial_service_1.default.editAssistById(id, req.body);
        res.status(200).json(assistente);
    }
    catch (err) {
        console.error(err);
        res.status(400).json("Erro ao editar assistente social");
    }
};
/**
 * @openapi
 * /assistentes/{id}:
 *   delete:
 *     summary: Deletar assistente social por ID
 *     tags:
 *       - Assistentes Sociais
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assistente social deletado com sucesso
 *       404:
 *         description: Assistente não encontrado
 *       400:
 *         description: Erro ao deletar
 */
AssistenteSocialController.deleteAssist = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json("O ID do assistente social não foi identificado");
    }
    try {
        const deleted = await assistenteSocial_service_1.default.deleteAssistById(id);
        if (!deleted) {
            res.status(404).json("Assistente social não encontrado");
        }
        res.status(200).json("Assistente social deletado com sucesso");
    }
    catch (err) {
        console.error(err);
        res.status(400).json("Erro ao deletar assistente social");
    }
};
exports.default = AssistenteSocialController;
