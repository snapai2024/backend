import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const authenticationRouter: Router = Router();

authenticationRouter.post('/', AuthController.login);

export default authenticationRouter;
