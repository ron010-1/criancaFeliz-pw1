import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

// Os arquivos ficam no disco da máquina que roda a API e são servidos
// estaticamente em /uploads (ver server.ts).
export const UPLOAD_DIR = path.resolve(process.cwd(), "uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const MAX_FILE_SIZE = 25 * 1024 * 1024;

export const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
    filename: (_req, file, cb) => {
      const extension = path.extname(file.originalname) || ".jpg";
      cb(null, `${crypto.randomUUID()}${extension}`);
    },
  }),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (_req, file, cb) => {
    if (/^(image|video)\//.test(file.mimetype)) {
      cb(null, true);
      return;
    }
    cb(new Error("Apenas imagens e vídeos são aceitos"));
  },
});
