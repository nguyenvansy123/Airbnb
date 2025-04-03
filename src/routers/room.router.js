import express from 'express';
import { roomController } from '../controllers/room.controller.js';
import { protect } from '../common/middleware/protect.middleware.js';
import uploadCloud from '../common/multer/cloud.multer.js';

const roomRouter = express.Router();

// Tạo route CRUD
roomRouter.post('/', protect, uploadCloud.single('image'), roomController.create);
roomRouter.get('/', roomController.findAll);
roomRouter.put('/:id', protect, uploadCloud.single('image'), roomController.update);
roomRouter.delete('/:id', protect, roomController.remove);
roomRouter.get('/lay-phong-theo-vi-tri', roomController.getRoomByLocation);
roomRouter.get('/phan-trang-tim-kiem', roomController.search);
roomRouter.get('/:id', roomController.findOne);
roomRouter.post('/upload-hinh-phong', protect, uploadCloud.single('image'), roomController.uploadImageRoom);

export default roomRouter;