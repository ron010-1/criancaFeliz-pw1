import { Request, Response, RequestHandler } from "express";
import { hashPassword } from "../utils/hashPassword";
import AdminService from "../service/admin.service";
import { AppErrosCustom } from "../errors/appError";

interface AdminUpdateBody {
  email?: string;
  password?: string;
}

export default class AdminController {
  static updateMe: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req;
    if (!userId) throw new AppErrosCustom("Não autenticado", 401);

    const { email, password } = req.body as AdminUpdateBody;

    const admin = await AdminService.getById(userId);
    if (!admin) throw new AppErrosCustom("Usuário não encontrado", 404);

    const updateData: Record<string, string> = {};

    if (email && email !== admin.email) {
      const emailInUse = await AdminService.getByEmail(email);
      if (emailInUse) throw new AppErrosCustom("Este email já está cadastrado", 400);
      updateData.email = email;
    }

    if (password) {
      updateData.password = await hashPassword(password);
    }

    const updatedAdmin = await AdminService.editAdminById(userId, updateData);
    if (!updatedAdmin) throw new AppErrosCustom("Usuário não encontrado", 404);

    res.status(200).json({
      uuid: updatedAdmin.uuid,
      email: updatedAdmin.email,
    });
  };
}