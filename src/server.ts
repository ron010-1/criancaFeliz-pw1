import express from "express";
import cors from "cors";
import { env } from "./config/envConfig";
import ConfigSequelize from "./config/sequelize";
import BenefRouter from "./routes/beneficiario.route";
import visitaRouter from "./routes/visita.route";
import { LoginRouter } from "./routes/login.route";
import AssistenteRouter from "./routes/assistenteSocial.route";
import AdminRouter from "./routes/admin.route";
import UploadRouter from "./routes/upload.route";
import { UPLOAD_DIR } from "./config/upload";
import { createDefaultAdmin } from "./config/createDefaultAdmin";
import { exceptionsVerify } from "./middlewares/errorsVerify";
import swaggerUi from "swagger-ui-express";
import setupSwagger from "./swagger";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(UPLOAD_DIR));

app.use("/visitas", visitaRouter);
app.use("/benefs", BenefRouter);
app.use("/assists", AssistenteRouter);
app.use("/admin", AdminRouter);
app.use("/login", LoginRouter);
app.use("/uploads", UploadRouter);
app.use(exceptionsVerify);

setupSwagger(app);


const port = process.env.PORT || '0.0.0.0';
app.listen(process.env.PORT || env.PORT || '0.0.0.0', async () => {
  try {
    await ConfigSequelize();
    await createDefaultAdmin();
    console.log(`🚀 Server is running on port ${port}`);
  } catch (error) {
    console.error("Erro na inicialização:", error);
    process.exit(1); 
  }
});
