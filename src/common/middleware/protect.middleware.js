import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../constant/app.constant.js';
import prisma from '../prisma/init.prisma.js';
import { UnauthorizationException } from '../helpers/error.helper.js';

export const protect = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1];

        if (!accessToken)
            throw new UnauthorizationException('Token không tồn tại')

        const decode = jwt.verify(accessToken, ACCESS_TOKEN_SECRET)

        const user = await prisma.nguoiDung.findUnique({
            where: { id: decode.userId }
        })

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};