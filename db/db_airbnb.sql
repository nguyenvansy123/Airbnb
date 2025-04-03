/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `BinhLuan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_phong` int NOT NULL,
  `ma_nguoi_binh_luan` int NOT NULL,
  `ngay_binh_luan` datetime NOT NULL,
  `noi_dung` text NOT NULL,
  `sao_binh_luan` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ma_nguoi_binh_luan` (`ma_nguoi_binh_luan`),
  CONSTRAINT `BinhLuan_ibfk_1` FOREIGN KEY (`ma_nguoi_binh_luan`) REFERENCES `NguoiDung` (`id`) ON DELETE CASCADE,
  CONSTRAINT `BinhLuan_chk_1` CHECK ((`sao_binh_luan` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `DatPhong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_phong` int NOT NULL,
  `ma_nguoi_dat` int NOT NULL,
  `ngay_den` datetime NOT NULL,
  `ngay_di` datetime NOT NULL,
  `so_luong_khach` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ma_phong` (`ma_phong`),
  KEY `ma_nguoi_dat` (`ma_nguoi_dat`),
  CONSTRAINT `DatPhong_ibfk_1` FOREIGN KEY (`ma_phong`) REFERENCES `Phong` (`id`) ON DELETE CASCADE,
  CONSTRAINT `DatPhong_ibfk_2` FOREIGN KEY (`ma_nguoi_dat`) REFERENCES `NguoiDung` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `NguoiDung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass_word` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `birth_day` varchar(20) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `role` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Phong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_phong` varchar(255) NOT NULL,
  `khach` int NOT NULL,
  `phong_ngu` int NOT NULL,
  `giuong` int NOT NULL,
  `phong_tam` int NOT NULL,
  `mo_ta` text,
  `gia_tien` int NOT NULL,
  `may_giat` tinyint(1) DEFAULT '0',
  `ban_la` tinyint(1) DEFAULT '0',
  `tivi` tinyint(1) DEFAULT '0',
  `dieu_hoa` tinyint(1) DEFAULT '0',
  `wifi` tinyint(1) DEFAULT '0',
  `bep` tinyint(1) DEFAULT '0',
  `do_xe` tinyint(1) DEFAULT '0',
  `ho_boi` tinyint(1) DEFAULT '0',
  `ban_ui` tinyint(1) DEFAULT '0',
  `hinh_anh` varchar(255) DEFAULT NULL,
  `ma_vi_tri` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `vi_tri_id` (`ma_vi_tri`),
  CONSTRAINT `Phong_ibfk_1` FOREIGN KEY (`ma_vi_tri`) REFERENCES `ViTri` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ViTri` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_vi_tri` varchar(255) NOT NULL,
  `tinh_thanh` varchar(255) NOT NULL,
  `quoc_gia` varchar(255) NOT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `BinhLuan` (`id`, `ma_phong`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`, `created_at`, `updated_at`) VALUES
(6, 2, 4, '2025-04-03 14:12:06', 'ádasdasdas', 1, '2025-04-03 14:12:06', '2025-04-03 14:12:06');
INSERT INTO `BinhLuan` (`id`, `ma_phong`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`, `created_at`, `updated_at`) VALUES
(7, 1, 14, '2025-04-03 16:13:51', 'cực tệ', 1, '2025-04-03 16:13:51', '2025-04-03 16:13:51');


INSERT INTO `DatPhong` (`id`, `ma_phong`, `ma_nguoi_dat`, `ngay_den`, `ngay_di`, `so_luong_khach`, `created_at`, `updated_at`) VALUES
(6, 3, 5, '2025-04-03 12:41:26', '2025-04-03 12:41:26', 1, '2025-04-03 13:08:59', '2025-04-03 13:08:59');
INSERT INTO `DatPhong` (`id`, `ma_phong`, `ma_nguoi_dat`, `ngay_den`, `ngay_di`, `so_luong_khach`, `created_at`, `updated_at`) VALUES
(7, 3, 4, '2025-04-03 12:41:26', '2025-04-03 12:41:26', 1, '2025-04-03 13:10:15', '2025-04-03 13:10:15');
INSERT INTO `DatPhong` (`id`, `ma_phong`, `ma_nguoi_dat`, `ngay_den`, `ngay_di`, `so_luong_khach`, `created_at`, `updated_at`) VALUES
(8, 3, 5, '2025-04-03 12:41:26', '2025-04-03 12:41:26', 1, '2025-04-03 13:10:23', '2025-04-03 13:10:23');
INSERT INTO `DatPhong` (`id`, `ma_phong`, `ma_nguoi_dat`, `ngay_den`, `ngay_di`, `so_luong_khach`, `created_at`, `updated_at`) VALUES
(9, 3, 5, '2025-04-03 12:41:26', '2025-04-03 12:41:26', 1, '2025-04-03 13:10:25', '2025-04-03 13:10:25'),
(11, 1, 5, '2025-04-03 00:00:00', '2025-04-11 00:00:00', 10, '2025-04-03 13:13:56', '2025-04-03 13:26:54');

INSERT INTO `NguoiDung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `created_at`, `updated_at`, `avatar`) VALUES
(4, 'ngueynva', 'ccdd@gmail.com', '$2b$10$cptDzz/WEUywCyqvSozsRua4OuEtFVOEKKTzojBqMiV.TFiTxIiVi', '123654645', '30/03/99', 'nam', 'user', '2025-03-15 18:48:57', '2025-04-03 15:48:16', 'https://res.cloudinary.com/doi8u1atp/image/upload/v1743611441/images/bsqsqxmerg8kxnedoxlp.jpg');
INSERT INTO `NguoiDung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `created_at`, `updated_at`, `avatar`) VALUES
(5, 'ngueynva', 'abc000@gmail.com', '$2b$10$mJ3Wrd5vsfKRMsJQFs2nWO5Z5hE92t47SsyTf4ZsXTjLYnOzaVoti', '123654645', '30/03/99', 'k co', 'User', '2025-03-30 12:08:36', '2025-04-03 16:01:04', NULL);
INSERT INTO `NguoiDung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `created_at`, `updated_at`, `avatar`) VALUES
(6, 'NGUYENVANSY aa', 'abc112223@gmail.com', '$2b$10$fGubfG7hIrz7bJMhxDUNdO0amcirZ0Cvpe3GmS0RTLTU7pRv340bi', '09865466', '30/03/1999', 'nam', 'User', '2025-03-30 12:09:56', '2025-03-30 12:09:56', NULL);
INSERT INTO `NguoiDung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `created_at`, `updated_at`, `avatar`) VALUES
(7, 'NGUYENVANSY aa', 'abc11222qưeq3@gmail.com', '$2b$10$//cQv8iE0p/IVnJIhgzvEO9FniZxd/dEsvXlIVgZJNYAkNMYsDIM2', '09865466', '30/03/1999', 'nam', 'User', '2025-03-30 17:03:10', '2025-03-30 17:03:10', NULL),
(8, 'NGUYENVANSY aa', 'abc1122@gmail.com', '$2b$10$fD.ot5JovzSHrqY8qukxwep/iAYiBufcxN6CARPjvzyU9jrRFOsIq', '09865466', '30/03/1999', 'nam', 'User', '2025-03-30 17:07:52', '2025-03-30 17:07:52', NULL),
(9, 'NGUYENVANSY aa', 'abc112222@gmail.com', '$2b$10$X0wVlKbcVlYSO7hW2GkUh.apILTreg3hdIRFrb/c.WQJJVY9yDaTS', '09865466', '30/03/1999', 'nam', 'User', '2025-03-30 17:08:08', '2025-03-30 17:08:08', 'https://res.cloudinary.com/doi8u1atp/image/upload/v1743354486/images/agub5ko5qfms6nwxlyvp.jpg'),
(10, 'ngueynvaâ', 'ccdd222@gmail.com', '$2b$10$ZzfsxT4vUL4pCNfWPNCxE.caREUWAbRx21W3GTrbqooauZhVBiAue', '123654645', '30/03/99', 'k co', 'User', '2025-04-03 15:45:37', '2025-04-03 16:08:36', 'https://res.cloudinary.com/doi8u1atp/image/upload/v1743695349/images/vc645banddeqqlnovboy.jpg'),
(13, 'NGUYENVANSY aa', 'abc11222cc2@gmail.com', '$2b$10$59faG5304ICWzQtVK5/dsucsctJGAEZ64Vr2ZD.XAnMJrRmEsDI5S', '09865466', '30/03/1999', 'nam', 'User', '2025-04-03 15:58:54', '2025-04-03 15:58:54', 'https://res.cloudinary.com/doi8u1atp/image/upload/v1743695933/images/syekshpw4oljgpkkpi6r.jpg'),
(14, 'NGUYENVANSY', 'abcáds@gmail.com', '$2b$10$JuoDmJL/QCPEu70tXoMisOsHh3ZRJi7ScYn2xc3p9iIH.RjORV9hK', '09865466', '30/03/1999', 'nam', 'User', '2025-04-03 16:05:55', '2025-04-03 16:09:05', 'https://res.cloudinary.com/doi8u1atp/image/upload/v1743696544/images/ppleap2nqkfghbcfu0iy.jpg'),
(15, 'sdasdas', 'abc1009@gmail.com', '$2b$10$xDnJRIjTB6bfIFxDL1lsIOuqIAMwoyIqAI2/frYkMv/Cye.woRHW2', '09865466', '30/03/1999', 'nam', 'User', '2025-04-03 16:08:03', '2025-04-03 16:08:03', 'https://res.cloudinary.com/doi8u1atp/image/upload/v1743696482/images/xrbzyzamambzh7ssi3vk.jpg');

INSERT INTO `Phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `ma_vi_tri`, `created_at`, `updated_at`) VALUES
(1, 'Phòng Deluxe Quận 1', 10, 10, 10, 10, 'ban', 100000000, 0, 0, 0, 0, 1, 1, 1, 1, 1, 'https://res.cloudinary.com/doi8u1atp/image/upload/v1743696672/images/a19rr7fh6iffxh3yiinx.jpg', 1, '2025-03-09 11:58:26', '2025-04-03 16:11:12');
INSERT INTO `Phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `ma_vi_tri`, `created_at`, `updated_at`) VALUES
(2, 'Căn hộ Studio Ba Đình', 4, 2, 2, 1, 'Căn hộ tiện nghi, gần Lăng Bác', 700000, 1, 0, 1, 1, 1, 1, 1, 0, 0, 'studio_badinh.jpg', 2, '2025-03-09 11:58:26', '2025-03-09 11:58:26');
INSERT INTO `Phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `ma_vi_tri`, `created_at`, `updated_at`) VALUES
(3, 'Nhà Nghỉ Shinjuku', 3, 1, 1, 1, 'Nhà nghỉ sạch sẽ, gần ga Shinjuku', 1200000, 0, 0, 1, 1, 1, 1, 1, 1, 1, 'shinjuku_hotel.jpg', NULL, '2025-03-09 11:58:26', '2025-03-09 11:58:26');
INSERT INTO `Phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `ma_vi_tri`, `created_at`, `updated_at`) VALUES
(7, 'test23', 2, 2, 1, 0, 'đầy đủ tiện nghi', 10000, 1, 1, 1, 1, 1, 0, 0, 0, 1, 'https://res.cloudinary.com/doi8u1atp/image/upload/v1743696592/images/ti6kkh6f4m1uaq1ttgsc.jpg', 1, '2025-04-03 16:09:53', '2025-04-03 16:09:53');

INSERT INTO `ViTri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`, `created_at`, `updated_at`) VALUES
(1, 'Quận 1', 'Hồ Chí Minh', 'Việt Nam', 'quan1.jpg', '2025-03-09 11:58:26', '2025-03-09 11:58:26');
INSERT INTO `ViTri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`, `created_at`, `updated_at`) VALUES
(2, 'Ba Đình', 'Hà Nội', 'Việt Nam', 'https://res.cloudinary.com/doi8u1atp/image/upload/v1743695908/images/dadajig0o5bymciwaehd.jpg', '2025-03-09 11:58:26', '2025-04-03 15:58:28');
INSERT INTO `ViTri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`, `created_at`, `updated_at`) VALUES
(4, 'quận 2', 'Hồ chí minh', 'VN', 'abc.jpg', '2025-03-09 14:38:37', '2025-03-09 14:38:37');
INSERT INTO `ViTri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`, `created_at`, `updated_at`) VALUES
(8, 'ở đâu đó', 'bắc linh', 'vn', 'https://res.cloudinary.com/doi8u1atp/image/upload/v1743695229/images/neuhrwipxulrikp535qr.jpg', '2025-03-30 04:29:38', '2025-04-03 15:47:09'),
(9, 'asda', 'zxczxc', 'vn', 'https://res.cloudinary.com/doi8u1atp/image/upload/v1743695177/images/yfrpyqtvgsqpp9shehry.jpg', '2025-04-03 15:46:18', '2025-04-03 15:46:18'),
(10, 'asda', 'zxczxc', 'vn', 'https://res.cloudinary.com/doi8u1atp/image/upload/v1743696445/images/hiwbvamnq1eqzozd87rj.jpg', '2025-04-03 15:57:28', '2025-04-03 16:07:26');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;