import { Admin } from "../models/Admin.model";

export default class AdminService{

    static async createAdmin(admin: any){
        return await Admin.create(admin);
    }

    static async getById(id: string){
        return await Admin.findByPk(id);
    }
}