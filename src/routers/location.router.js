import express from 'express';
import { locationController } from '../controllers/location.controller.js';
import uploadCloud from '../common/multer/cloud.multer.js';
import { protect } from '../common/middleware/protect.middleware.js';

const locationRouter = express.Router();

// Tạo route CRUD
locationRouter.get('/', locationController.findAll);
locationRouter.get('/phan-trang-tim-kiem', locationController.search);
locationRouter.get('/:id', locationController.findOne);
locationRouter.post('/', protect, uploadCloud.single("image"), locationController.create);
locationRouter.post('/upload-hinh-vitri/:id', protect, uploadCloud.single("image"), locationController.uploadImage);
locationRouter.put('/:id', protect, uploadCloud.single("image"), locationController.update);
locationRouter.delete('/:id', protect, locationController.remove);

export default locationRouter;