import { Request, Response } from "express";
import { hashPassword } from "../utils/hashPassword";
import AssistenteSocialService from "../service/assistenteSocial.service";


export default class AssistenteSocialController {

    static async createAssistenteSocial(req: Request, res:Response){
        const { email, password, telefone, nome } = req.body;

        if( !email || !password || !telefone || !nome){
            res.status(400).json('Email, password, telefone e nome sao obrigatorios');
        }
        const hashPass = await hashPassword(password);

        const assistData = {
            email: email,
            password: hashPass,
            telefone: telefone,
            nome: nome,
            adminId: req.userId
        };

        try {
            const newAssist = await AssistenteSocialService.createAssistenteSocial(assistData);
            res.status(201).json(newAssist);
        }catch(err){
            console.log(err);
            res.status(400).json('Erro ao cadastrar assistente!');
        }
    }
}