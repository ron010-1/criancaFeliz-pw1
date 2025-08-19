import {Router} from 'express';
import AssistenteSocialController from '../controller/assisenteSocial.controller';
import {verifyToken} from '../middlewares/verifyJwt.middleware';

const AssistenteRouter = Router();
AssistenteRouter.use(verifyToken);

AssistenteRouter.post('/', AssistenteSocialController.createAssistenteSocial);

export default AssistenteRouter;
