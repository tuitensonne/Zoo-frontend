import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateImportAnimalComponent() {
    const [formData, setFormData] = useState({ cccd: "", ID_so_thu: 0, ten_khoa_hoc: "", ngay_nhap: "", so_luong: 0, ly_do_nhap: "", loai: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tenKhoaHocList, setTenKhoaHocList] = useState([]);
    const [doiTacList, setDoiTacList] = useState([]);
    const [vanPhongList, setVanPhongList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [tenKhoaHocResponse, doiTacResponse, vanphongResponse] = await Promise.all([
                    axios.get("http://localhost:8088/loai-dong-vat/getallLDV"),
                    axios.get("http://localhost:8088/doi-tac/sothu"),
                    axios.get("http://localhost:8088/nhan-vien/vanphong")
                ]);
                setTenKhoaHocList(tenKhoaHocResponse.data.data);
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
            [name]: name === "ID_so_thu" || 
            name === "so_luong" && 
            value != 0 ? Number(value) : value }));
    };

    const handleTenKhoaHocChange = (e) => {
        const selectedValue = e.target.value;
        setFormData((prev) => ({ 
            ...prev, ten_khoa_hoc: selectedValue, 
            loai: tenKhoaHocList.find(item => item.ten_khoa_hoc === selectedValue)?.loai || "" }));
    };

    const handleIdDoiTacChange = (e) => {
        const selectedValue = e.target.value;
        setFormData((prev) => ({
            ...prev,
            ID_so_thu: Number(selectedValue),
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
        if (!formData.cccd.trim() || !/^\d{12}$/.test(formData.cccd)) 
            errors.cccd = "CCCD phải chứa đúng 12 ký tự số.";
                
        if (!formData.ten_khoa_hoc.trim()) 
            errors.ten_khoa_hoc = "Tên động vật không được để trống.";
        
        if (!formData.ngay_nhap) 
            errors.ngay_nhap = "Ngày nhập không được để trống.";
        
        if (formData.so_luong <= 0) 
            errors.so_luong = "Số lượng phải lớn hơn 0.";
        
        if (!formData.loai) 
            errors.loai = "Loại động vật phải được xác định.";
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
        
        if (formData.loai == "cá thể")
            navigate("/office/createCT", { state: formData })
        else navigate("/office/createNhom", { state: formData })
    };

    return (
        <div className="contentexport">
            <div className="container-create-import">
                <h1 className="container-title">Tạo Phiếu Nhập Động Vật</h1>
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
                        <select className="form-input" name="ID_so_thu" value={formData.ID_so_thu} onChange={handleIdDoiTacChange}>
                            <option value="">Chọn đối tác</option>
                            {doiTacList.map((item, index) => (
                                <option key={index} value={item.id_dt}>{`${item.ten_doi_tac} (${item.id_dt})`}</option>
                            ))}
                        </select>
                        {error?.ID_so_thu && <div className="error-message">{error.ID_so_thu}</div>}
                    </div>
                    <div className="form-label">
                        Tên khoa học:
                        {loading ? (
                            <div>Đang tải danh sách...</div>
                        ) : (
                            <select className="form-input" name="ten_khoa_hoc" value={formData.ten_khoa_hoc} onChange={handleTenKhoaHocChange}>
                                <option value="">Chọn tên khoa học</option>
                                {tenKhoaHocList.map((item, index) => (
                                    <option key={index} value={item.ten_khoa_hoc}>{item.ten_khoa_hoc}</option>
                                ))}
                            </select>
                        )}
                        {error?.ten_khoa_hoc && <div className="error-message">{error.ten_khoa_hoc}</div>}
                    </div>
                    <div className="form-label">
                        Loại:
                        {formData.loai === "Cá thể" || formData.loai === "Nhóm" ? (
                            <input className="form-input" type="text" name="loai" value={formData.loai} readOnly />
                        ) : (
                            <select className="form-input" name="loai" value={formData.loai} onChange={handleInputChange}>
                                <option value="">Chọn loại</option>
                                <option value="Cá thể">Cá thể</option>
                                <option value="Nhóm">Nhóm</option>
                            </select>
                        )}
                        {error?.loai && <div className="error-message">{error.loai}</div>}
                    </div>
                    <div className="form-label">
                        Ngày Nhập:
                        <input className="form-input" type="date" name="ngay_nhap" value={formData.ngay_nhap} onChange={handleInputChange} />
                        {error?.ngay_nhap && <div className="error-message">{error.ngay_nhap}</div>}
                    </div>
                    <div className="form-label">
                        Số Lượng:
                        {formData.loai === "Cá thể" ? (
                            <input className="form-input" type="number" name="so_luong" value={formData.so_luong = 1} readOnly />
                        ) : (
                            <input className="form-input" type="number" name="so_luong" value={formData.so_luong} onChange={handleInputChange} />
                        )}
                        {error?.so_luong && <div className="error-message">{error.so_luong}</div>}
                    </div>
                    <div className="form-label">
                        Lý do nhập:
                        <input className="form-input" type="text" name="ly_do_nhap" value={formData.ly_do_nhap} onChange={handleInputChange} />
                        {error?.ly_do_nhap && <div className="error-message">{error.ly_do_nhap}</div>}
                    </div>
                    <button type="submit" className="button-primary" disabled={loading}>{loading ? "Đang tạo phiếu..." : "Tạo Phiếu Nhập"}</button>
                    {error?.api && <div className="error-message">{error.api}</div>}
                </form>
            </div>
        </div>
    );
}


