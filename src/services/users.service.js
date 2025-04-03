import getInfoData from "../common/util/getData.js";
import { BadRequestException, NotFoundException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import bcrypt from 'bcrypt';
import { uploadCloud } from "../common/util/upload_clout.util.js";

export const usersService = {
   create: async function (req) {
      const { name, email, password, phone, birthday, gender } = req.body
      const avatar = req.file
      let secure_url

      if (avatar) {
         secure_url = await uploadCloud(avatar);
      }

      const userExist = await prisma.nguoiDung.findFirst({
         where: { email }
      })

      if (userExist) {
         throw new NotFoundException('Email đã tồn tại')
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
            role: 'User',
            avatar: secure_url,
         }
      })

      const data = getInfoData({ fileds: ['name', 'email', 'phone', 'birth_day', 'gender', 'avatar'], object: userNew })

      return data
   },

   findAll: async function (req) {
      const users = await prisma.nguoiDung.findMany();
      return users;
   },

   findOne: async function (req) {
      const { id } = req.params
      if (!id || isNaN(id)) throw new BadRequestException("ID không hợp lệ");

      const userExist = await prisma.nguoiDung.findUnique({
         where: {
            id: parseInt(id)
         }
      });

      if (!userExist) throw new NotFoundException("Không tìm thấy người dùng nào với ID này");

      return userExist;
   },

   update: async function (req) {
      const { id } = req.params
      const { name, email, phone, birthday, gender } = req.body
      const avatar = req.file
      const updateData = {}

      if (!id || isNaN(id)) throw new BadRequestException("ID không hợp lệ");

      const userExist = await prisma.nguoiDung.findUnique({
         where: {
            id: parseInt(id)
         }
      });

      if (!userExist) throw new NotFoundException("Không tìm thấy người dùng nào với ID này");

      if (avatar) {
         const secure_url = await uploadCloud(avatar);
         updateData.avatar = secure_url;
      }

      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (phone) updateData.phone = phone;
      if (birthday) updateData.birth_day = birthday;
      if (gender) updateData.gender = gender;

      if (!updateData) throw new BadRequestException("Không có dữ liệu nào để cập nhật");

      const userUpdate = await prisma.nguoiDung.update({
         where: {
            id: parseInt(id)
         },
         data: updateData
      })


      return userUpdate;
   },

   remove: async function (req) {
      const { id } = req.query
      console.log(id);

      if (!id || isNaN(id)) throw new BadRequestException("ID không hợp lệ");

      const userExist = await prisma.nguoiDung.findUnique({
         where: {
            id: parseInt(id)
         }
      });

      if (!userExist) throw new NotFoundException("Không tìm thấy người dùng nào với ID này");

      await prisma.nguoiDung.delete({
         where: {
            id: parseInt(id)
         }
      });


      return `This action removes a id: ${req.params.id} users`;
   },

   search: async function (req) {
      let { search, page, pageSize } = req.query;

      page = +page > 0 ? +page : 1;
      pageSize = +pageSize > 0 ? +pageSize : 10;
      search = search || ``;

      const skip = (page - 1) * pageSize;
      const totalItem = await prisma.nguoiDung.count();
      const totalPage = Math.ceil(totalItem / pageSize);

      const whereSearch = search.trim() === '' ? {} : { name: { contains: search } };

      const users = await prisma.nguoiDung.findMany({
         skip,
         take: pageSize,
         where: whereSearch,
         orderBy: [
            {
               created_at: 'desc'
            }
         ]
      });

      return users;
   },
   searchNameUser: async function (req) {
      let { name } = req.params;

      name = name || ``;

      const whereSearch = name.trim() === '' ? {} : { name: { contains: name } };

      const users = await prisma.nguoiDung.findMany({

         where: whereSearch,
         orderBy: [
            {
               created_at: 'desc'
            }
         ]
      });

      return users;
   },
   uploadAvatar: async function (req) {

      const avatar = req.file
      const { id } = req.user

      if (!avatar) throw new BadRequestException("Không có file nào được tải lên");

      const secure_url = await uploadCloud(avatar);

      const userUpdate = await prisma.nguoiDung.update({
         where: {
            id
         },
         data: {
            avatar: secure_url,
         }
      })

      return userUpdate;
   }

};