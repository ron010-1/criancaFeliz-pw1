import {Router} from 'express';
import BeneficiarioController from '../controller/beneficiario.controller';
import {verifyToken} from '../middlewares/verifyJwt.middleware';

const BenefRouter = Router();
BenefRouter.use(verifyToken);

BenefRouter.get('/',verifyToken,BeneficiarioController.getBenefs);
BenefRouter.get('/:id',verifyToken, BeneficiarioController.getBenefById);
BenefRouter.patch('/:id',verifyToken, BeneficiarioController.editBenef);
BenefRouter.post('/', verifyToken,BeneficiarioController.createBenefs);
BenefRouter.delete('/:id', verifyToken,BeneficiarioController.deleteBenef);

export default BenefRouter;
