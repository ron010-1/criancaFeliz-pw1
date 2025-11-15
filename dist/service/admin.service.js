"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Admin_model_1 = require("../models/Admin.model");
class AdminService {
    static async createAdmin(admin) {
        return await Admin_model_1.Admin.create(admin);
    }
}
exports.default = AdminService;
