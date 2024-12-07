import React, { useState } from "react";
import "../office-employee.component.css";
import "./taophieunhom.component.css";
import { useNavigate } from "react-router-dom";
function Createxuatct({ onAddRecord }) {
    const [species, setSpecies] = useState("");
    const [ctId, setctId] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [date, setDate] = useState("");
    const [reason, setReason] = useState("");
    const [partner, setPartner] = useState("");
    const [staff, setStaff] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Sử dụng hook điều hướng

    // Hàm kiểm tra định dạng CCCD
    const validateCCCD = (cccd) => {
        const regex = /^[0-9]{12}$/; // Định dạng CCCD: 12 chữ số
        return regex.test(cccd);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra CCCD hợp lệ
        if (!validateCCCD(staff)) {
            setError("Mã CCCD không hợp lệ. Vui lòng nhập đúng định dạng.");
            return;
        }
        setError("");

        // Tạo đối tượng phiếu mới
        const newRecord = {
            id: Math.random().toString(36).substr(2, 9), // Tạo ID ngẫu nhiên
            species,
            date,
            quantity,
            reason,
            partner,
            staff,
            ctId,
        };

        onAddRecord(newRecord); // Gọi callback để thêm phiếu mới
        // Sau khi thêm thành công, điều hướng về trang danh sách phiếu xuất
        navigate("/office/export");

        setSpecies("");
        setctId("");
        setQuantity(1);
        setDate("");
        setReason("");
        setPartner("");
        setStaff("");
    };

    return (
        <form className="create-export-form" onSubmit={handleSubmit}>
            <h3>Tạo Phiếu Xuất Động Vật</h3>

            {/* Các form nhập liệu */}
            <label>
                Loài động vật:
                <select
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    required
                >
                    <option value="" disabled>Chọn loài động vật</option>
                    {["Chó", "Gà", "Chồn", "Heo", "Vẹt"].map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                ID ct:
                <input
                    type="text"
                    value={ctId}
                    onChange={(e) => setctId(e.target.value)}
                    required
                />
            </label>
            <label>
                Số lượng xuất:
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    min="1"
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
                    {["Chuyển giao", "Bán", "Trao đổi"].map((option, index) => (
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
                    onChange={(e) => setPartner(e.target.value)}
                    required
                >
                    <option value="" disabled>Chọn đối tác</option>
                    {["Công ty A", "Công ty B", "Không có"].map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
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


export default function ChoosenhomComponent() {
    const navigate = useNavigate();

    const handleAddRecord = (record) => {
        
        // console.log("Phiếu xuất mới:", record);
        // Navigate back to the export records page
        // navigate("/office/export");
    };

    return (
        <div className="contentexport">
            <Createxuatct onAddRecord={handleAddRecord} />
        </div>
    );
}