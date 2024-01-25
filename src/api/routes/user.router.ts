import { Router } from 'express';
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';
import { RoleNameEnum } from '../models';
import { UserController } from '../controllers/user.controller';

const userRouter: Router = Router();

userRouter.get('/', AuthenticationMiddleware.checkPermissions([RoleNameEnum.ADMIN]), UserController.getAll);
userRouter.get('/me', AuthenticationMiddleware.checkPermissions([]), UserController.getCurrent);
userRouter.get('/me/collections', AuthenticationMiddleware.checkPermissions([]), UserController.getMyCollections);
userRouter.get('/:id', UserController.getById);
userRouter.post('/', UserController.register);
userRouter.patch('/:id', AuthenticationMiddleware.checkPermissions([]), UserController.update);
userRouter.delete('/:id', AuthenticationMiddleware.checkPermissions([RoleNameEnum.ADMIN]), UserController.delete);

export default userRouter;
