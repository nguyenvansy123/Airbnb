import express from 'express';
import locationRouter from './location.router.js';
import authRouter from './auth.router.js';
import usersRouter from './users.router.js';
import roomRouter from './room.router.js';
import bookingRouter from './booking.router.js';
import commentRouter from './comment.router.js';

const rootRouter = express.Router();

rootRouter.use('/api/auth', authRouter);
rootRouter.use('/api/vi-tri', locationRouter);
rootRouter.use('/api/users', usersRouter);
rootRouter.use('/api/phong-thue', roomRouter);
rootRouter.use('/api/dat-phong', bookingRouter);
rootRouter.use('/api/binh-luan', commentRouter);

export default rootRouter;