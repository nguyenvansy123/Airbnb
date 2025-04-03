import { BadRequestException, NotFoundException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import { v2 as cloudinary } from 'cloudinary';
import { uploadCloud } from "../common/util/upload_clout.util.js";

export const locationService = {
   create: async function (req) {
      const { tenViTri, tinhThanh, quocGia } = req.body;
      const hinhAnh = req.file

      if (!tenViTri || !tinhThanh || !quocGia) {
         throw new BadRequestException("Thiếu thông tin cần thiết để tạo vị trí");
      }

      if (!hinhAnh) {
         throw new BadRequestException("Thiếu hình ảnh cho vị trí");
      }

      const secure_url = await uploadCloud(hinhAnh);

      const location = await prisma.viTri.create({
         data: {
            ten_vi_tri: tenViTri,
            tinh_thanh: tinhThanh,
            quoc_gia: quocGia,
            hinh_anh: secure_url
         }
      });
      return location;
   },

   findAll: async function (req) {
      const location = await prisma.viTri.findMany({
         orderBy: [
            {
               created_at: 'desc'
            }
         ]
      });
      return location;
   },

   findOne: async function (req) {
      const { id } = req.params;

      if (!id || isNaN(id)) throw new BadRequestException("ID không hợp lệ");

      const location = await prisma.viTri.findUnique({
         where: {
            id: parseInt(id)
         }
      });

      if (!location) throw new NotFoundException("Không tìm thấy vị trí nào với ID này");

      return location;
   },

   update: async function (req) {
      const { id } = req.params;
      const updateData = {};
      const { tenViTri, tinhThanh, quocGia } = req.body;
      const hinhAnh = req.file

      console.log('test', tenViTri, tinhThanh, quocGia, hinhAnh, id);


      if (!id || isNaN(id)) throw new BadRequestException("ID không hợp lệ");

      const locationExists = await prisma.viTri.findUnique({
         where: { id: parseInt(id) }
      });

      if (!locationExists) throw new NotFoundException("Không tìm thấy vị trí nào với ID này");

      if (tenViTri) updateData.ten_vi_tri = tenViTri;
      if (tinhThanh) updateData.tinh_thanh = tinhThanh;
      if (quocGia) updateData.quoc_gia = quocGia;
      if (hinhAnh) updateData.hinh_anh = await uploadCloud(hinhAnh);

      if (Object.keys(updateData).length === 0) {
         throw new BadRequestException("Không có dữ liệu cập nhật hợp lệ");
      }

      const location = await prisma.viTri.update({
         where: { id: parseInt(id) },
         data: updateData
      });

      return location;
   },

   remove: async function (req) {
      const { id } = req.params;
      if (!id || isNaN(id)) throw new BadRequestException("ID không hợp lệ");

      const locationExists = await prisma.viTri.findUnique({
         where: { id: parseInt(id) }
      });

      if (!locationExists) throw new NotFoundException("Không tìm thấy vị trí nào với ID này");

      const location = await prisma.viTri.delete({
         where: { id: parseInt(id) }
      });

      return location;
   },

   search: async function (req) {
      let { search, page, pageSize } = req.query;

      page = +page > 0 ? +page : 1;
      pageSize = +pageSize > 0 ? +pageSize : 10;
      search = search || ``;

      console.log('search', search);

      const skip = (page - 1) * pageSize;
      const totalItem = await prisma.viTri.count();
      const totalPage = Math.ceil(totalItem / pageSize);

      const whereSearch = search.trim() === '' ? {} : { ten_vi_tri: { contains: search } };

      const locations = await prisma.viTri.findMany({
         skip,
         take: pageSize,
         where: whereSearch,
         orderBy: [
            {
               created_at: 'desc'
            }
         ]
      });

      return locations;
   },

   uploadImage: async function (req) {
      const { id } = req.params;
      const hinhAnh = req.file
      
      if (!id || isNaN(id)) throw new BadRequestException("ID không hợp lệ");

      const locationExists = await prisma.viTri.findUnique({
         where: { id: parseInt(id) }
      });

      if (!locationExists) throw new NotFoundException("Không tìm thấy vị trí nào với ID này");

      if (!hinhAnh) throw new BadRequestException("Thiếu hình ảnh cho vị trí");

      const secure_url = await uploadCloud(hinhAnh);

      const location = await prisma.viTri.update({
         where: { id: parseInt(id) },
         data: {
            hinh_anh: secure_url
         }
      });

      return location;
   }
};