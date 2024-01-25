import { Router } from 'express';
import { ImageController } from '../controllers/image.controller';
import multer from 'multer'
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';
const upload = multer({dest: 'tmp'})

const imageRouter: Router = Router();

imageRouter.get('/:id', AuthenticationMiddleware.checkPermissions([]), ImageController.getById);
imageRouter.post('/analyse', AuthenticationMiddleware.checkPermissions([]), upload.single('file'), ImageController.analyse);
imageRouter.post('/', AuthenticationMiddleware.checkPermissions([]), upload.single('file'), ImageController.create);
imageRouter.delete('/:id', AuthenticationMiddleware.checkPermissions([]), ImageController.delete);

export default imageRouter;
