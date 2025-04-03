import express from 'express';
import { bookingController } from '../controllers/booking.controller.js';

const bookingRouter = express.Router();

// Tạo route CRUD
bookingRouter.post('/', bookingController.create);
bookingRouter.get('/', bookingController.findAll);
bookingRouter.get('/:id', bookingController.findOne);
bookingRouter.put('/:id', bookingController.update);
bookingRouter.delete('/:id', bookingController.remove);
bookingRouter.get('/lay-dat-phong-theo-nguoi-dung/:MaNguoiDung', bookingController.getBookingByUser);

export default bookingRouter;