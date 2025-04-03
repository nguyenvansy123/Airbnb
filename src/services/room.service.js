import { BadRequestException, NotFoundException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import { uploadCloud } from "../common/util/upload_clout.util.js";

export const roomService = {
    create: async function (req) {
        const {
            tenPhong,
            khach,
            phongNgu,
            giuong,
            phongTam,
            moTa,
            giaTien,
            mayGiat,
            banLa,
            tivi,
            dieuHoa,
            wifi,
            bep,
            doXe,
            hoBoi,
            banUi,
            maViTri
        } = req.body;
        const hinhAnh = req.file;

        let secure_url;

        if (!tenPhong || !khach || !phongNgu || !giuong || !phongTam || !moTa || !giaTien || !mayGiat || !banLa || !tivi || !dieuHoa || !wifi || !bep || !doXe || !hoBoi || !banUi || !maViTri) {
            throw new BadRequestException('Thông tin không được để trống');
        }

        if (!hinhAnh) throw new BadRequestException('Hình ảnh không được để trống');

        secure_url = await uploadCloud(hinhAnh);

        // Kiểm tra xem vị trí có tồn tại không
        const locationExist = await prisma.viTri.findUnique({
            where: {
                id: +maViTri
            }
        });

        if (!locationExist) throw new NotFoundException('Vị trí không tồn tại');

        const newRoom = await prisma.phong.create({
            data: {
                ten_phong: tenPhong,
                khach: +khach,
                phong_ngu: +phongNgu,
                giuong: +giuong,
                phong_tam: +phongTam,
                mo_ta: moTa,
                gia_tien: +giaTien,
                may_giat: roomService.parseBoolean(mayGiat),
                ban_la: roomService.parseBoolean(banLa),
                tivi: roomService.parseBoolean(tivi),
                dieu_hoa: roomService.parseBoolean(dieuHoa),
                wifi: roomService.parseBoolean(wifi),
                bep: roomService.parseBoolean(bep),
                do_xe: roomService.parseBoolean(doXe),
                ho_boi: roomService.parseBoolean(hoBoi),
                ban_ui: roomService.parseBoolean(banUi),
                hinh_anh: secure_url,
                ma_vi_tri: +maViTri
            }
        });
        return newRoom;
    },

    findAll: async function (req) {
        const rooms = await prisma.phong.findMany({
            orderBy: [
                {
                    created_at: 'desc'
                }
            ]
        });
        return rooms;
    },

    findOne: async function (req) {
        const { id } = req.params;
        if (!id || isNaN(id)) throw new BadRequestException('ID không hợp lệ');

        // Kiểm tra xem phòng có tồn tại không
        const room = await prisma.phong.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!room) throw new NotFoundException('Không tìm thấy phòng nào với ID này');

        return room;
    },

    update: async function (req) {
        const {
            tenPhong,
            khach,
            phongNgu,
            giuong,
            phongTam,
            moTa,
            giaTien,
            mayGiat,
            banLa,
            tivi,
            dieuHoa,
            wifi,
            bep,
            doXe,
            hoBoi,
            banUi,
            maViTri
        } = req.body;
        const hinhAnh = req.file;
        const { id } = req.params;
        const updateRoom = {};

        if (!id || isNaN(id)) throw new BadRequestException('ID không hợp lệ');
        // Kiểm tra xem phòng có tồn tại không
        const room = await prisma.phong.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!room) throw new BadRequestException('Không tìm thấy phòng nào với ID này');

        //kiểm tra các biến có tồn tại không rồi gán vào updateRoom
        if (tenPhong) updateRoom.ten_phong = tenPhong;
        if (khach) updateRoom.khach = +khach;
        if (phongNgu) updateRoom.phong_ngu = +phongNgu;
        if (giuong) updateRoom.giuong = +giuong;
        if (phongTam) updateRoom.phong_tam = +phongTam;
        if (moTa) updateRoom.mo_ta = moTa;
        if (giaTien) updateRoom.gia_tien = +giaTien;
        if (mayGiat) updateRoom.may_giat = roomService.parseBoolean(mayGiat);
        if (banLa) updateRoom.ban_la = roomService.parseBoolean(banLa);
        if (tivi) updateRoom.tivi = roomService.parseBoolean(tivi);
        if (dieuHoa) updateRoom.dieu_hoa = roomService.parseBoolean(dieuHoa);
        if (wifi) updateRoom.wifi = roomService.parseBoolean(wifi);
        if (bep) updateRoom.bep = roomService.parseBoolean(bep);
        if (doXe) updateRoom.do_xe = roomService.parseBoolean(doXe);
        if (hoBoi) updateRoom.ho_boi = roomService.parseBoolean(hoBoi);
        if (banUi) updateRoom.ban_ui = roomService.parseBoolean(banUi);
        if (maViTri) updateRoom.ma_vi_tri = +maViTri;
        if (hinhAnh) updateRoom.hinh_anh = await uploadCloud(hinhAnh);

        if (Object.keys(updateRoom).length === 0) throw new BadRequestException('Không có thông tin nào để cập nhật');

        const updatedRoom = await prisma.phong.update({
            where: {
                id: parseInt(id)
            },
            data: updateRoom
        });
        return updatedRoom;
        // return `This action updates a id: ${req.params.id} room`;
    },

    remove: async function (req) {
        const { id } = req.params;
        if (!id || isNaN(id)) throw new BadRequestException('ID không hợp lệ');
        // Kiểm tra xem phòng có tồn tại không
        const room = await prisma.phong.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!room) throw new BadRequestException('Không tìm thấy phòng nào với ID này');

        // Xóa phòng
        await prisma.phong.delete({
            where: {
                id: parseInt(id)
            }
        });

        return `This action removes a id: ${req.params.id} room`;
    },

    getRoomByLocation: async function (req) {
        const { maViTri } = req.query;

        if (!maViTri) throw new BadRequestException('Vị trí không được để trống');

        // Kiểm tra xem vị trí có tồn tại không
        const locationExist = await prisma.viTri.findUnique({
            where: {
                id: +maViTri
            }
        });

        if (!locationExist) throw new NotFoundException('Vị trí không tồn tại');


        const rooms = await prisma.phong.findMany({
            where: {
                ma_vi_tri: +maViTri
            }
        });

        return rooms;
    },

    search: async function (req) {
        let { search, page, pageSize } = req.query;

        page = +page > 0 ? +page : 1;
        pageSize = +pageSize > 0 ? +pageSize : 10;
        search = search || ``;

        const skip = (page - 1) * pageSize;
        const totalItem = await prisma.phong.count();
        const totalPage = Math.ceil(totalItem / pageSize);

        const whereSearch = search.trim() === '' ? {} : { ten_phong: { contains: search } };

        const rooms = await prisma.phong.findMany({
            skip,
            take: pageSize,
            where: whereSearch,
            orderBy: [
                {
                    created_at: 'desc'
                }
            ]
        });

        return rooms;
    },

    uploadImageRoom: async function (req) {
        const { maPhong } = req.query;
        const hinhAnh = req.file;

        if (!maPhong || isNaN(maPhong)) throw new BadRequestException('maPhong không hợp lệ');

        if (!hinhAnh) throw new BadRequestException('Hình ảnh không được để trống');

        // Kiểm tra xem phòng có tồn tại không
        const room = await prisma.phong.findUnique({
            where: {
                id: parseInt(maPhong)
            }
        });

        if (!room) throw new NotFoundException('Không tìm thấy phòng nào với ID này');

        const secure_url = await uploadCloud(hinhAnh);
        // Cập nhật hình ảnh phòng
        const updatedRoom = await prisma.phong.update({
            where: {
                id: parseInt(maPhong)
            },
            data: {
                hinh_anh: secure_url
            }
        });
        return updatedRoom;
    },
    parseBoolean: (value) => {
        return value === "true"; // Chuyển "true" thành true, mọi giá trị khác thành false
    }
};