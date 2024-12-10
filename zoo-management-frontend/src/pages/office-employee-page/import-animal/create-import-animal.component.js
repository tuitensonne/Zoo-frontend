import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import './record-import-animal.component.css';



export default function CreateImportAnimalComponent() {

    const [formData, setFormData] = useState({

        cccd: "",

        ID_so_thu: 0,

        ten_khoa_hoc: "",

        ngay_nhap: "",

        so_luong: 0,

        ly_do_nhap: "",

        loai: "" // Thêm trường loại

    });



    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const [tenKhoaHocList, setTenKhoaHocList] = useState([]); // Danh sách tên khoa học

    const navigate = useNavigate();



    // Gọi API để lấy danh sách tên khoa học khi component được mount

    useEffect(() => {

        const fetchTenKhoaHocList = async () => {

            try {

                setLoading(true);

                const response = await axios.get("http://localhost:8088/loai-dong-vat/getallLDV");

                console.log(response.data.data)

                setTenKhoaHocList(response.data.data);

            } catch (err) {

                console.error("Lỗi khi lấy danh sách tên khoa học:", err);

                setError({ api: "Không thể tải danh sách tên khoa học." });

            } finally {

                setLoading(false);

            }

        };



        fetchTenKhoaHocList();

    }, []);



    const handleInputChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({

            ...prev,

            [name]: name === "ID_so_thu" || name === "so_luong" ? Number(value) : value,

        }));

    };



    const handleTenKhoaHocChange = (e) => {

        const selectedValue = e.target.value;

        setFormData((prev) => ({

            ...prev,

            ten_khoa_hoc: selectedValue,

            loai: tenKhoaHocList.find(item => item.ten_khoa_hoc === selectedValue)?.loai || "" // Lấy loại từ danh sách

        }));

    };



    const validateFormData = () => {

        const errors = {};

        if (!formData.cccd.trim() || !/^\d{12}$/.test(formData.cccd)) {

            errors.cccd = "CCCD phải chứa đúng 12 ký tự số.";

        }

        if (formData.ID_so_thu <= 0) {

            errors.ID_so_thu = "ID bên cung cấp động vật phải lớn hơn 0.";

        }

        if (!formData.ten_khoa_hoc.trim()) {

            errors.ten_khoa_hoc = "Tên động vật không được để trống.";

        }

        if (!formData.ngay_nhap) {

            errors.ngay_nhap = "Ngày nhập không được để trống.";

        }

        if (formData.so_luong <= 0) {

            errors.so_luong = "Số lượng phải lớn hơn 0.";

        }

        if (!formData.ly_do_nhap.trim()) {

            errors.ly_do_nhap = "Lý do nhập không được để trống.";

        }

        if (!formData.loai) {

            errors.loai = "Loại động vật phải được xác định.";

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

            const response = await axios.post("http://localhost:8088/phieu-nhap-dong-vat", formData);

            alert("Phiếu nhập động vật đã được tạo thành công!");

            setLoading(false);

        } catch (err) {

            console.error(err.response);

            setError({ api: "Có lỗi xảy ra khi tạo phiếu nhập!" });

            setLoading(false);

        }

    };



    return (

        <div className="contentexport">

            <div className="container-create-import">

                <h1 className="container-title">Tạo Phiếu Nhập Động Vật</h1>

                <form className="form" onSubmit={handleSubmit}>

                    <div className="form-label">

                        CCCD:

                        <input

                            className="form-input"

                            type="text"

                            name="cccd"

                            value={formData.cccd}

                            onChange={handleInputChange}

                        />

                        {error?.cccd && <div className="error-message">{error.cccd}</div>}

                    </div>

                    <div className="form-label">

                        ID sở thú:

                        <div className="form-row">

                            <input

                                className="form-input"

                                type="number"

                                name="ID_so_thu"

                                value={formData.ID_so_thu}

                                onChange={handleInputChange}

                            />

                            <button

                                type="button"

                                onClick={() => navigate("/add-doi-tac")}

                                className="button-primary"

                            >

                                Thêm Đối Tác

                            </button>

                        </div>

                        {error?.ID_so_thu && <div className="error-message">{error.ID_so_thu}</div>}

                    </div>

                    <div className="form-label">

                        Tên khoa học:

                        {loading ? (

                            <div>Đang tải danh sách...</div>

                        ) : (

                            <select

                                className="form-input"

                                name="ten_khoa_hoc"

                                value={formData.ten_khoa_hoc}

                                onChange={handleTenKhoaHocChange}

                            >

                                <option value="">Chọn tên khoa học</option>

                                {tenKhoaHocList.map((item, index) => (

                                    <option key={index} value={item.ten_khoa_hoc}>

                                        {item.ten_khoa_hoc}

                                    </option>

                                ))}

                            </select>

                        )}

                        {error?.ten_khoa_hoc && <div className="error-message">{error.ten_khoa_hoc}</div>}

                    </div>

                    <div className="form-label">

                        Loại:

                        {formData.loai === "Cá thể" || formData.loai === "Nhóm" ? (

                            <input

                                className="form-input"

                                type="text"

                                name="loai"

                                value={formData.loai}

                                readOnly

                            />

                        ) : (

                            <select

                                className="form-input"

                                name="loai"

                                value={formData.loai}

                                onChange={handleInputChange}

                            >

                                <option value="">Chọn loại</option>

                                <option value="Cá thể">Cá thể</option>

                                <option value="Nhóm">Nhóm</option>

                            </select>

                        )}

                        {error?.loai && <div className="error-message">{error.loai}</div>}
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

                        Lý do nhập:

                        <input

                            className="form-input"

                            type="text"

                            name="ly_do_nhap"

                            value={formData.ly_do_nhap}

                            onChange={handleInputChange}

                        />

                        {error?.ly_do_nhap && <div className="error-message">{error.ly_do_nhap}</div>}

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