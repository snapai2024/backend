import { Router } from 'express';
import userRouter from './user.router';
import authenticationRouter from './authentication.router';

const router: Router = Router();

router.use('/authenticate', authenticationRouter);
router.use('/user', userRouter);

export default router;
