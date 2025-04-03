import { responseSuccess } from "../common/helpers/response.helper.js";
import authService from "../services/auth.service.js";



const authController = {
    register: async (req, res, next) => {
        try {
            const userNew = await authService.register(req, res, next);
            const resData = responseSuccess(userNew, 'Register success', 200)
            res.status(resData.code).json(resData);
        } catch (error) {
            next(error)
        }

    },
    login: async (req, res, next) => {
        try {
            const data = await authService.login(req, res, next);
            const resData = responseSuccess(data, 'Login success', 200)
            res.status(resData.code).json(resData);
        } catch (error) {
            next(error)
        }
    },
    facebookLogin: async (req, res, next) => {
        try {
            const data = await authService.facebookLogin(req, res, next);
            const resData = responseSuccess(data, 'Login success', 200)
            res.status(resData.code).json(resData);
        } catch (error) {
            next(error)
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const data = await authService.refreshToken(req, res, next);
            const resData = responseSuccess(data, 'Refresh Token success', 200)
            res.status(resData.code).json(resData);
        } catch (error) {
            next(error)
        }
    },
    getInfo: async (req, res, next) => {
        try {
            const data = await authService.getInfo(req, res, next);
            const resData = responseSuccess(data, 'Get info success', 200)
            res.status(resData.code).json(resData);
        } catch (error) {
            next(error)
        }
    }


}

export default authController