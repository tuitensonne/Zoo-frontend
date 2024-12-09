import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTreatment } from "../../../services/healthRecordService";  // Import hàm API
import "./treatment.component.css";

export default function TreatmentComponent() {
    const navigate = useNavigate();
    const [treatmentData, setTreatmentData] = useState({
        ID_ho_so_suc_khoe: "",
        trieu_chung: "",
        chan_doan: "",
        ket_qua: "",
        loai_thuoc: "",
        ghi_chu: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTreatmentData({
            ...treatmentData,
            [name]: value,
        });
        setError(null); 
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const response = await createTreatment(treatmentData);  // Gọi hàm tạo điều trị từ service
            console.log("Data saved:", response);
            alert("Lưu điều trị thành công!");
            
            // Reset form sau khi lưu thành công
            setTreatmentData({
                ID_ho_so_suc_khoe: "",
                trieu_chung: "",
                chan_doan: "",
                ket_qua: "",
                loai_thuoc: "",
                ghi_chu: ""
            });

        } catch (error) {
            setError("Lỗi khi lưu điều trị, vui lòng thử lại.");
            console.error("Error saving treatment:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate("/vet/hssk");  // Điều hướng về trang hssk
    };

    return (
        <div className="treatment-form-container">
            <h2 className="form-title">Tạo Lần Điều Trị</h2>
            {error && <p className="error-message">{error}</p>}
            <form className="treatment-form">
                <label>
                    ID Hồ Sơ Sức Khỏe:
                    <input
                        type="text"
                        name="ID_ho_so_suc_khoe"
                        value={treatmentData.ID_ho_so_suc_khoe}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Triệu Chứng:
                    <input
                        type="text"
                        name="trieu_chung"
                        value={treatmentData.trieu_chung}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Chẩn Đoán:
                    <input
                        type="text"
                        name="chan_doan"
                        value={treatmentData.chan_doan}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Kết Quả:
                    <input
                        type="text"
                        name="ket_qua"
                        value={treatmentData.ket_qua}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Loại Thuốc:
                    <input
                        type="text"
                        name="loai_thuoc"
                        value={treatmentData.loai_thuoc}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Ghi Chú:
                    <textarea
                        name="ghi_chu"
                        value={treatmentData.ghi_chu}
                        onChange={handleChange}
                    />
                </label>
                <div className="form-buttons">
                    <button
                        type="button"
                        onClick={handleSave}
                        className="save-button"
                        disabled={loading}
                    >
                        {loading ? "Đang Lưu..." : "Lưu Điều Trị"}
                    </button>
                    <button type="button" onClick={handleBack} className="back-button">
                        Trở Về
                    </button>
                </div>
            </form>
        </div>
    );
}
