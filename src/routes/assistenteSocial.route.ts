import {Router} from 'express';
import AssistenteSocialController from '../controller/assisenteSocial.controller';
import {verifyToken} from '../middlewares/verifyJwt.middleware';

const AssistenteRouter = Router();
AssistenteRouter.use(verifyToken);

AssistenteRouter.post('/', AssistenteSocialController.createAssistenteSocial);
AssistenteRouter.get('/', AssistenteSocialController.getAllAssistentes);
AssistenteRouter.get('/:id', AssistenteSocialController.getAssistById);
AssistenteRouter.delete('/:id', AssistenteSocialController.deleteAssist);
AssistenteRouter.patch('/:id', AssistenteSocialController.editAssist);

export default AssistenteRouter;
