"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validatePassword_1 = require("../utils/validatePassword");
const Admin_model_1 = require("../models/Admin.model");
const AssistenteSocial_model_1 = require("../models/AssistenteSocial.model");
const envConfig_1 = require("../config/envConfig");
const appError_1 = require("../errors/appError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginController {
    static async login(req, res) {
        const { email, password } = req.body;
        const adminFound = await Admin_model_1.Admin.findOne({ where: { email } });
        const assistenteFound = adminFound ? null : await AssistenteSocial_model_1.AssistenteSocial.findOne({ where: { email } });
        const user = adminFound || assistenteFound;
        if (!user)
            throw new appError_1.AppErrosCustom('Email inválido', 401);
        const senhaValida = await (0, validatePassword_1.validatePassword)(password, user.password);
        if (!senhaValida)
            throw new appError_1.AppErrosCustom('Senha inválida', 401);
        const role = adminFound ? 'admin' : 'assistente';
        const token = jsonwebtoken_1.default.sign({ sub: user.uuid, role }, envConfig_1.env.JWT_SECRET, { expiresIn: envConfig_1.env.JWT_EXPIRES });
        res.status(200).json({ token });
    }
}
exports.default = LoginController;
