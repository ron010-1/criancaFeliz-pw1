import express, { Request, Response } from "express";
import { upload } from "../config/upload";
import { verifyToken } from "../middlewares/verifyJwt.middleware";

const UploadRouter = express.Router();

UploadRouter.use(verifyToken);

/**
 * @swagger
 * /uploads:
 *   post:
 *     summary: Enviar uma imagem ou vídeo
 *     description: >
 *       Recebe um arquivo (campo `file`, multipart/form-data) e o grava no disco do
 *       servidor. Retorna o caminho relativo, que deve ser usado nos campos `foto`
 *       do beneficiário e `imagens` da visita. O caminho é relativo de propósito —
 *       assim o endereço do servidor pode mudar sem invalidar o que está no banco.
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file]
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Arquivo salvo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 path:
 *                   type: string
 *                   example: /uploads/9f2c7fa9-9a84-4c1c-8dd5-6800b98b4e79.jpg
 *       400:
 *         description: Arquivo ausente ou tipo não suportado
 *       401:
 *         description: Token não informado ou inválido
 */
UploadRouter.post("/", upload.single("file"), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: "Arquivo é obrigatório." });
    return;
  }

  res.status(201).json({ path: `/uploads/${req.file.filename}` });
});

export default UploadRouter;
