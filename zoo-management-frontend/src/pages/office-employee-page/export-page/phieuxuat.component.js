import React from "react";
import { useNavigate } from "react-router-dom";
import "./phieuxuat.component.css";
import nhom from '../../../assets/images/nhom1.jpg';
import ct from '../../../assets/images/ct.jpg';
export function PhieuXuatComponent() {
    const navigate = useNavigate();

    const handleIndividualExport = () => {
        navigate("export-individual"); // Điều hướng đến trang Phiếu Xuất Cá Thể
    };

    const handleGroupExport = () => {
        navigate("export-group"); // Điều hướng đến trang Phiếu Xuất Nhóm
    };

    return (
        <div className="export-options-container">
            <h2 className="chon">Chọn Loại Phiếu Xuất</h2>
            <div className="export-options">
                <div className="export-option" onClick={handleGroupExport}>
                    <img
                        src={nhom}
                        alt="Phiếu Xuất Nhóm"
                        className="option-icon"
                    />
                    <p className="chon">Phiếu Xuất Nhóm</p>
                </div>
                <div className="export-option" onClick={handleIndividualExport}>
                    <img
                        src={ct}
                        alt="Phiếu Xuất Cá Thể"
                        className="option-icon"
                    />
                    <p className="chon">Phiếu Xuất Cá Thể</p>
                </div>
            </div>
            <button className="back-button-export" onClick={() => navigate(-1)}>
                Trở Về
            </button>
        </div>
    );
}


export default function ChooseComponent() {
    // Đặt biến gọi Chọn phiếu xuất
    const ChooseComponent = PhieuXuatComponent;
   return (
           <div className="contentexport">
               <PhieuXuatComponent /> {ChooseComponent}
           </div>
   );
}
