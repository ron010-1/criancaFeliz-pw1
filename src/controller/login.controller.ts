import { Request, Response } from 'express';
import { validatePassword } from '../utils/validatePassword';
import { Admin } from '../models/Admin.model';
import { AssistenteSocial } from '../models/AssistenteSocial.model';
import { env } from '../config/envConfig';
import { AppErrosCustom } from '../errors/appError';
import jwt, { SignOptions } from 'jsonwebtoken';
import AdminService from '../service/admin.service';
import AssistenteSocialService from '../service/assistenteSocial.service';

interface BodyType {
  email: string;
  password: string;
}

export default class LoginController {
  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as BodyType;

    const adminFound = await Admin.findOne({ where: { email } });
    const assistenteFound = adminFound ? null : await AssistenteSocial.findOne({ where: { email } });

    const user = adminFound || assistenteFound;
    if (!user) throw new AppErrosCustom('Email inválido', 401);

    const senhaValida = await validatePassword(password, user.password);
    if (!senhaValida) throw new AppErrosCustom('Senha inválida', 401);

    const role = adminFound ? 'admin' : 'assistente';
    const token = jwt.sign(
      { sub: user.uuid, role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES as SignOptions['expiresIn'] }
    );

    res.status(200).json({ token });
  }

  static async me(req: Request, res: Response): Promise<void> {
    const { userId, userRole } = req;

    if (!userId || !userRole) throw new AppErrosCustom('Não autenticado', 401);

    if (userRole === 'admin') {
      const admin = await AdminService.getById(userId);
      if (!admin) throw new AppErrosCustom('Usuário não encontrado', 404);

      res.status(200).json({
        uuid: admin.uuid,
        email: admin.email,
      });
      return;
    }

    const assistente = await AssistenteSocialService.getById(userId);
    if (!assistente) throw new AppErrosCustom('Usuário não encontrado', 404);

    res.status(200).json({
      nome: assistente.nome,
      email: assistente.email,
      telefone: assistente.telefone,
    });
  }
}