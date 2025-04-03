import { responseSuccess } from "../common/helpers/response.helper.js";
import { bookingService } from "../services/boking.service.js";

export const bookingController = {
   create: async function (req, res, next) {
      try {
         const result = await bookingService.create(req);
         const response = responseSuccess(result, `Create booking successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   findAll: async function (req, res, next) {
      try {
         const result = await bookingService.findAll(req);
         const response = responseSuccess(result, `Get all bookings successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   findOne: async function (req, res, next) {
      try {
         const result = await bookingService.findOne(req);
         const response = responseSuccess(result, `Get booking #${req.params.id} successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   update: async function (req, res, next) {
      try {
         const result = await bookingService.update(req);
         const response = responseSuccess(result, `Update booking #${req.params.id} successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   remove: async function (req, res, next) {
      try {
         const result = await bookingService.remove(req);
         const response = responseSuccess(result, `Remove booking #${req.params.id} successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },
   getBookingByUser: async function (req, res, next) {
      try {
         const result = await bookingService.getBookingByUser(req);
         const response = responseSuccess(result, `Get booking by user successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   }
};