import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './khu_vuc_nuoi.component.css';
import { useNavigate } from 'react-router-dom';

export default function KhuVucNuoiComponent() {
    const [khuVucList, setKhuVucList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchId, setSearchId] = useState('');
    const recordsPerPage = 10;
    const navigate = useNavigate();
      

    const handleInputChange = (e) => {
        setSearchId(e.target.value);
    };

    const handleSearch = async () => {
        if (!searchId) {
            axios
            .get(`http://localhost:8088/khu-vuc-nuoi?page=${currentPage}&limit=${recordsPerPage}`)
            .then((response) => {
                setKhuVucList(response.data.data);
            })
            .catch((error) => console.error('Error fetching khu vuc nuoi data:', error));
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8088/khu-vuc-nuoi/${searchId}`);
            setKhuVucList(response.data.data);
        } catch (error) {
            console.log(error)
        } 
    };
  // Lấy tổng số trang
    useEffect(() => {
        axios
        .get(`http://localhost:8088/khu-vuc-nuoi/total-pages?limit=${recordsPerPage}`)
        .then((response) => {
            setTotalPages(response.data.data);
        })
        .catch((error) => console.error('Error fetching total pages:', error));
    }, [recordsPerPage]);

    // Lấy danh sách khu vực nuôi
    useEffect(() => {
        axios
        .get(`http://localhost:8088/khu-vuc-nuoi?page=${currentPage}&limit=${recordsPerPage}`)
        .then((response) => {
            setKhuVucList(response.data.data);
        })
        .catch((error) => console.error('Error fetching khu vuc nuoi data:', error));
    }, [currentPage, recordsPerPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleCreate = () => {
        navigate('/office/createKVN')
    };

    return (
        <div className="contentexport">
        <div className="khu-vuc-container">
            <h1>Danh sách khu vực nuôi</h1>
            <div className="search-bar">
                <div>
                    <input 
                        type="text" 
                        placeholder="Nhập ID khu vực..." 
                        value={searchId} 
                        onChange={handleInputChange} 
                    />
                    <button onClick={handleSearch}>Tìm kiếm</button>
                </div>

                
                <button onClick={handleCreate}>Tạo khu vực nuôi mới</button>
            </div>
            <table className="khu-vuc-table">
            <thead>
                <tr>
                <th>ID</th>
                <th>Vị trí</th>
                <th>Sức chứa tối đa</th>
                <th>Trạng thái hoạt động</th>
                <th>Diện tích (m&sup2;)</th>
                <th>Chiều cao (m)</th>
                <th>Loại môi trường</th>
                <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {khuVucList.map((khuVuc) => (
                <tr key={khuVuc.id_kv}>
                    <td>{khuVuc.id_kv}</td>
                    <td>{khuVuc.vi_tri}</td>
                    <td>{khuVuc.suc_chua_toi_da}</td>
                    <td>{khuVuc.trang_thai_hoat_dong}</td>
                    <td>{khuVuc.dien_tich}</td>
                    <td>{khuVuc.chieu_cao}</td>
                    <td>{khuVuc.loai_moi_truong}</td>
                    <td>
                    <button
                        className="detail-button"
                        onClick={() => alert(`Xem chi tiết khu vực nuôi ID: ${khuVuc.id_kv}`)}
                    >
                        Xem chi tiết
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>

            {/* Phân trang */}
            <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                key={index + 1}
                className={`pagination-button ${index + 1 === currentPage ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
                >
                {index + 1}
                </button>
            ))}
            </div>
        </div>
        </div>
    );
}