import { Beneficiario } from "../models/Beneficiario.model";

export default class BeneficiarioService {

    static async getAllBeneficiarios() {
        return await Beneficiario.findAndCountAll();
    };

    static async insertBeneficiario(beneficiarioData: any){
        return await Beneficiario.create(beneficiarioData);
    };

    static async getById(id: string){
        return await Beneficiario.findByPk(id);
    };

    static async editBenefById(id: string, data: any){
        const [updated] = await Beneficiario.update(data, {
            where : { uuid: id}
        });
        if (updated) {
            const updatedBenef = await Beneficiario.findOne({ where: { uuid: id } });
            return updatedBenef;
        };
    };


    static async deleteBenefById(id: string){
        const beneficiario = await Beneficiario.findOne({
            where: { uuid: id } 
        });
    
        if (beneficiario) {
            await beneficiario.destroy();
            return true;
        }
     
    }

}