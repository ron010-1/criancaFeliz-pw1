import { Router } from 'express';
import AssistenteSocialController from '../controller/assisenteSocial.controller';
import verifyToken from '../middlewares/jwt.middleware';

const AssistenteRouter = Router();

//@ts-ignore
AssistenteRouter.post('/',verifyToken,AssistenteSocialController.createAssistenteSocial);
AssistenteRouter.get('/',verifyToken,AssistenteSocialController.getAllAssistentes);
AssistenteRouter.get('/:id',verifyToken,AssistenteSocialController.getAssistById);
AssistenteRouter.delete('/:id',verifyToken,AssistenteSocialController.deleteAssist);
AssistenteRouter.patch('/:id',verifyToken,AssistenteSocialController.editAssist);


export default AssistenteRouter;