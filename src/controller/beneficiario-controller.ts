import {error} from 'console';
import {Request, Response} from 'express';
import BeneficiarioService from '../service/beneficiario.service';
import { Beneficiario } from '../models/Beneficiario.model';

export default class BeneficiarioController {
    static async getBenefs(req: Request, res: Response) {
        try {
            const benefs = await BeneficiarioService.getAllBeneficiarios();
            res.status(200).json(benefs);
        } catch {
            res.status(400).json('Nenhum beneficiario encontrado!');
        }
    }

    static async getBenefById(req: Request, res: Response) {
        const {id} = req.params;

        if (!id) {
            res.status(400).json('O ID do beneficiário não foi identificado.');
        }

        try {
            const benef = await BeneficiarioService.getById(id);
            res.status(200).json(benef);
        } catch (err) {
            console.log(err);
            res.status(400).json('Erro ao buscar beneficiario!');
        }
    }

    static async createBenefs(req: Request, res: Response) {
        const {nome, nome_responsavel, data_nascimento, location, phone1, phone2} = req.body;

        if (!nome || !nome_responsavel || !data_nascimento || !location ||!phone1 || !phone2) {
            res.status(400).json('Nome, Nome do Responsável, Data de Nascimento ou Localização não foi especificado.');
        }
        try {
            const newBenef = await BeneficiarioService.insertBeneficiario(req.body);
            res.status(201).json(newBenef);
        } catch (err) {
            console.log(err);
            res.status(400).json('Erro ao cadastrar beneficiario!');
        }
    }

    static async editBenef(req: Request, res: Response) {
        const {id} = req.params;

        if (!id) {
            res.status(400).json('O ID do beneficiário não foi identificado.');
        }

        try {
            const benefEdited = await BeneficiarioService.editBenefById(id, req.body);
            res.status(200).json(benefEdited);
        } catch (err) {
            console.log(err);
            res.status(400).json('Erro ao buscar beneficiario!');
        }
    }

    static deleteBenef = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
    
        if (!id) {
            res.status(400).json('O ID do beneficiário não foi identificado.');
            return;
        }
    
        try {
            const beneficiario = await BeneficiarioService.getById(id);
    
            if (!beneficiario) {
                res.status(404).json('Beneficiário não encontrado.');
                return;
            }
    
            await beneficiario.destroy();
            res.status(200).json('Beneficiário excluído!');
        } catch (error) {
            console.error('Erro ao excluir beneficiário:', error);
            res.status(500).json('Erro interno ao excluir o beneficiário.');
        }
    }
}
