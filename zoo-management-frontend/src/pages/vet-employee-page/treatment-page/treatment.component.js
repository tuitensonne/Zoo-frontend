import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

import "./treatment.component.css";

export default function TreatmentComponent() {
    const navigate = useNavigate();
    const [treatmentData, setTreatmentData] = useState({
        healthRecordId: "",
        symptoms: "",
        diagnosis: "",
        result: "",
        medicationType: "",
        notes: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTreatmentData({
            ...treatmentData,
            [name]: value,
        });
    };

    const handleSave = () => {
        console.log("Data saved:", treatmentData);
        // Gọi API
    };

    const handleBack = () => {
        console.log("Back to previous page");
        navigate("/vet/hssk");  // Điều hướng về trang hssk
    };

    return (
        <div className="treatment-form-container">
            <h2 className="form-title">Tạo Lần Điều Trị</h2>
            <form className="treatment-form">
                <label>
                    ID Hồ Sơ Sức Khỏe:
                    <input
                        type="text"
                        name="healthRecordId"
                        value={treatmentData.healthRecordId}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Triệu Chứng:
                    <input
                        type="text"
                        name="symptoms"
                        value={treatmentData.symptoms}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Chẩn Đoán:
                    <input
                        type="text"
                        name="diagnosis"
                        value={treatmentData.diagnosis}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Kết Quả:
                    <input
                        type="text"
                        name="result"
                        value={treatmentData.result}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Loại Thuốc:
                    <input
                        type="text"
                        name="medicationType"
                        value={treatmentData.medicationType}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Ghi Chú:
                    <textarea
                        name="notes"
                        value={treatmentData.notes}
                        onChange={handleChange}
                    />
                </label>
                <div className="form-buttons">
                    <button type="button" onClick={handleSave} className="save-button">
                        Lưu Điều Trị
                    </button>
                    <button type="button" onClick={handleBack} className="back-button">
                        Trở Về
                    </button>
                </div>
            </form>
        </div>
    );
}
