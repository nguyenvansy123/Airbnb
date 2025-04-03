import { ACCESS_TOKEN_EXPIRED, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRED, REFRESH_TOKEN_SECRET } from "../common/constant/app.constant.js";
import getInfoData from "../common/util/getData.js";
import { BadRequestException, UnauthorizationException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const authService = {
    register: async (req, res, next) => {
        const { name, email, password, phone, birthday, gender } = req.body
        console.log({ name, email, password, phone, birthday, gender });

        const userExist = await prisma.nguoiDung.findFirst({
            where: { email }
        })

        if (userExist) {
            throw new BadRequestException('Email đã tồn tại')
        }

        const passHash = bcrypt.hashSync(password, 10);

        const userNew = await prisma.nguoiDung.create({
            data: {
                name,
                email,
                pass_word: passHash,
                phone,
                birth_day: birthday,
                gender,
                role: 'User'
            }
        })

        const data = getInfoData({ fileds: ['name', 'email'], object: userNew })
        return data

    },

    login: async (req, res, next) => {
        const { email, pass_word } = req.body


        const userExists = await prisma.nguoiDung.findFirst({
            where: { email }
        })

        if (!userExists) {
            throw new BadRequestException('Email không đúng')
        }

        const isPassword = bcrypt.compareSync(pass_word, userExists.pass_word)

        if (!isPassword) {
            throw new BadRequestException('Mật khẩu không đúng')
        }

        const tokens = authService.createToken(userExists.id);

        return tokens;
    },
    createToken: (userId) => {
        if (!userId) throw new BadRequestException(`Không có userId để tạo token`);

        const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRED });

        const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRED });

        return { accessToken, refreshToken };
    },
    refreshToken: async (req) => {
        const refreshToken = req.headers.authorization?.split(" ")[1];
        if (!refreshToken) throw new UnauthorizationException('Token không tồn tại')

        console.log(req.headers['x-access-token']);

        const accessToken = req.headers['x-access-token']
        if (!accessToken) throw new UnauthorizationException('Token không tồn tại')

        const decodeRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        const decodeAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, { ignoreExpiration: true });

        console.log({ decodeAccessToken, decodeRefreshToken });

        if (decodeAccessToken.userId !== decodeRefreshToken.userId) throw new UnauthorizationException('Cặp token không hợp lệ')

        const userExist = await prisma.users.findUnique({
            where: {
                user_id: decodeRefreshToken.userId
            }
        })

        if (!userExist) throw new UnauthorizationException('User không tồn tại')

        const tokens = authService.createToken(userExist.user_id);

        return tokens;
    },
    getInfo: async (req) => {
        delete req.user.pass_word
        return req.user;
    }

}

export default authService