import { Visita } from "../models/Visita.model";

export default class VisitaService{

    static async getAllVisitas(){
        return await Visita.findAndCountAll();
    }

    static async createVisita(visitaData: any){
        return await Visita.create(visitaData);
    }

    static async getById(id: string){
        return await Visita.findByPk(id);
    }

    static async editVisitaById(id: string, data: any){
        const [updated] = await Visita.update(data, {
            where : { uuid: id}
        });
        if (updated) {
            const updatedVisita = await Visita.findOne({ where: { uuid: id } });
            return updatedVisita;
        };
    }

    static async deleteVisitaById(id: string){
        const visita = await Visita.findOne({
            where: { uuid: id } 
        });
    
        if (visita) {
            await visita.destroy();
            return true;
        }
    }

}