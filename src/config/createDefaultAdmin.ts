import bcrypt from 'bcrypt';
import {Admin} from '../models/Admin.model';
import {randomUUID} from 'node:crypto';
import AdminService from '../service/admin.service';

export async function createDefaultAdmin() {
    const emailAdmin = 'admin@admin.com';
    const senhaAdmin = 'adminpass';

    const adminExistente = await Admin.findOne({where: {email: emailAdmin}});
    if (!adminExistente) {
        const hashSenha = await bcrypt.hash(senhaAdmin, 10);
        const admin = {
            uuid: randomUUID(),
            email: 'admin@admin.com',
            password: hashSenha
        };
        await AdminService.createAdmin(admin);
        console.log('Admin padrão criado');
    } else {
        console.log('Admin padrão já existe');
    }
}
