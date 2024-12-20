import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './create-import-food.component.css';

export default function CreateImportFoodComponent() {
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
    const [doiTacList, setDoiTacList] = useState([]);
    const [vanPhongList, setVanPhongList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [doiTacResponse, vanphongResponse] = await Promise.all([
                    axios.get("http://localhost:8088/doi-tac/thucan"),
                    axios.get("http://localhost:8088/nhan-vien/vanphong")
                ]);
                setDoiTacList(doiTacResponse.data.data);
                setVanPhongList(vanphongResponse.data.data)
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu:", err);
                setError({ api: "Không thể tải dữ liệu." });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "ham_luong_dinh_duong" ||
                    name === "so_luong"
                ? Number(value)
                : value,
        }));
    };

    const handleIdDoiTacChange = (e) => {
        const selectedValue = e.target.value;
        setFormData((prev) => ({
            ...prev,
            ID_ben_cung_cap_thuc_an: Number(selectedValue),
        }));
    };

    const handleIdNhanVienChange = (e) => {
        const selectedValue = e.target.value;
        setFormData((prev) => ({
            ...prev,
            cccd: selectedValue,
        }));
    };

    const validateFormData = () => {
        const errors = {};
        if (!formData.cccd.trim() || !/^\d{12}$/.test(formData.cccd)) {
            errors.cccd = "CCCD phải chứa đúng 12 ký tự số.";
        }
        if (formData.ID_ben_cung_cap_thuc_an <= 0) {
            errors.ID_ben_cung_cap_thuc_an = "ID bên cung cấp thức ăn phải lớn hơn 0.";
        }
        if (!formData.ten_thuc_an.trim()) {
            errors.ten_thuc_an = "Tên thức ăn không được để trống.";
        }
        if (formData.ham_luong_dinh_duong <= 0) {
            errors.ham_luong_dinh_duong = "Hàm lượng dinh dưỡng phải lớn hơn 0.";
        }
        if (!formData.ngay_nhap) {
            errors.ngay_nhap = "Ngày nhập không được để trống.";
        }
        if (!formData.ngay_het_han || new Date(formData.ngay_het_han) <= new Date(formData.ngay_nhap)) {
            errors.ngay_het_han = "Ngày hết hạn phải lớn hơn ngày hiện tại.";
        }
        if (formData.so_luong <= 0) {
            errors.so_luong = "Số lượng phải lớn hơn 0.";
        }
        if (!formData.nguon_goc_xuat_xu.trim()) {
            errors.nguon_goc_xuat_xu = "Nguồn gốc xuất xứ không được để trống.";
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateFormData();
        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("http://localhost:8088/phieu-nhap-thuc-an", formData);
            console.log(response)
            alert("Phiếu nhập thức ăn đã được tạo thành công!");
            setLoading(false);
        } catch (err) {
            console.log(err.response)
            setError({ api: "Có lỗi xảy ra khi tạo phiếu nhập!" });
            setLoading(false);
        }
    };

    return (
        <div className="contentexport">
            <div className="container-create-import">
                <h1 className="container-title">Tạo Phiếu Nhập Thức Ăn</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-label">
                        Nhân viên thực hiện:
                        <select className="form-input" name="cccd" value={formData.cccd} onChange={handleIdNhanVienChange}>
                            <option value="">Chọn nhân viên</option>
                            {vanPhongList.map((item, index) => (
                                <option key={index} value={item.cccd}>{`${item.ho_va_ten} (${item.cccd})`}</option>
                            ))}
                        </select>
                        {error?.cccd && <div className="error-message">{error.cccd}</div>}
                    </div>
                    <div className="form-label">
                        ID Sở Thú:
                        <select className="form-input" name="ID_ben_cung_cap_thuc_an" value={formData.ID_ben_cung_cap_thuc_an} onChange={handleIdDoiTacChange}>
                            <option value="">Chọn đối tác</option>
                            {doiTacList.map((item, index) => (
                                <option key={index} value={item.id_dt}>{`${item.ten_doi_tac} (${item.id_dt})`}</option>
                            ))}
                        </select>
                        {error?.ID_ben_cung_cap_thuc_an && <div className="error-message">{error.ID_ben_cung_cap_thuc_an}</div>}
                    </div>
                    <div className="form-label">
                        Tên Thức Ăn:
                        <input
                            className="form-input"
                            type="text"
                            name="ten_thuc_an"
                            value={formData.ten_thuc_an}
                            onChange={handleInputChange}
                        />
                        {error?.ten_thuc_an && <div className="error-message">{error.ten_thuc_an}</div>}
                    </div>
                    <div className="form-label">
                        Hàm Lượng Dinh Dưỡng:
                        <input
                            className="form-input"
                            type="number"
                            name="ham_luong_dinh_duong"
                            value={formData.ham_luong_dinh_duong}
                            onChange={handleInputChange}
                        />
                        {error?.ham_luong_dinh_duong && <div className="error-message">{error.ham_luong_dinh_duong}</div>}
                    </div>
                    <div className="form-label">
                        Ngày Nhập:
                        <input
                            className="form-input"
                            type="date"
                            name="ngay_nhap"
                            value={formData.ngay_nhap}
                            onChange={handleInputChange}
                        />
                        {error?.ngay_nhap && <div className="error-message">{error.ngay_nhap}</div>}
                    </div>
                    <div className="form-label">
                        Ngày hết hạn:
                        <input
                            className="form-input"
                            type="date"
                            name="ngay_het_han"
                            value={formData.ngay_het_han}
                            onChange={handleInputChange}
                        />
                        {error?.ngay_het_han && <div className="error-message">{error.ngay_het_han}</div>}
                    </div>
                    <div className="form-label">
                        Số Lượng:
                        <input
                            className="form-input"
                            type="number"
                            name="so_luong"
                            value={formData.so_luong}
                            onChange={handleInputChange}
                        />
                        {error?.so_luong && <div className="error-message">{error.so_luong}</div>}
                    </div>
                    <div className="form-label">
                        Nguồn Gốc Xuất Xứ:
                        <input
                            className="form-input"
                            type="text"
                            name="nguon_goc_xuat_xu"
                            value={formData.nguon_goc_xuat_xu}
                            onChange={handleInputChange}
                        />
                        {error?.nguon_goc_xuat_xu && <div className="error-message">{error.nguon_goc_xuat_xu}</div>}
                    </div>
                    <button type="submit" className="button-primary" disabled={loading}>
                        {loading ? "Đang tạo phiếu..." : "Tạo Phiếu Nhập"}
                    </button>
                    {error?.api && <div className="error-message">{error.api}</div>}
                </form>
            </div>
        </div>
        
    );
}
