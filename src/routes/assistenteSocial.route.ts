import { Router } from 'express';
import AssistenteSocialController from '../controller/assisenteSocial.controller';
import verifyToken from '../middlewares/jwt.middleware';

const AssistenteRouter = Router();

//@ts-ignore
AssistenteRouter.post('/', verifyToken, AssistenteSocialController.createAssistenteSocial);

export default AssistenteRouter;