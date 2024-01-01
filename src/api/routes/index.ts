import { Router } from 'express';
import userRouter from './user.router';
import authenticationRouter from './authentication.router';
import imageRouter from './image.router';

const router: Router = Router();

router.use('/authenticate', authenticationRouter);
router.use('/user', userRouter);
router.use('/image', imageRouter);

export default router;
