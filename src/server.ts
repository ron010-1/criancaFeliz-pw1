import express from 'express';
import cors from 'cors';
import {env} from './config/envConfig';
import ConfigSequelize from './config/sequelize';
import BenefRouter from './routes/beneficiario.route';
import {LoginRouter} from './routes/login.route';
import AssistenteRouter from './routes/assistenteSocial.route';
import {createDefaultAdmin} from './config/createDefaultAdmin';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/benefs', BenefRouter);
app.use('/assists', AssistenteRouter);
app.use('/login', LoginRouter);

app.listen(env.PORT, async () => {
    await createDefaultAdmin();
    ConfigSequelize();
    console.log(`🚀 Server is running at http://localhost:${env.PORT}`);
});
