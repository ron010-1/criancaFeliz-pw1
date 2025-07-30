import { Beneficiario } from "../models/Beneficiario.model";


export default class BeneficiarioService {

    static async getAllBeneficiarios() {
        return await Beneficiario.findAndCountAll();
    };

    static async insertBeneficiario(beneficiarioData: any){
        return await Beneficiario.create(beneficiarioData);
    };

    static async getById(id: any){
        return await Beneficiario.findByPk(id);
    };

    static async editBenefById(id: any, data: any){
        const [updated] = await Beneficiario.update(data, {
            where : { uuid: id}
        });
        if (updated) {
            const updatedBenef = await Beneficiario.findOne({ where: { uuid: id } });
            return updatedBenef;
        };
    };


    static async deleteBenefById(id: any){
        const beneficiario = await Beneficiario.findOne({
            where: { uuid: id } 
        });
    
        if (beneficiario) {
            await beneficiario.destroy();
            return true;
        }
     
    }

}