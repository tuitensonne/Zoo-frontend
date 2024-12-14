import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './record-import-food.component.css';

export default function RecordImportFoodComponent() {
    const [PhieuNhapList, setPhieuNhapList] = useState([]);
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
                .get(`http://localhost:8088/phieu-nhap-thuc-an?page=${currentPage}&limit=${recordsPerPage}`)
                .then((response) => {
                    setPhieuNhapList(response.data.data);
                })
                .catch((error) => console.error('Error fetching phiếu nhập data:', error));
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8088/phieu-nhap-thuc-an/${searchId}`);
            setPhieuNhapList(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Lấy tổng số trang
    useEffect(() => {
        axios
            .get(`http://localhost:8088/phieu-nhap-thuc-an/total-pages?limit=${recordsPerPage}`)
            .then((response) => {
                setTotalPages(response.data.data);
            })
            .catch((error) => console.error('Error fetching total pages:', error));
    }, [recordsPerPage]);

    // Lấy danh sách phiếu nhập
    useEffect(() => {
        axios
            .get(`http://localhost:8088/phieu-nhap-thuc-an?page=${currentPage}&limit=${recordsPerPage}`)
            .then((response) => {
                console.log(response.data.data);
                setPhieuNhapList(response.data.data);
            })
            .catch((error) => console.error('Error fetching phiếu nhập data:', error));
    }, [currentPage, recordsPerPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleCreate = () => {
        navigate('/office/createPNTA');
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa phiếu nhập này?")) {
            try {
                await axios.delete(`http://localhost:8088/phieu-nhap-thuc-an/${id}`);
                alert("Xóa phiếu nhập thành công!");
                // Cập nhật danh sách sau khi xóa
                setPhieuNhapList(PhieuNhapList.filter((item) => item.id_pn !== id));
            } catch (error) {
                console.error('Error deleting phiếu nhập:', error);
                alert("Có lỗi xảy ra khi xóa phiếu nhập.");
            }
        }
    };

    return (
        <div className="contentexport">
            <div className="khu-vuc-container">
                <h1>Danh sách phiếu nhập thức ăn</h1>
                <div className="search-bar">
                    <div>
                        <input
                            type="text"
                            placeholder="Nhập ID phiếu nhập..."
                            value={searchId}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleSearch}>Tìm kiếm</button>
                    </div>
                    <button onClick={handleCreate}>Tạo phiếu nhập mới</button>
                </div>
                <table className="khu-vuc-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>CCCD</th>
                            <th>ID bên cung cấp thức ăn</th>
                            <th>Số lượng</th>
                            <th>Nguồn gốc xuất xứ</th>
                            <th>Ngày nhập</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PhieuNhapList.map((phieu_nhap) => (
                            <tr key={phieu_nhap.id_pn}>
                                <td>{phieu_nhap.id_pn}</td>
                                <td>{phieu_nhap.cccd}</td>
                                <td>{phieu_nhap.id_dt}</td>
                                <td>{phieu_nhap.so_luong}</td>
                                <td>{phieu_nhap.nguon_goc_xuat_xu}</td>
                                <td>{(new Date(phieu_nhap.ngay_nhap)).toISOString().split('T')[0]}</td>
                                <td>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(phieu_nhap.id_pn)}
                                    >
                                        Xóa
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
