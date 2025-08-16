import { Request, Response, RequestHandler } from "express";
import { hashPassword } from "../utils/hashPassword";
import AssistenteSocialService from "../service/assistenteSocial.service";

export default class AssistenteSocialController {

    static createAssistenteSocial: RequestHandler = async (req, res) => {
        const { email, password, telefone, nome } = req.body;

        if (!email || !password || !telefone || !nome){
            res.status(400).json('Email, password, telefone e nome são obrigatórios');
        }

        const hashPass = await hashPassword(password);
        const assistData = { email, password: hashPass, telefone, nome, adminId: req.userId };

        try {
            const existingAssist = await AssistenteSocialService.getByEmail(email);
            if (existingAssist) {
                res.status(400).json('Este email já está cadastrado');
            }
            const newAssist = await AssistenteSocialService.createAssistenteSocial(assistData);
            res.status(201).json(newAssist);
        } catch (err) {
            console.error(err);
            res.status(400).json('Erro ao cadastrar assistente!');
        }
    };
    
    static getAllAssistentes: RequestHandler = async (req, res) => {
        try {
        const assistentes = await AssistenteSocialService.getAllAssistentes();
        res.status(200).json(assistentes);
        } catch (err) {
        console.error(err);
        res.status(500).json('Erro ao buscar assistentes!');
        }
    };

    static getAssistById: RequestHandler = async (req, res) => {
        const { id } = req.params;
        if (!id){ 
            res.status(400).json('O ID do assistente social não foi identificado')
        };

        try {
        const assistente = await AssistenteSocialService.getById(id);
        res.status(200).json(assistente);
        } catch (err) {
        console.error(err);
        res.status(400).json('Erro ao buscar assistente social');
        }
    };

    static editAssist: RequestHandler = async (req, res) => {
        const { id } = req.params;
        if (!id){
            res.status(400).json('O ID do assistente social não foi identificado')
        };

        try {
        const assistente = await AssistenteSocialService.editAssistById(id, req.body);
        res.status(200).json(assistente);
        } catch (err) {
        console.error(err);
        res.status(400).json('Erro ao editar assistente social');
        }
    };

    static deleteAssist: RequestHandler = async (req, res) => {
        const { id } = req.params;
        if (!id){ 
            res.status(400).json('O ID do assistente social não foi identificado')
        };

        try {
            const deleted = await AssistenteSocialService.deleteAssistById(id);
            if (!deleted) {
                res.status(404).json('Assistente social não encontrado')
            };
            res.status(200).json('Assistente social deletado com sucesso');
        } catch (err) {
            console.error(err);
            res.status(400).json('Erro ao deletar assistente social');
        }
    };
}
