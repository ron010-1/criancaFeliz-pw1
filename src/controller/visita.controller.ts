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

    static getVisitasById: RequestHandler = async (req: Request, res:Response) => {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({message: 'ID da visita é obrigatório' });
        }
        try {
        const visitas = await VisitaService.getById(id);
        res.status(200).json(visitas);
        } catch (err) {
        console.error(err);
        res.status(500).json('Erro ao buscar visita!');
        }
    };

    static editVisita: RequestHandler = async (req: Request, res:Response) => {
        const {id, date, imagens, evolucao, acompanhamento_familiar, estimulo_familiar} = req.body;

        if(!date || !evolucao || !acompanhamento_familiar || !estimulo_familiar || id){ //|| !imagens
            res.status(400).json('Preencha todos os campos');
        }

        const visitaData = {id, date, imagens, evolucao, acompanhamento_familiar, estimulo_familiar};

        try{
            const editVisita = await VisitaService.editVisitaById(id, visitaData);
            res.status(201).json(editVisita);
        }catch(err){
            console.error(err);
            res.status(400).json('Erro ao salvar visita!');
        }

    }

    static deleteById: RequestHandler = async (req: Request, res:Response) => {
        const {id} = req.params;

        if(!id){
            res.status(400).json('ID da visita é obrigatório');
        }

        try{
            const deletedVisita = await VisitaService.deleteVisitaById(id);
            res.status(200).json(deletedVisita);
        }catch(err){
            console.error(err);
            res.status(400).json('Erro ao deletar visita!');
        }

    }

}