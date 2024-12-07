import React, { useState } from "react";
import "./health-record.component.css";
import { Link } from "react-router-dom";
import { mockHealthRecords } from "../../../pages/vet-employee-page/mockHealthRecords";

export default function HealthRecordsComponent() {
    const [searchId, setSearchId] = useState("");
    const [searchName, setSearchName] = useState("");


    const filteredRecords = mockHealthRecords.filter(record =>
        record.id.toString().includes(searchId) &&
        record.name.toLowerCase().includes(searchName.toLowerCase())
    );

    return (
        <div className="health-records-container">
            <h2 className="titleHoSoSucKhoe">Danh Sách Hồ Sơ Sức Khỏe</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Nhập ID..."
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nhập Tên Khoa Học..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <button>Tìm Kiếm</button>
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
                    {filteredRecords.map(record => (
                        <tr key={record.id}>
                            <td>{record.id}</td>
                            <td>{record.type}</td>
                            <td>{record.name}</td>
                            <td>{record.ageOrCount}</td>
                            <td>{record.health}</td>
                            <td>{record.height}</td>
                            <td>{record.weight}</td>
                            <td>
                                {/* Thêm link tới trang chi tiết */}
                                <Link to={`./details/${record.id}`}>
                                    <button className="detail-button">Xem Chi Tiết</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
