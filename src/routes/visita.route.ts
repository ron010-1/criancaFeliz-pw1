import express, { Router } from 'express';
import VisitaController from '../controller/visita.controller';
import verifyToken from '../middlewares/jwt.middleware';

const visitaRouter = express.Router();

visitaRouter.post('/',verifyToken,VisitaController.createVisita);
visitaRouter.get('/',VisitaController.getAllvisitas);


export default visitaRouter;