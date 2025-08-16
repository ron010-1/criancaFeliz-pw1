import {Request, Response, RequestHandler} from "express";
import VisitaService from "../service/visita.service";


export default class VisitaController{

    static createVisita: RequestHandler = async (req: Request, res:Response) => {
        const {date, imagens, evolucao, acompanhamento_familiar, estimulo_familiar, beneficiarioId} = req.body;

        if(!date || !evolucao || !acompanhamento_familiar || !estimulo_familiar || !beneficiarioId){ //|| !imagens
            res.status(400).json('Preencha todos os campos');
        }

        const visitaData = {date, imagens, evolucao, acompanhamento_familiar, estimulo_familiar, beneficiarioId};

        try{
            const newVisita = await VisitaService.createVisita(visitaData);
            res.status(201).json(newVisita);
        }catch(err){
            console.error(err);
            res.status(400).json('Erro ao salvar visita!');
        }

    }

    static getAllvisitas: RequestHandler = async (req: Request, res:Response) => {
        try {
        const visitas = await VisitaService.getAllVisitas();
        res.status(200).json(visitas);
        } catch (err) {
        console.error(err);
        res.status(500).json('Erro ao buscar visitas!');
        }
    };

}