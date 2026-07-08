import { Request, Response } from 'express';
import { validatePassword } from '../utils/validatePassword';
import { Admin } from '../models/Admin.model';
import { AssistenteSocial } from '../models/AssistenteSocial.model';
import { env } from '../config/envConfig';
import { AppErrosCustom } from '../errors/appError';
import jwt, { SignOptions } from 'jsonwebtoken';

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
}
