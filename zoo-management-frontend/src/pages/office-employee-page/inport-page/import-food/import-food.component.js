import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './import-food.component.css';

export default function ImportFoodComponent() {
    const [formData, setFormData] = useState({
        cccd: "",
        ID_ben_cung_cap_thuc_an: 0,
        ten_thuc_an: "",
        ham_luong_dinh_duong: 0,
        ngay_het_han: "",
        ngay_nhap: "",
        so_luong: 0,
        nguon_goc_xuat_xu: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: (() => {
          if (name === "cccd" || name === "ten_thuc_an" || name === "nguon_goc_xuat_xu") {
              return value;
          }
          if (name === "ID_ben_cung_cap_thuc_an" || name === "ham_luong_dinh_duong" || name === "so_luong") {
              return Number(value);
          }
          if (name === "ngay_het_han" || name === "ngay_nhap") {
              return value;
          }
          return value;
        })(),
      }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            console.log("Form data:", formData);
            const response = await axios.post("http://localhost:8088/phieu-nhap-thuc-an", formData);
            alert("Phiếu nhập thức ăn đã được tạo thành công!");
            console.log(response.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Có lỗi xảy ra khi tạo phiếu nhập!");
            setLoading(false);
        }
    };

    return (
        <div className="container-create-import">
            <h1 className="container-title">Tạo Phiếu Nhập Thức Ăn</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-label">
                    CCCD:
                    <input
                        className="form-input"
                        type="text"
                        name="cccd"
                        value={formData.cccd}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-label">
                    ID Bên Cung cấp thức ăn:
                    <div className="form-row">
                        <input
                            className="form-input"
                            type="text"
                            name="ID_ben_cung_cap_thuc_an"
                            value={formData.ID_ben_cung_cap_thuc_an}
                            onChange={handleInputChange}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => navigate("/add-doi-tac")}
                            className="button-primary"
                        >
                            Thêm Đối Tác
                        </button>
                    </div>
                </div>
                <div className="form-label">
                    Tên Thức Ăn:
                    <input
                        className="form-input"
                        type="text"
                        name="ten_thuc_an"
                        value={formData.ten_thuc_an}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-label">
                    Hàm Lượng Dinh Dưỡng:
                    <input
                        className="form-input"
                        type="number"
                        name="ham_luong_dinh_duong"
                        value={formData.ham_luong_dinh_duong}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-label">
                    Ngày Nhập:
                    <input
                        className="form-input"
                        type="date"
                        name="ngay_nhap"
                        value={formData.ngay_nhap}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-label">
                    Ngày hết hạn:
                    <input
                        className="form-input"
                        type="date"
                        name="ngay_het_han"
                        value={formData.ngay_het_han}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-label">
                    Số Lượng:
                    <input
                        className="form-input"
                        type="number"
                        name="so_luong"
                        value={formData.so_luong}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-label">
                    Nguồn Gốc Xuất Xứ:
                    <input
                        className="form-input"
                        type="text"
                        name="nguon_goc_xuat_xu"
                        value={formData.nguon_goc_xuat_xu}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit" className="button-primary" disabled={loading}>
                    {loading ? "Đang tạo phiếu..." : "Tạo Phiếu Nhập"}
                </button>
            </form>

            {error && <div className="error-message">{error}</div>}
        </div>
    );
}
