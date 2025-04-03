import express from 'express';
import { usersController } from '../controllers/users.controller.js';
import uploadCloud from '../common/multer/cloud.multer.js';
import { protect } from '../common/middleware/protect.middleware.js';

const usersRouter = express.Router();

// Tạo route CRUD
usersRouter.post('/', uploadCloud.single('avatar'), usersController.create);
usersRouter.get('/', usersController.findAll);
usersRouter.get('/phan-trang-tim-kiem', usersController.search);
usersRouter.get('/:id', usersController.findOne);
usersRouter.put('/:id', uploadCloud.single('avatar'), usersController.update);
usersRouter.delete('/', usersController.remove);
usersRouter.get('/search/:name', usersController.searchNameUser);
usersRouter.post('/upload-avatar', protect, uploadCloud.single('avatar'), usersController.uploadAvatar);

export default usersRouter;