import { Router } from 'express';
import multer from 'multer'
import { CollectionController } from '../controllers/collection.controller';
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';
const upload = multer({dest: 'tmp'})

const collectionRouter: Router = Router();

collectionRouter.get('/:id', AuthenticationMiddleware.checkPermissions([]), CollectionController.getById);
collectionRouter.post('/', AuthenticationMiddleware.checkPermissions([]), upload.single('file'), CollectionController.create);
collectionRouter.delete('/:id', AuthenticationMiddleware.checkPermissions([]), CollectionController.delete);

export default collectionRouter;
