import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVaccination } from "../../../services/healthRecordService";  // Import API service
import "./vaccination.component.css";

export default function VaccinationComponent() {
    const navigate = useNavigate();
    const [vaccinationData, setVaccinationData] = useState({
        ID_ho_so_suc_khoe: "",
        ngay_tiem: "",
        phuong_phap_tiem: "",
        loai_vaccine: "",
        lieu_luong: "",
        phan_ung_sau_tiem: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVaccinationData({
            ...vaccinationData,
            [name]: value,
        });
        setError(null); 
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const response = await createVaccination(vaccinationData);  // Gọi API lưu tiêm chủng
            console.log("Data saved:", response);
            alert("Lưu tiêm chủng thành công!");

            // Reset form sau khi lưu thành công
            setVaccinationData({
                ID_ho_so_suc_khoe: "",
                ngay_tiem: "",
                phuong_phap_tiem: "",
                loai_vaccine: "",
                lieu_luong: "",
                phan_ung_sau_tiem: ""
            });

        } catch (error) {
            setError("Lỗi khi lưu tiêm chủng, vui lòng thử lại.");
            console.error("Error saving vaccination:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        console.log("Back to previous page");
        navigate("/vet/hssk");  // Điều hướng về trang hssk nếu cần
    };

    return (
        <div className="vacination-form-container">
            <h2 className="form-title">Tạo Lần Tiêm Chủng</h2>
            {error && <p className="error-message">{error}</p>}
            <form className="vacination-form">
                <label>
                    ID Hồ Sơ Sức Khỏe:
                    <input
                        type="text"
                        name="ID_ho_so_suc_khoe"
                        value={vaccinationData.ID_ho_so_suc_khoe}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Ngày Tiêm Chủng:
                    <input
                        type="date"
                        name="ngay_tiem"
                        value={vaccinationData.ngay_tiem}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Phương Pháp Tiêm:
                    <input
                        type="text"
                        name="phuong_phap_tiem"
                        value={vaccinationData.phuong_phap_tiem}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Loại Vaccine:
                    <input
                        type="text"
                        name="loai_vaccine"
                        value={vaccinationData.loai_vaccine}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Liều lượng:
                    <input
                        type="text"
                        name="lieu_luong"
                        value={vaccinationData.lieu_luong}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Phản Ứng Sau Tiêm:
                    <textarea
                        name="phan_ung_sau_tiem"
                        value={vaccinationData.phan_ung_sau_tiem}
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
                        {loading ? "Đang Lưu..." : "Lưu Tiêm Chủng"}
                    </button>
                    <button type="button" onClick={handleBack} className="back-button">
                        Trở Về
                    </button>
                </div>
            </form>
        </div>
    );
}
