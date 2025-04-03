import { BadRequestException, NotFoundException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";

export const bookingService = {
    create: async function (req) {
        const { maPhong, ngayDen, ngayDi, soLuongKhach, maNguoiDat } = req.body;

        if (!ngayDen || !ngayDi || !soLuongKhach || !maNguoiDat) throw new BadRequestException('thông tin không được để trống');

        if (!maPhong || isNaN(maPhong)) throw new BadRequestException("maPhong không hợp lệ");

        // Kiểm tra xem phòng đã được đặt chưa
        const roomExist = await prisma.phong.findUnique({
            where: {
                id: +maPhong
            }
        });

        if (!roomExist) throw new NotFoundException('Khong tìm thấy phòng nào với ID này');

        const userExist = await prisma.nguoiDung.findUnique({
            where: {
                id: +maNguoiDat
            }
        });

        if (!userExist) throw new BadRequestException('Người đặt không tồn tại');

        // Kiểm tra xem phòng đã được đặt chưa
        const existingBooking = await prisma.datPhong.findFirst({
            where: {
                ma_phong: +maPhong,
                ngay_den: new Date(ngayDen),
                ngay_di: new Date(ngayDi)
            }
        });

        if (existingBooking) throw new BadRequestException('Phòng đã được đặt trong khoảng thời gian này');


        const booking = await prisma.datPhong.create({
            data: {
                ma_phong: +maPhong,
                ngay_den: new Date(ngayDen),
                ngay_di: new Date(ngayDi),
                so_luong_khach: +soLuongKhach,
                ma_nguoi_dat: +maNguoiDat
            }
        });

        return booking;
    },

    findAll: async function (req) {
        const booking = await prisma.datPhong.findMany({
            orderBy: [
                {
                    created_at: 'desc'
                }
            ]
        });

        return booking;
    },

    findOne: async function (req) {
        const { id } = req.params;
        if (!id || isNaN(id)) throw new BadRequestException('ID không hợp lệ');

        // Kiểm tra xem phòng đã được đặt chưa
        const booking = await prisma.datPhong.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!booking) throw new NotFoundException('Không tìm thấy booking nào với ID này');

        return booking;
    },

    update: async function (req) {
        const { id } = req.params;
        const { maPhong, ngayDen, ngayDi, soLuongKhach, maNguoiDat } = req.body;
        const updateBooking = {};

        if (!id || isNaN(id)) throw new BadRequestException('ID không hợp lệ');

        // Kiểm tra xem phòng đã được đặt chưa
        const booking = await prisma.datPhong.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!booking) throw new NotFoundException('Không tìm thấy booking nào với ID này');


        if (maPhong) updateBooking.ma_phong = maPhong;
        if (ngayDen) updateBooking.ngay_den = new Date(ngayDen);
        if (ngayDi) updateBooking.ngay_di = new Date(ngayDi);
        if (soLuongKhach) updateBooking.so_luong_khach = soLuongKhach;
        if (maNguoiDat) updateBooking.ma_nguoi_dat = maNguoiDat;

        if (Object.keys(updateBooking).length === 0) {
            throw new BadRequestException("Không có dữ liệu cập nhật hợp lệ");
        }

        const updatedBooking = await prisma.datPhong.update({
            where: { id: parseInt(id) },
            data: updateBooking
        });

        return updatedBooking;
    },

    remove: async function (req) {
        const { id } = req.params;

        if (!id || isNaN(id)) throw new BadRequestException('ID không hợp lệ');
        // Kiểm tra xem phòng đã được đặt chưa
        const booking = await prisma.datPhong.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!booking) throw new NotFoundException('Không tìm thấy booking nào với ID này');

        // Xóa booking
        await prisma.datPhong.delete({
            where: {
                id: parseInt(id)
            }
        });

        return `This action removes a id: ${req.params.id} booking`;
    },
    getBookingByUser: async function (req) {
        const { MaNguoiDung } = req.params;

        if (!MaNguoiDung || isNaN(MaNguoiDung)) throw new BadRequestException('ID người dùng không hợp lệ');

        // Kiểm tra xem người đặt có tồn tại không
        const userExist = await prisma.nguoiDung.findUnique({
            where: {
                id: +MaNguoiDung
            }
        });

        if (!userExist) throw new NotFoundException('Người dung không tồn tại');

        const bookings = await prisma.datPhong.findMany({
            where: {
                ma_nguoi_dat: +MaNguoiDung
            }
        });

        return bookings;
    }
};