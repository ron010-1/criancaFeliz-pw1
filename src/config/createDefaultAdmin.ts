import bcrypt from 'bcrypt';
import {Admin} from '../models/Admin.model';
import {randomUUID} from 'node:crypto';
import AdminService from '../service/admin.service';
import { env } from './envConfig';

export async function createDefaultAdmin() {
    const emailAdmin = env.ADMIN_EMAIL;
    const senhaAdmin = env.ADMIN_PASSWORD;

    const adminExistente = await Admin.findOne({where: {email: emailAdmin}});
    if (!adminExistente) {
        const hashSenha = await bcrypt.hash(senhaAdmin, 10);
        const admin = {
            uuid: randomUUID(),
            email: emailAdmin,
            password: hashSenha
        };
        await AdminService.createAdmin(admin);
        console.log('Admin padrão criado');
    } else {
        console.log('Admin padrão já existe');
    }
}
