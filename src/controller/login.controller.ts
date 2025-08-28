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
  /**
   * @openapi
   * /login:
   *   post:
   *     summary: Autenticar usuário (Admin ou Assistente Social)
   *     tags:
   *       - Autenticação
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 example: "usuario@email.com"
   *               password:
   *                 type: string
   *                 example: "senha123"
   *     responses:
   *       200:
   *         description: Login realizado com sucesso. Retorna token JWT.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   *       401:
   *         description: Credenciais inválidas (email ou senha incorretos)
   */
  static async login(req: Request, res: Response) {
    const { email, password } = req.body as BodyType;

    const adminFound = await Admin.findOne({ where: { email } });
    const assistenteFound = await AssistenteSocial.findOne({ where: { email } });

    const user = adminFound || assistenteFound;

    if (!user) res.status(401).json({ message: 'Email inválido' });

    const senhaValida = await validatePassword(password, user?.password as string);
    if (!senhaValida) res.status(401).json({ message: 'Senha inválida' });

    const token = jwt.sign(
      { sub: user?.uuid },
      env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  }
}
