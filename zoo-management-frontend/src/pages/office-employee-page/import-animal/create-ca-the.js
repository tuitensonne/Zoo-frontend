import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

const CreateCaTheComponent = () => {
    const location = useLocation();
    const receivedData = location.state;
    const [formData, setFormData] = useState({
        id_kv: 0,
        id_hssk: 0,
        ten_khoa_hoc: '',
        id_ct_cha: null,
        ten_khoa_hoc_cha: null,
        id_ct_me: null,
        ten_khoa_hoc_me: null,
        tuoi: 0,
        adn: '',
        gioi_tinh: '',
        trang_thai: 'còn sống',
    });

    useEffect(() => {
        if (receivedData.ten_khoa_hoc) {
            console.log(receivedData)
            setFormData((prevData) => ({
                ...prevData,
                ten_khoa_hoc: receivedData.ten_khoa_hoc,
            }));
        }
    }, [receivedData]);

    const [loading, setLoading] = useState(false);
    const [tenKhoaHocList, setTenKhoaHocList] = useState([]);
    const [hoSoSucKhoeList, setHoSoSucKhoeList] = useState([]);
    const [caTheChaList, setCaTheChaList] = useState([]);
    const [caTheMeList, setCaTheMeList] = useState([]);
    const [error, setError] = useState(null);
    const [khuVucList, setKhuVucList] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [tenKhoaHocResponse, khuvucnuoiResponse] = await Promise.all([
                    axios.get("http://localhost:8088/loai-dong-vat/getallLDV"),
                    axios.get("http://localhost:8088/khu-vuc-nuoi/list")
                ]);
                setTenKhoaHocList(tenKhoaHocResponse.data.data);
                setKhuVucList(khuvucnuoiResponse.data.data)
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu:", err);
                setError({ api: "Không thể tải dữ liệu." });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchHSSKList = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8088/ho-so-suc-khoe/all');
            setHoSoSucKhoeList(response.data.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách hồ sơ sức khỏe:', error);
        } finally {
            setLoading(false);
        }
        };
        fetchHSSKList();
    }, []);

    const handleChange = async (e) => {
        const { name, value } = e.target;

        // Chuyển đổi giá trị số từ chuỗi sang số
        const convertedValue = ['id_kv', 'id_hssk', 'tuoi', 'id_ct_cha', 'id_ct_me'].includes(name) ? Number(value) : value;

        setFormData((prevData) => ({
        ...prevData,
        [name]: convertedValue,
        }));

        if (name === 'ten_khoa_hoc_cha' && value) {
        await fetchCaTheList(value, 0, setCaTheChaList);
        } else if (name === 'ten_khoa_hoc_me' && value) {
        await fetchCaTheList(value, 1, setCaTheMeList);
        }
    };

    const handleIdNhanVienChange = (e) => {
        const selectedValue = e.target.value;
        setFormData((prev) => ({
            ...prev,
            id_kv: Number(selectedValue),
        }));
    };

    const fetchCaTheList = async (tenKhoaHoc, gioiTinh, setList) => {
        try {
        setLoading(true);
        const response = await axios.get(
            `http://localhost:8088/loai-dong-vat/cathe?ten_khoa_hoc=${tenKhoaHoc}&gioi_tinh=${gioiTinh}`
        );
        setList(response.data.data);
        } catch (error) {
        console.error('Lỗi khi lấy danh sách cá thể:', error);
        } finally {
        setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sanitizedData = {
            ...formData,
            id_kv: Number(formData.id_kv),
            id_hssk: Number(formData.id_hssk),
            tuoi: Number(formData.tuoi),
            id_ct_cha: formData.id_ct_cha ? Number(formData.id_ct_cha) : null ,
            id_ct_me: formData.id_ct_me ? Number(formData.id_ct_me) : null,
        };
        console.log(sanitizedData)
        
        try {
            
            await axios.post("http://localhost:8088/phieu-nhap-dong-vat", receivedData);
            await axios.post('http://localhost:8088/loai-dong-vat/create/cathe', sanitizedData);
            alert('Thêm cá thể thành công!');
        } catch (error) {
            console.error('Lỗi khi thêm cá thể:', error);
            alert('Thêm cá thể thất bại!');
        }
    };

    return (
        <div className="contentexport">
        <div className="container-create-import">
            <div className="form-container">
            <h1 className="container-title">Thêm cá thể mới</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                <label className="form-label" htmlFor="id_hssk">ID Hồ Sơ Sức Khỏe</label>
                <input
                    type="number"
                    className="form-input"
                    id="id_hssk"
                    name="id_hssk"
                    value={formData.id_hssk}
                    onChange={handleChange}
                />
                </div>

                <FormGroup
                label="Loài Cá Thể Cha"
                id="ten_khoa_hoc_cha"
                name="ten_khoa_hoc_cha"
                value={formData.ten_khoa_hoc_cha}
                onChange={handleChange}
                options={tenKhoaHocList.map((item) => ({
                    value: item.ten_khoa_hoc,
                    label: item.ten_khoa_hoc,
                }))}
                />

                <FormGroup
                label="ID Cá Thể Cha"
                id="id_ca_the_cha"
                name="id_ct_cha"
                value={formData.id_ct_cha}
                onChange={handleChange}
                options={caTheChaList.map((item) => ({
                    value: item.id_ct,
                    label: item.id_ct,
                }))}
                />

                <FormGroup
                label="Loài Cá Thể Mẹ"
                id="ten_khoa_hoc_me"
                name="ten_khoa_hoc_me"
                value={formData.ten_khoa_hoc_me}
                onChange={handleChange}
                options={tenKhoaHocList.map((item) => ({
                    value: item.ten_khoa_hoc,
                    label: item.ten_khoa_hoc,
                }))}
                />

                <FormGroup
                label="ID Cá Thể Mẹ"
                id="id_ca_the_me"
                name="id_ct_me"
                value={formData.id_ct_me}
                onChange={handleChange}
                options={caTheMeList.map((item) => ({
                    value: item.id_ct,
                    label: item.id_ct,
                }))}
                />

                <div className="form-label">
                    Khu vực nuôi:
                    <select className="form-input" name="cccd" value={formData.cccd} onChange={handleIdNhanVienChange}>
                        <option value="">Chọn khu vực nuôi</option>
                        {khuVucList.map((item, index) => (
                            <option key={index} value={item.id_kv}>{`${item.vi_tri} (${item.id_kv}, ${item.loai_moi_truong})`}</option>
                        ))}
                    </select>
                    {error?.id_kv && <div className="error-message">{error.id_kv}</div>}
                </div>

                <div className="form-group">
                <label className="form-label" htmlFor="adn">ADN</label>
                <input
                    type="text"
                    className="form-input"
                    id="adn"
                    name="adn"
                    value={formData.adn}
                    onChange={handleChange}
                />
                </div>

                <div className="form-group">
                <label className="form-label" htmlFor="tuoi">Tuổi</label>
                <input
                    type="number"
                    className="form-input"
                    id="tuoi"
                    name="tuoi"
                    value={formData.tuoi}
                    onChange={handleChange}
                />
                </div>

                <div className="form-group">
                <label className="form-label" htmlFor="gioi_tinh">Giới Tính</label>
                <select
                    className="form-input"
                    id="gioi_tinh"
                    name="gioi_tinh"
                    value={formData.gioi_tinh}
                    onChange={handleChange}
                >
                    <option value="">Chọn...</option>
                    <option value="đực">Đực</option>
                    <option value="cái">Cái</option>
                </select>
                </div>

                <button type="submit" className="button-primary" disabled={loading}>
                {loading ? 'Đang tạo phiếu...' : 'Tạo Phiếu Nhập'}
                </button>
            </form>
            </div>
        </div>
        </div>
    );
};

const FormGroup = ({ label, id, name, value, onChange, options }) => (
    <div className="form-group">
        <label className="form-label" htmlFor={id}>{label}</label>
        <select
        className="form-input"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        >
        <option value="">Chọn...</option>
        {options.map((option) => (
            <option key={option.value} value={option.value}>
            {option.label}
            </option>
        ))}
        </select>
    </div>
);

export default CreateCaTheComponent;
