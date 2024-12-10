import React, { useState } from "react";
import "./HealthRecord.component.css";

export default function HealthRecordsComponent() {
    const [searchId, setSearchId] = useState("");
    const [searchName, setSearchName] = useState("");

    const healthRecords = [
        { id: 1, type: "Cá Thể", name: "Panthera leo", ageOrCount: "5 tuổi", health: "Khỏe mạnh", height: "125 cm", weight: "125 kg" },
        { id: 2, type: "Nhóm", name: "Equus ferus caballus", ageOrCount: "20 con", health: "Khỏe mạnh", height: "125 cm", weight: "125 kg" },
        // Thêm các bản ghi khác...
    ];

    const filteredRecords = healthRecords.filter(record =>
        record.id.toString().includes(searchId) &&
        record.name.toLowerCase().includes(searchName.toLowerCase())
    );

    return (
        <div className="health-records-container">
            <h2>Danh Sách Hồ Sơ Sức Khỏe</h2>
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
                                <button className="detail-button">Xem Chi Tiết</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
