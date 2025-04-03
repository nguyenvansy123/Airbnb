import { responseSuccess } from "../common/helpers/response.helper.js";
import { usersService } from "../services/users.service.js";

export const usersController = {
   create: async function (req, res, next) {
      try {
         const result = await usersService.create(req);
         const response = responseSuccess(result, `Create users successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   findAll: async function (req, res, next) {
      try {
         const result = await usersService.findAll(req);
         const response = responseSuccess(result, `Get all userss successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   findOne: async function (req, res, next) {
      try {
         const result = await usersService.findOne(req);
         const response = responseSuccess(result, `Get users #${req.params.id} successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   update: async function (req, res, next) {
      try {
         const result = await usersService.update(req);
         const response = responseSuccess(result, `Update users #${req.params.id} successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   remove: async function (req, res, next) {
      try {
         const result = await usersService.remove(req);
         const response = responseSuccess(result, `Remove users #${req.params.id} successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   search: async function (req, res, next) {
      try {
         const result = await usersService.search(req);
         const response = responseSuccess(result, `Search users successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },
   searchNameUser: async function (req, res, next) {
      try {
         const result = await usersService.searchNameUser(req);
         const response = responseSuccess(result, `Search users successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },
   uploadAvatar: async function (req, res, next) {
      try {
         const result = await usersService.uploadAvatar(req);
         const response = responseSuccess(result, `Upload avatar successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   }
};