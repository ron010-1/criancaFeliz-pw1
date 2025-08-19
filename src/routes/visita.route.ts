import {Router} from 'express';
import VisitaController from '../controller/visita.controller';
import {verifyToken} from '../middlewares/verifyJwt.middleware';

const visitaRouter = Router();
visitaRouter.use(verifyToken);

visitaRouter.post('/', VisitaController.createVisita);
visitaRouter.get('/', VisitaController.getAllvisitas);

export default visitaRouter;
