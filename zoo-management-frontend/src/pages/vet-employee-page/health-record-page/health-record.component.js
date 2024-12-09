import React, { useState, useEffect, useCallback, useRef } from "react";
import "./health-record.component.css";
import { Link } from "react-router-dom";
import { getHealthRecords } from "../../../services/healthRecordService";
import { typeMapping } from "../../../services/enumMappings";


export default function HealthRecordsComponent() {
    const [searchId, setSearchId] = useState("");
    const [searchName, setSearchName] = useState("");
    const [tempSearchId, setTempSearchId] = useState(""); // Tạm thời lưu giá trị nhập
    const [tempSearchName, setTempSearchName] = useState("");
    const [healthRecords, setHealthRecords] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const debounceTimeout = useRef(null); 

    const fetchHealthRecords = useCallback(async () => {
        try {
            setLoading(true);
            console.log("Dữ liệu từ BE:");
            const data = await getHealthRecords(currentPage, recordsPerPage, searchId, searchName);
            setHealthRecords(data.records);
            console.log("Dữ liệu từ BE:", data);
            setTotalPages(Math.ceil(data.totalRecords / recordsPerPage));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [currentPage, recordsPerPage, searchId, searchName]);

    useEffect(() => {
        fetchHealthRecords();
    }, [fetchHealthRecords]);

    // const handleSearch = () => {
    //     setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
    //     fetchHealthRecords();
    // };

    const handleInputChange = (key, value) => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current); // Xóa timeout cũ
        }

        if (key === "id") {
            setTempSearchId(value); // Cập nhật giá trị tạm thời
        } else if (key === "name") {
            setTempSearchName(value);
        }

        debounceTimeout.current = setTimeout(() => {
            if (key === "id") {
                setSearchId(value); // Cập nhật giá trị chính thức sau debounce
            } else if (key === "name") {
                setSearchName(value);
            }
        }, 3000); // Debounce 2 giây
    };

    const handleSearchButtonClick = () => {
        setSearchId(tempSearchId);
        setSearchName(tempSearchName);
        setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
    };

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>Lỗi khi tải dữ liệu: {error}</p>;

    return (
        <div className="health-records-container">
            <h2 className="titleHoSoSucKhoe">Danh Sách Hồ Sơ Sức Khỏe</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Nhập ID..."
                    value={tempSearchId}
                    onChange={(e) => handleInputChange("id", e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nhập Tên Khoa Học..."
                    value={tempSearchName}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                />
                <button onClick={handleSearchButtonClick}>Tìm Kiếm</button>
            </div>
            <table className="health-records-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Loại</th>
                        <th>Tên Khoa Học</th>
                        <th>Tuổi/Số Lượng</th>
                        <th>Tình Trạng Sức Khỏe</th>
                        <th>Chiều Cao</th>
                        <th>Cân Nặng</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {healthRecords.map((record) => (
                        <tr key={record.id_ho_so_suc_khoe}>
                            <td>{record.id_ho_so_suc_khoe}</td>
                            <td>{typeMapping[record.loai]}</td>
                            <td>{record.ten_khoa_hoc}</td>
                            <td>{record.tuoi_or_soluong}</td>
                            <td>{record.tinh_trang_suc_khoe}</td>
                            <td>{record.chieu_cao}</td>
                            <td>{record.can_nang}</td>
                            <td>
                                <Link to={`/vet/hssk/details/${record.id_ho_so_suc_khoe}`}>
                                    <button className="detail-button">Xem Chi Tiết</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Trước
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={currentPage === index + 1 ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Sau
                </button>
            </div>
        </div>
    );
}
