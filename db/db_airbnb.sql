CREATE TABLE ViTri (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten_vi_tri VARCHAR(255) NOT NULL,
    tinh_thanh VARCHAR(255) NOT NULL,
    quoc_gia VARCHAR(255) NOT NULL,
    hinh_anh VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Phong (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten_phong VARCHAR(255) NOT NULL,
    khach INT NOT NULL,
    phong_ngu INT NOT NULL,
    giuong INT NOT NULL,
    phong_tam INT NOT NULL,
    mo_ta TEXT,
    gia_tien INT NOT NULL,
    may_giat BOOLEAN DEFAULT FALSE,
    ban_la BOOLEAN DEFAULT FALSE,
    tivi BOOLEAN DEFAULT FALSE,
    dieu_hoa BOOLEAN DEFAULT FALSE,
    wifi BOOLEAN DEFAULT FALSE,
    bep BOOLEAN DEFAULT FALSE,
    do_xe BOOLEAN DEFAULT FALSE,
    ho_boi BOOLEAN DEFAULT FALSE,
    ban_ui BOOLEAN DEFAULT FALSE,
    hinh_anh VARCHAR(255),
    vi_tri_id INT,
    FOREIGN KEY (vi_tri_id) REFERENCES ViTri(id) ON DELETE SET NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE NguoiDung (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    pass_word VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    birth_day VARCHAR(20),
    gender VARCHAR(10),
    role VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE DatPhong (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ma_phong INT NOT NULL,
    ma_nguoi_dat INT NOT NULL,
    ngay_den DATETIME NOT NULL,
    ngay_di DATETIME NOT NULL,
    so_luong_khach INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ma_phong) REFERENCES Phong(id) ON DELETE CASCADE,
    FOREIGN KEY (ma_nguoi_dat) REFERENCES NguoiDung(id) ON DELETE CASCADE
);

CREATE TABLE BinhLuan (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ma_cong_viec INT NOT NULL,
    ma_nguoi_binh_luan INT NOT NULL,
    ngay_binh_luan DATETIME NOT NULL,
    noi_dung TEXT NOT NULL,
    sao_binh_luan INT CHECK (sao_binh_luan BETWEEN 1 AND 5),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ma_nguoi_binh_luan) REFERENCES NguoiDung(id) ON DELETE CASCADE
);


-- Dữ liệu mẫu cho bảng ViTri
INSERT INTO ViTri (ten_vi_tri, tinh_thanh, quoc_gia, hinh_anh) VALUES
('Quận 1', 'Hồ Chí Minh', 'Việt Nam', 'quan1.jpg'),
('Ba Đình', 'Hà Nội', 'Việt Nam', 'badinh.jpg'),
('Shinjuku', 'Tokyo', 'Nhật Bản', 'shinjuku.jpg');

-- Dữ liệu mẫu cho bảng Phong
INSERT INTO Phong (ten_phong, khach, phong_ngu, giuong, phong_tam, mo_ta, gia_tien, may_giat, ban_la, tivi, dieu_hoa, wifi, bep, do_xe, ho_boi, ban_ui, hinh_anh, vi_tri_id)
VALUES 
('Phòng Deluxe Quận 1', 2, 1, 1, 1, 'Phòng rộng rãi, view đẹp trung tâm Quận 1', 500000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, 'deluxe_q1.jpg', 1),
('Căn hộ Studio Ba Đình', 4, 2, 2, 1, 'Căn hộ tiện nghi, gần Lăng Bác', 700000, TRUE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, 'studio_badinh.jpg', 2),
('Nhà Nghỉ Shinjuku', 3, 1, 1, 1, 'Nhà nghỉ sạch sẽ, gần ga Shinjuku', 1200000, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'shinjuku_hotel.jpg', 3);

-- Dữ liệu mẫu cho bảng NguoiDung
INSERT INTO NguoiDung (name, email, pass_word, phone, birth_day, gender, role)
VALUES 
('Nguyễn Văn A', 'nguyenvana@gmail.com', 'password123', '0123456789', '1995-06-15', 'Male', 'User'),
('Trần Thị B', 'tranthib@gmail.com', 'password456', '0987654321', '1998-09-20', 'Female', 'User'),
('Admin C', 'admin@admin.com', 'admin123', '0999999999', '1990-01-01', 'Male', 'Admin');

-- Dữ liệu mẫu cho bảng DatPhong
INSERT INTO DatPhong (ma_phong, ma_nguoi_dat, ngay_den, ngay_di, so_luong_khach)
VALUES
(1, 1, '2025-03-10 14:00:00', '2025-03-12 12:00:00', 2),
(2, 2, '2025-04-01 13:00:00', '2025-04-05 11:00:00', 4),
(3, 1, '2025-05-15 15:00:00', '2025-05-17 10:00:00', 3);

-- Dữ liệu mẫu cho bảng BinhLuan
INSERT INTO BinhLuan (ma_cong_viec, ma_nguoi_binh_luan, ngay_binh_luan, noi_dung, sao_binh_luan)
VALUES
(1, 1, '2025-03-13 10:00:00', 'Phòng đẹp, sạch sẽ, đáng giá tiền.', 5),
(2, 2, '2025-04-06 09:30:00', 'Dịch vụ tốt nhưng hơi ồn.', 4),
(3, 1, '2025-05-18 14:20:00', 'Rất thích hợp cho gia đình.', 5);