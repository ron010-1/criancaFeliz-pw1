import { Admin } from "../models/Admin.model";

export default class AdminService{

    static async createAdmin(admin: any){
        return await Admin.create(admin);
    }

    static async getById(id: string){
        return await Admin.findByPk(id);
    }

    static async getByEmail(email: string){
        return await Admin.findOne({ where: { email } });
    }

    static async editAdminById(id: string, data: any){
        const [updated] = await Admin.update(data, {
            where: { uuid: id }
        });
        if (updated) {
            return await Admin.findOne({ where: { uuid: id } });
        }
        return null;
    }
}