import { Router } from 'express';
import { FileController } from '../controllers/file.controller';

const fileRouter: Router = Router();

fileRouter.get('/', FileController.getFile);

export default fileRouter;
