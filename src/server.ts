import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import {env} from './config/envConfig';
import ConfigSequelize from './config/sequelize';
import BenefRouter from './router/beneficiario-router';
import {Admin} from './models/Admin.model';
import {AssistenteSocial} from './models/AssistenteSocial.model';
import bcrypt from 'bcrypt';
import {validatePassword} from './utils/validatePassword';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/benefs', BenefRouter);

app.post('/login', async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const adminFinded = await Admin.findOne({where: {email: email}});
    const assistenteFinded = await AssistenteSocial.findOne({where: {email: email}});

    const user = adminFinded || assistenteFinded;

    const senhaValida = await validatePassword(password, user?.password as string);
    if (!senhaValida) return res.send(401).json({message: 'Credenciais Invalidas'});

    const token = jwt.sign({id: user?.id}, env.JWT_SECRET, {expiresIn: '1h'});
    return res.json({
        token,
        user: {
            ...user
        }
    });
});

app.get('/verify-token', (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) res.sendStatus(401);

    jwt.verify(token as string, env.JWT_SECRET, async (err: any, user: any) => {
        if (err) {
            res.status(401).end();
        }
        res.sendStatus(200);
    });
});

app.listen(env.PORT, () => {
    ConfigSequelize();
    console.log(`🚀 Server is running at http://localhost:${env.PORT}`);
});
