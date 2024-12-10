import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './create-khu-vuc-nuoi.css';

export default function CreateKhuVucNuoi() {
  const [formData, setFormData] = useState({
    vi_tri: '',
    suc_chua_toi_da: 0,
    trang_thai_hoat_dong: '',
    dien_tich: 0,
    chieu_cao: 0,
    loai_moi_truong: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'suc_chua_toi_da' || name === 'dien_tich' || name === 'chieu_cao'
        ? parseFloat(value) || 0
        : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.vi_tri ||
      !formData.suc_chua_toi_da ||
      !formData.trang_thai_hoat_dong ||
      !formData.dien_tich ||
      !formData.chieu_cao ||
      !formData.loai_moi_truong
    ) {
      setError('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    try {
      setMessage('');
      setError('');

      await axios.post('http://localhost:8088/khu-vuc-nuoi', formData);

      setMessage('Thêm khu vực nuôi thành công!');
      setFormData({
        vi_tri: '',
        suc_chua_toi_da: '',
        trang_thai_hoat_dong: '',
        dien_tich: '',
        chieu_cao: '',
        loai_moi_truong: '',
      });
    } catch (error) {
      setError('Lỗi khi thêm khu vực nuôi. Vui lòng thử lại.');
    }
  };

    return (
        <div className="contentexport">
        <div className="container-create-import">
            <h1 className="container-title">Tạo Khu Vực Nuôi</h1>
            <form className="form" onSubmit={handleSubmit}>
            <div className="form-label">
                Vị Trí:
                <input
                className="form-input"
                type="text"
                name="vi_tri"
                value={formData.vi_tri}
                onChange={handleInputChange}
                />
            </div>
            <div className="form-label">
                Sức Chứa Tối Đa:
                <input
                className="form-input"
                type="number"
                name="suc_chua_toi_da"
                value={formData.suc_chua_toi_da}
                onChange={handleInputChange}
                />
            </div>
            <div className="form-label">
                Trạng Thái Hoạt Động:
                <input
                className="form-input"
                type="text"
                name="trang_thai_hoat_dong"
                value={formData.trang_thai_hoat_dong}
                onChange={handleInputChange}
                />
            </div>
            <div className="form-label">
                Diện Tích:
                <input
                className="form-input"
                type="number"
                name="dien_tich"
                value={formData.dien_tich}
                onChange={handleInputChange}
                />
            </div>
            <div className="form-label">
                Chiều Cao:
                <input
                className="form-input"
                type="number"
                name="chieu_cao"
                value={formData.chieu_cao}
                onChange={handleInputChange}
                />
            </div>
            <div className="form-label">
                Loại Môi Trường:
                <input
                className="form-input"
                type="text"
                name="loai_moi_truong"
                value={formData.loai_moi_truong}
                onChange={handleInputChange}
                />
            </div>
            <button type="submit" className="button-primary" disabled={loading}>
                {loading ? "Đang thêm khu vực..." : "Thêm Khu Vực"}
            </button>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
            </form>
        </div>
        </div>
    );  
}
