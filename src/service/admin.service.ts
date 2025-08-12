import { Admin } from "../models/Admin.model";

export default class AdminService{

    static async createAdmin(admin: any){
        return await Admin.create(admin);
    }
}