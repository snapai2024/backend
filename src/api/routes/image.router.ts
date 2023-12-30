import { Router } from 'express';
import { ImageController } from '../controllers/image.controller';
import multer from 'multer'
const upload = multer({dest: 'tmp'})

const imageRouter: Router = Router();

imageRouter.get('/:id', ImageController.getById);
imageRouter.post('/analyse', upload.single('file'), ImageController.analyse);
imageRouter.post('/', upload.single('file'), ImageController.create);

export default imageRouter;
