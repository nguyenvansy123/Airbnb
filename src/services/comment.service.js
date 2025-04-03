import { BadRequestException, NotFoundException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";

export const commentService = {
   create: async function (req) {
      const { maPhong, noiDung, saoBinhLuan } = req.body;

      const { id } = req.user;

      if (!maPhong || !noiDung) {
         throw new BadRequestException('Vui lòng nhập đầy đủ thông tin');
      }

      // Kiểm tra xem phòng có tồn tại không
      const room = await prisma.phong.findUnique({
         where: {
            id: maPhong
         }
      });

      if (!room) throw new NotFoundException('Phòng không tồn tại');

      const comment = await prisma.binhLuan.create({
         data: {
            ma_phong: maPhong,
            ma_nguoi_binh_luan: id,
            ngay_binh_luan: new Date(),
            noi_dung: noiDung,
            sao_binh_luan: saoBinhLuan || 0,
         }
      });


      return comment;
   },

   findAll: async function (req) {
      const comments = prisma.binhLuan.findMany({
         orderBy: [
            {
               created_at: 'desc'
            }
         ]
      });

      return comments;
   },
   update: async function (req) {
      const { id } = req.params;
      const { maPhong, noiDung, saoBinhLuan } = req.body;
      const updateComment = {};

      if (!maPhong || !noiDung) throw new BadRequestException('Vui lòng nhập đầy đủ thông tin');
      if (!id || isNaN(id)) throw new BadRequestException('ID không hợp lệ');

      if (maPhong) updateComment.ma_phong = maPhong;
      if (noiDung) updateComment.noi_dung = noiDung;
      if (saoBinhLuan) updateComment.sao_binh_luan = saoBinhLuan;

      if (Object.keys(updateComment).length === 0)    throw new BadRequestException("Không có dữ liệu cập nhật hợp lệ");

      // Kiểm tra xem phòng có tồn tại không
      const room = await prisma.phong.findUnique({
         where: {
            id: updateComment.ma_phong
         }
      });
      
      if (!room) throw new NotFoundException('Phòng không tồn tại');

      // Kiểm tra xem bình luận có tồn tại không
      const comment = await prisma.binhLuan.findUnique({
         where: {
            id: parseInt(id)
         }
      });

      if (!comment) throw new NotFoundException('Không tìm thấy bình luận nào với ID này');

      // Cập nhật bình luận
      const updatedComment = await prisma.binhLuan.update({
         where: {
            id: parseInt(id)
         },
         data: updateComment
      });

      return updatedComment;
   },

   remove: async function (req) {
      const { id } = req.params;
      if (!id || isNaN(id)) throw new BadRequestException('ID không hợp lệ');

      // Kiểm tra xem bình luận có tồn tại không
      const comment = await prisma.binhLuan.findUnique({
         where: {
            id: parseInt(id)
         }
      });
      if (!comment) throw new NotFoundException('Không tìm thấy bình luận nào với ID này');

      // Xóa bình luận
      await prisma.binhLuan.delete({
         where: {
            id: parseInt(id)
         }
      });

      return `This action removes a id: ${req.params.id} comment`;
   },
   findCommentByRoomId: async function (req) {
      const { MaPhong } = req.params;

      if (!MaPhong || isNaN(MaPhong)) throw new BadRequestException('mã phòng không hợp lệ');

      // Kiểm tra xem phòng có tồn tại không
      const room = await prisma.phong.findUnique({
         where: {
            id: parseInt(MaPhong)
         }
      });

      if (!room) throw new NotFoundException('Phòng không tồn tại');

      const comments = await prisma.binhLuan.findMany({
         where: {
            ma_phong: parseInt(MaPhong)
         },
         orderBy: [
            {
               created_at: 'desc'
            }
         ]
      });

      return comments;
   }
};