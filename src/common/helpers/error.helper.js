
import { responseError } from "./response.helper.js";
import jwt from 'jsonwebtoken';
import multer from 'multer';

export const handleError = (err, req, res, next) => {
    if (err instanceof jwt.JsonWebTokenError) {
        err.code = 401
    }

    if (err instanceof jwt.TokenExpiredError) {
        err.code = 403
    }

    if (err instanceof multer.MulterError) {
        err.code = 400;
    }

    const resData = responseError(err.message, err.code, err.stack)
    res.status(resData.code).json(resData)
}

export class BadRequestException extends Error {
    constructor(message = `BadRequestException`) {
        super(message)
        this.code = 400
    }
}

export class ForbiddenException extends Error {
    constructor(message = `ForbiddenException`) {
        super(message)
        this.code = 403
    }
}

export class UnauthorizationException extends Error {
    constructor(message = `UnauthorizationException`) {
        super(message)
        this.code = 401
    }
}

export class NotFoundException extends Error {
    constructor(message = `NotFoundException`) {
        super(message);
        this.code = 404;
    }
}