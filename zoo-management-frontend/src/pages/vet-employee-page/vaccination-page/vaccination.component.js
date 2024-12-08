import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./vaccination.component.css";

export default function VaccinationComponent() {
    const navigate = useNavigate();
    const [vaccinationData, setVaccinationData] = useState({
        healthRecordId: "",
        symptoms: "",
        diagnosis: "",
        result: "",
        medicationType: "",
        notes: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVaccinationData({
            ...vaccinationData,
            [name]: value,
        });
    };

    const handleSave = () => {
        console.log("Data saved:", vaccinationData);
        // Gọi API
    };

    const handleBack = () => {
        console.log("Back to previous page");
        navigate("/vet/hssk");  
    };

    return (
        <div className="vacination-form-container">
            <h2 className="form-title">Tạo Lần Tiêm Chủng</h2>
            <form className="vacination-form">
                <label>
                    ID Hồ Sơ Sức Khỏe:
                    <input
                        type="text"
                        name="healthRecordId"
                        value={vaccinationData.healthRecordId}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Ngày Tiêm Chủng:
                    <input
                        type="date"
                        name="vacinationDay"
                        value={vaccinationData.vacinationDay}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Phương Pháp Tiêm:
                    <input
                        type="text"
                        name="injectionMethod"
                        value={vaccinationData.injectionMethod}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Loại Vaccine:
                    <input
                        type="text"
                        name="typeOfVaccine"
                        value={vaccinationData.typeOfVaccine}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Liều lượng:
                    <input
                        type="text"
                        name="dosage"
                        value={vaccinationData.dosage}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Phản Ứng Sau Tiêm:
                    <textarea
                        name="postInjectionReaction"
                        value={vaccinationData.postInjectionReaction}
                        onChange={handleChange}
                    />
                </label>
                <div className="form-buttons">
                    <button type="button" onClick={handleSave} className="save-button">
                        Lưu Tiêm Chủng
                    </button>
                    <button type="button" onClick={handleBack} className="back-button">
                        Trở Về
                    </button>
                </div>
            </form>
        </div>
    );
}
