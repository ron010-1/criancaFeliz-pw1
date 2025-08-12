import { Request, Response } from 'express';
import { validatePassword } from '../utils/validatePassword';
import { Admin } from '../models/Admin.model';
import { AssistenteSocial } from '../models/AssistenteSocial.model';
import { env } from '../config/envConfig';
import jwt from 'jsonwebtoken';

interface BodyType {
  email: string;
  password: string;
}

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body as BodyType;

    const adminFound = await Admin.findOne({ where: { email } });
    const assistenteFound = await AssistenteSocial.findOne({ where: { email } });

    const user = adminFound || assistenteFound;

    if (!user) return res.status(401).json({ message: 'Email inválido' });

    const senhaValida = await validatePassword(password, user.password);
    if (!senhaValida) return res.status(401).json({ message: 'Senha inválida' });
    const token = jwt.sign(
      { sub: user.uuid },
      env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
  }
}
