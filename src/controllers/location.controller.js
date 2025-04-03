import { responseSuccess } from "../common/helpers/response.helper.js";
import { locationService } from "../services/location.service.js";

export const locationController = {
   create: async function (req, res, next) {
      try {
         const result = await locationService.create(req);
         const response = responseSuccess(result, `Create location successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   findAll: async function (req, res, next) {
      try {
         const result = await locationService.findAll(req);
         const response = responseSuccess(result, `Get all locations successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   findOne: async function (req, res, next) {
      try {
         const result = await locationService.findOne(req);
         const response = responseSuccess(result, `Get location #${req.params.id} successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   update: async function (req, res, next) {
      try {
         const result = await locationService.update(req);
         const response = responseSuccess(result, `Update location #${req.params.id} successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   remove: async function (req, res, next) {
      try {
         const result = await locationService.remove(req);
         const response = responseSuccess(result, `Remove location #${req.params.id} successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   search: async function (req, res, next) {
      try {
         const result = await locationService.search(req);
         const response = responseSuccess(result, `Search locations successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },
   uploadImage: async function (req, res, next) {
      try {
         const result = await locationService.uploadImage(req);
         const response = responseSuccess(result, `Upload image successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   }
};