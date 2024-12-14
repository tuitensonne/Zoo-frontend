import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

const CreateNhomComponent = () => {
    const location = useLocation();
    const receivedData = location.state;
    const [formData, setFormData] = useState({
        id_kv: 0,
        id_hssk: 0,
        ten_khoa_hoc: '',
        so_luong: 0
    });

    useEffect(() => {
        if (receivedData.ten_khoa_hoc) {
            console.log(receivedData)
            setFormData((prevData) => ({
                ...prevData,
                ten_khoa_hoc: receivedData.ten_khoa_hoc,
                so_luong: receivedData.so_luong
            }));
        }
    }, [receivedData]);

    const [loading, setLoading] = useState(false);
    const [hoSoSucKhoeList, setHoSoSucKhoeList] = useState([]);
    const [error, setError] = useState(null);
    const [khuVucList, setKhuVucList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [khuvucnuoiResponse] = await Promise.all([
                    axios.get("http://localhost:8088/khu-vuc-nuoi/list")
                ]);
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
        const convertedValue = ['id_kv', 'id_hssk', 'so_luong'].includes(name) ? Number(value) : value;

        setFormData((prevData) => ({
        ...prevData,
        [name]: convertedValue,
        }));
    };

    const handleKhuVucChange = (e) => {
        const selectedValue = e.target.value;
        setFormData((prev) => ({
            ...prev,
            id_kv: Number(selectedValue),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sanitizedData = {
            ...formData,
            id_kv: Number(formData.id_kv),
            id_hssk: Number(formData.id_hssk),
            so_luong: Number(formData.so_luong),
        };
        console.log(sanitizedData)
        
        try {
            
            await axios.post("http://localhost:8088/phieu-nhap-dong-vat", receivedData);
            await axios.post('http://localhost:8088/loai-dong-vat/create/nhom', sanitizedData);
            alert('Thêm nhóm thành công!');
        } catch (error) {
            console.error('Lỗi khi thêm nhóm:', error);
            alert('Thêm nhóm thất bại!');
        }
    };

    return (
        <div className="contentexport">
        <div className="container-create-import">
            <div className="form-container">
            <h1 className="container-title">Thêm nhóm mới</h1>
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

                <div className="form-label">
                    Khu vực nuôi:
                    <select className="form-input" name="cccd" value={formData.cccd} onChange={handleKhuVucChange}>
                        <option value="">Chọn khu vực nuôi</option>
                        {khuVucList.map((item, index) => (
                            <option key={index} value={item.id_kv}>{`${item.vi_tri} (${item.id_kv}, ${item.loai_moi_truong})`}</option>
                        ))}
                    </select>
                    {error?.id_kv && <div className="error-message">{error.id_kv}</div>}
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

export default CreateNhomComponent;