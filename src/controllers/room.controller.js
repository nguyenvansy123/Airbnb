import { responseSuccess } from "../common/helpers/response.helper.js";
import { roomService } from "../services/room.service.js";

export const roomController = {
   create: async function (req, res, next) {
      try {
         const result = await roomService.create(req);
         const response = responseSuccess(result, `Create room successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   findAll: async function (req, res, next) {
      try {
         const result = await roomService.findAll(req);
         const response = responseSuccess(result, `Get all rooms successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   findOne: async function (req, res, next) {
      try {
         const result = await roomService.findOne(req);
         const response = responseSuccess(result, `Get room #${req.params.id} successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   update: async function (req, res, next) {
      try {
         const result = await roomService.update(req);
         const response = responseSuccess(result, `Update room #${req.params.id} successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   remove: async function (req, res, next) {
      try {
         const result = await roomService.remove(req);
         const response = responseSuccess(result, `Remove room #${req.params.id} successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },
   getRoomByLocation: async function (req, res, next) {
      try {
         const result = await roomService.getRoomByLocation(req);
         const response = responseSuccess(result, `Get room by location successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },
   search: async function (req, res, next) {
      try {
         const result = await roomService.search(req);
         const response = responseSuccess(result, `Search rooms successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },
   uploadImageRoom: async function (req, res, next) {
      try {
         const result = await roomService.uploadImageRoom(req);
         const response = responseSuccess(result, `Upload image room successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },
};