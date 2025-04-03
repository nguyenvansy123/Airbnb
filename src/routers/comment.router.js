import express from 'express';
import { commentController } from '../controllers/comment.controller.js';
import { protect } from '../common/middleware/protect.middleware.js';

const commentRouter = express.Router();

// Tạo route CRUD
commentRouter.post('/', protect, commentController.create);
commentRouter.get('/', commentController.findAll);
commentRouter.put('/:id', protect, commentController.update);
commentRouter.delete('/:id', protect, commentController.remove);
commentRouter.get('/lay-binh-luan-theo-phong/:MaPhong', commentController.findCommentByRoomId);

export default commentRouter;