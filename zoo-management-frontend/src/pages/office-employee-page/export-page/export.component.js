import React, { useState } from "react";
import "./ExportRecord.component.css";
import "../office-employee.component.css";
// import { useEffect } from "react"; 
// import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function ExportRecordsComponent({ exportRecords, onAddRecord }) {
    const [searchId, setSearchId] = useState("");
    const [searchName, setSearchName] = useState("");
    const navigate = useNavigate(); // Sử dụng hook điều hướng
    
    
    // console.log("Hàm onAddRecord nhận được:", onAddRecord);
    // useEffect(() => {
    //     console.log("Danh sách phiếu xuất được truyền xuống:", exportRecords);
    // }, [exportRecords]);


    // Bộ lọc dữ liệu
    const filteredRecords = exportRecords.filter(record =>
        record.id.toString().includes(searchId) &&
        record.species.toLowerCase().includes(searchName.toLowerCase())
    );
    const handleViewDetails = (id) => {
        navigate(`details/${id}`); // Điều hướng tới trang chi tiết
    };

    return (
        <div className="export-records-container">
            <h2>Danh Sách Phiếu Xuất Động Vật</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Nhập ID Phiếu Xuất..."
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nhập Loài Động Vật..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <button>Tìm Kiếm</button>
            </div>
            <table className="export-records-table">
                <thead>
                    <tr>
                        <th>ID Phiếu Xuất</th>
                        <th>Loài Động Vật</th>
                        <th>Ngày Xuất</th>
                        <th>Số Lượng</th>
                        <th>Lý Do Xuất</th>
                        <th>Đối Tác</th>
                        <th>Nhân Viên (CCCD)</th>
                        <th>Chi Tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRecords.map(record => (
                        <tr key={record.id}>
                            <td>{record.id}</td>
                            <td>{record.species}</td>
                            <td>{record.date}</td>
                            <td>{record.quantity}</td>
                            <td>{record.reason}</td>
                            <td>{record.partner}</td>
                            <td>{record.staff}</td>
                            <td>
                                <button  className="detail-button"
                                         onClick={() => handleViewDetails(record.id)}
                                >
                                    Xem
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default function ExportComponent() {
    const navigate = useNavigate();
    const [exportRecords, setExportRecords] = useState([
        { id: 1, species: "homo sapiens sapiens", date: "2024-12-01", quantity: 5, reason: "Cho thuê", partner: "Đối Tác A", staff: "123456789012" },
        { id: 2, species: "homo sapiens sapiens", date: "2024-12-02", quantity: 10, reason: "Chết", partner: "Đối Tác B", staff: "987654321098" },
        { id: 3, species: "Hổ", date: "2024-12-05", quantity: 7, reason: "Chuyển giao", partner: "Công ty A", staff: "234567890123" },
        { id: 4, species: "Sư Tử", date: "2024-12-06", quantity: 2, reason: "Bán", partner: "Công ty B", staff: "345678901234" },
        { id: 5, species: "Voi", date: "2024-12-07", quantity: 1, reason: "Trao đổi", partner: "Công ty C", staff: "456789012345" },
        { id: 6, species: "Khỉ", date: "2024-12-08", quantity: 4, reason: "Chuyển giao", partner: "Công ty D", staff: "567890123456" },
        { id: 7, species: "Hươu", date: "2024-12-09", quantity: 3, reason: "Chuyển giao", partner: "Công ty E", staff: "678901234567" },
        { id: 8, species: "Hổ", date: "2024-12-10", quantity: 6, reason: "Bán", partner: "Công ty F", staff: "789012345678" },
        { id: 9, species: "Sư Tử", date: "2024-12-11", quantity: 8, reason: "Cho thuê", partner: "Công ty G", staff: "890123456789" },
        { id: 10, species: "Voi", date: "2024-12-12", quantity: 2, reason: "Trao đổi", partner: "Công ty H", staff: "901234567890" },
        { id: 11, species: "Khỉ", date: "2024-12-13", quantity: 5, reason: "Chuyển giao", partner: "Công ty I", staff: "012345678901" },
        { id: 12, species: "Hươu", date: "2024-12-14", quantity: 4, reason: "Chết", partner: "Công ty J", staff: "123456789012" },
    ]);
    
    const handleCreateRecord = () => {
        navigate("choose-export"); // Điều hướng đến trang chọn loại phiếu xuất
    };
    // Hàm callback để thêm phiếu xuất mới vào bảng
    const handleAddRecord = (newRecord) => {
        const { groupId, ...filteredRecord } = newRecord; // Loại bỏ groupId
        // console.log("Danh sách phiếu xuất sau khi thêm:", newRecord); 
        setExportRecords((prevRecords) => [...prevRecords, filteredRecord]);
    };
// const handleAddRecord = (newRecord) => {
//     setExportRecords(prevRecords => {
//         const updatedRecords = [...prevRecords, newRecord];
//         console.log("Danh sách phiếu xuất sau khi thêm:", updatedRecords); // Kiểm tra
//         return updatedRecords;
//     });
// };


     // Đặt biến gọi ExportRecordsComponent
    return (
            <div className="contentexport">
                <button className="create-button" onClick={handleCreateRecord}>
                    Tạo Phiếu Xuất Động Vật
                </button>
                <ExportRecordsComponent exportRecords={exportRecords} onAddRecord={handleAddRecord} />
            </div>
    );
}
