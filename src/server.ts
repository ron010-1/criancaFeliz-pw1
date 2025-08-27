import express from "express";
import cors from "cors";
import { env } from "./config/envConfig";
import ConfigSequelize from "./config/sequelize";
import BenefRouter from "./routes/beneficiario.route";
import visitaRouter from "./routes/visita.route";
import { LoginRouter } from "./routes/login.route";
import AssistenteRouter from "./routes/assistenteSocial.route";
import { createDefaultAdmin } from "./config/createDefaultAdmin";
import { exceptionsVerify } from "./middlewares/errorsVerify";
import swaggerUi from "swagger-ui-express";
import setupSwagger from "./swagger";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/visitas", visitaRouter);
app.use("/benefs", BenefRouter);
app.use("/assists", AssistenteRouter);
app.use("/login", LoginRouter);
app.use(exceptionsVerify);

setupSwagger(app);

app.listen(env.PORT, async () => {
  await ConfigSequelize();
  await createDefaultAdmin();
  console.log(`🚀 Server is running at http://localhost:${env.PORT}`);
});


