import React, { useState, useEffect } from "react";
import "../office-employee.component.css";
import "./taophieunhom.component.css";
import { useNavigate } from "react-router-dom";

function Createxuatct({ onAddRecord }) {
    const [species, setSpecies] = useState(""); // Loài động vật
    const [ctIds, setctIds] = useState(""); // ID ct
    const [quantity, setQuantity] = useState(0); // Số lượng xuất
    const [date, setDate] = useState(""); // Ngày xuất
    const [reason, setReason] = useState(""); // Lý do xuất
    const [partner, setPartner] = useState(""); // Đối tác
    const [staff, setStaff] = useState(""); // Nhân viên (CCCD)
    const [error, setError] = useState(""); // Lỗi
    const [khoaHocOptions, setKhoaHocOptions] = useState([]); // Danh sách loài
    const [partnerOptions, setPartnerOptions] = useState([]); // Danh sách đối tác
    const navigate = useNavigate(); // Hook điều hướng

    // Lấy danh sách loài từ backend khi component mount
    useEffect(() => {
        const fetchKhoaHoc = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8088/tao-phieu-xuat-dong-vat/ct"
                );
                const data = await response.json();
                // console.log("Dữ liệu loài API:", data);
                setKhoaHocOptions(data[0]); // Cập nhật state
            } catch (error) {
                console.error("Error fetching khoa hoc:", error);
            }
        };

        fetchKhoaHoc();
    }, []);

    // Lấy danh sách đối tác từ backend
    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8088/tao-phieu-xuat-dong-vat/getdoitac"
                );
                const data = await response.json();
                // console.log("Dữ liệu đối tác API:", data);

                // Kiểm tra nếu dữ liệu trả về là mảng và gán vào state
                if (Array.isArray(data)) {
                    setPartnerOptions(data); // Cập nhật state với dữ liệu trả về
                } else {
                    console.error("Dữ liệu trả về không đúng định dạng");
                }
            } catch (error) {
                console.error("Error fetching partners:", error);
            }
        };

        fetchPartners();
    }, []);

     // Cập nhật `quantity` tự động khi `ctIds` thay đổi
     useEffect(() => {
        const idArray = ctIds
            .split(",") // Tách chuỗi bởi dấu phẩy
            .map((id) => id.trim()) // Loại bỏ khoảng trắng thừa
            .filter((id) => id !== ""); // Loại bỏ các phần tử rỗng
        setQuantity(idArray.length); // Cập nhật số lượng
    }, [ctIds]);

    // Hàm kiểm tra định dạng CCCD
    const validateCCCD = (cccd) => {
        const regex = /^[0-9]{12}$/; // Định dạng: 12 chữ số
        return regex.test(cccd);
    };

    // Xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Tách chuỗi ID ct thành mảng
        const idArray = ctIds
        .split(",") // Tách chuỗi bởi dấu phẩy
        .map((id) => id.trim()) // Loại bỏ khoảng trắng thừa
        .filter((id) => id !== ""); // Loại bỏ các phần tử rỗng
        
        // Kiểm tra nếu không có ID hợp lệ
        if (idArray.length === 0) {
            setError("Vui lòng nhập ít nhất một ID ct.");
        return;
        }

        // Kiểm tra CCCD
        if (!validateCCCD(staff)) {
            setError("Mã CCCD không hợp lệ. Vui lòng nhập đúng định dạng.");
            return;
        }
        setError("");

        // Định dạng dữ liệu phù hợp với yêu cầu API
        const newRecord = {
            ldv: species,         // Tên loài động vật (ldv)
            id_ct: idArray,       // Gửi mảng ID ct
            so_luong_xuat: quantity, // Số lượng xuất (so_luong_xuat)
            ngay_xuat: date,      // Ngày xuất (ngay_xuat)
            ly_do_xuat: reason,   // Lý do xuất (ly_do_xuat)
            doi_tac: partner,     // Truyền id_dt vào API (doi_tac)
            cccd: staff,          // CCCD nhân viên (cccd)
        };

        try {
            const response = await fetch(
                "http://localhost:8088/tao-phieu-xuat-dong-vat/createct",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newRecord),
                }
            );

            const result = await response.json(); // Thử parse JSON để xem thông báo lỗi
            if (!response.ok) {
                console.error(result); // Log chi tiết lỗi
                if (result.details === 'Id ct không tồn tại.'){
                    setError(result.details); // Hiển thị thông báo ko tồn tại id nhom
                    return;
                }
                // Kiểm tra lỗi từ backend (CCCD không tồn tại)
                else if (result.details === 'Mã CCCD không tồn tại trong hệ thống.') {
                    setError(result.details); // Hiển thị thông báo lỗi CCCD không tồn tại
                    return;
                }
                 else {
                    throw new Error(result.message || "Lỗi khi tạo phiếu xuất!");
                }

                
                 
            }

            // console.log("Kết quả API:", result);

            // Điều hướng về trang danh sách phiếu xuất
            navigate("/office/export");

            // Reset form
            setSpecies("");
            setctIds("");
            setQuantity(0);
            setDate("");
            setReason("");
            setPartner("");
            setStaff("");

            // Gọi hàm callback để cập nhật danh sách phiếu xuất
            if (onAddRecord) {
                onAddRecord(result);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            setError(`Có lỗi xảy ra: ${error.detail}`);
        }
    };

    return (
        <form className="create-export-form" onSubmit={handleSubmit}>
            <h3>Tạo Phiếu Xuất Động Vật</h3>

            <label>
                Loài động vật:
                <select value={species} onChange={(e) => setSpecies(e.target.value)} required>
                    <option value="" disabled>Chọn loài động vật</option>
                    {khoaHocOptions.length > 0 ? (
                        khoaHocOptions.map((option, index) => (
                            <option key={index} value={option.ten_khoa_hoc}>
                                {option.ten_khoa_hoc}
                            </option>
                        ))
                    ) : (
                        <option disabled>Không có dữ liệu</option>
                    )}
                </select>
            </label>

            <label>
                ID ct (cách nhau bởi dấu phẩy):
                <input
                    type="text"
                    value={ctIds}
                    onChange={(e) => setctIds(e.target.value)}
                    required
                />
            </label>

            <label>
                Số lượng xuất:
                <input
                    type="number"
                    value={quantity}
                    readOnly // Chỉ đọc, tự động tính
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </label>

            <label>
                Ngày xuất:
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </label>

            <label>
                Lý do xuất:
                <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                >
                    <option value="" disabled>Chọn lý do xuất</option>
                    {["Chuyển giao", "Bán", "Trao đổi","cho thuê", "Khác"].map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Đối tác:
                <select
                    value={partner}
                    onChange={(e) => setPartner(e.target.value)} // Lưu id_dt khi chọn đối tác
                    required
                >
                    <option value="" disabled>Chọn đối tác</option>
                    {partnerOptions.length > 0 ? (
                        partnerOptions.map((option, index) => (
                            <option key={index} value={option.id_dt}>
                                {option.id_dt} - {option.ten_doi_tac} {/* Hiển thị id_dt và ten_doi_tac */}
                            </option>
                        ))
                    ) : (
                        <option disabled>Không có dữ liệu đối tác</option>
                    )}
                </select>
            </label>

            <label>
                Nhân viên (CCCD):
                <input
                    type="text"
                    value={staff}
                    onChange={(e) => setStaff(e.target.value)}
                    required
                />
            </label>

            {error && <p className="error">{error}</p>}

            <button type="submit">Tạo Phiếu Xuất</button>
        </form>
    );
}


export default function ChoosectComponent() {
    const handleAddRecord = (record) => {
        // console.log("Phiếu xuất mới:", record);
    };

    return (
        <div className="contentexport">
            <Createxuatct onAddRecord={handleAddRecord} />
        </div>
    );
}