import { Router } from 'express';
import userRouter from './user.router';
import authenticationRouter from './authentication.router';
import imageRouter from './image.router';
import collectionRouter from './collection.router';
import fileRouter from './file.router';

const router: Router = Router();

router.use('/authenticate', authenticationRouter);
router.use('/user', userRouter);
router.use('/collection', collectionRouter);
router.use('/image', imageRouter);
router.use('/file', fileRouter);

export default router;
