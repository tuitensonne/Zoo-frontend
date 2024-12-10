// import React, { useState } from "react";
// import "./ExportRecord.component.css";
// import "../office-employee.component.css";
// import { useEffect } from "react"; 
// // import { useNavigate } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import api from "../../../api"; // Import API đã cấu hình
// export function ExportRecordsComponent({ exportRecords, onAddRecord }) {
//     const [searchId, setSearchId] = useState("");
//     const [searchName, setSearchName] = useState("");
//     const navigate = useNavigate(); // Sử dụng hook điều hướng
    
    
//     // console.log("Hàm onAddRecord nhận được:", onAddRecord);
//     // useEffect(() => {
//     //     console.log("Danh sách phiếu xuất được truyền xuống:", exportRecords);
//     // }, [exportRecords]);


//     // Bộ lọc dữ liệu
//     const filteredRecords = exportRecords.filter(record =>
//         record.id.toString().includes(searchId) &&
//         record.species.toLowerCase().includes(searchName.toLowerCase())
//     );
//     const handleViewDetails = (id) => {
//         navigate(`details/${id}`); // Điều hướng tới trang chi tiết
//     };

//     return (
//         <div className="export-records-container">
//             <h2>Danh Sách Phiếu Xuất Động Vật</h2>
//             <div className="search-bar">
//                 <input
//                     type="text"
//                     placeholder="Nhập ID Phiếu Xuất..."
//                     value={searchId}
//                     onChange={(e) => setSearchId(e.target.value)}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Nhập Loài Động Vật..."
//                     value={searchName}
//                     onChange={(e) => setSearchName(e.target.value)}
//                 />
//                 <button>Tìm Kiếm</button>
//             </div>
//             <table className="export-records-table">
//                 <thead>
//                     <tr>
//                         <th>ID Phiếu Xuất</th>
//                         <th>Loài Động Vật</th>
//                         <th>Ngày Xuất</th>
//                         <th>Số Lượng</th>
//                         <th>Lý Do Xuất</th>
//                         <th>Đối Tác</th>
//                         <th>Nhân Viên (CCCD)</th>
//                         <th>Chi Tiết</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredRecords.map(record => (
//                         <tr key={record.id}>
//                             <td>{record.id}</td>
//                             <td>{record.species}</td>
//                             <td>{record.date}</td>
//                             <td>{record.quantity}</td>
//                             <td>{record.reason}</td>
//                             <td>{record.partner}</td>
//                             <td>{record.staff}</td>
//                             <td>
//                                 <button  className="detail-button"
//                                          onClick={() => handleViewDetails(record.id)}
//                                 >
//                                     Xem
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }


// export default function ExportComponent() {
//     const navigate = useNavigate();
//     const [exportRecords, setExportRecords] = useState([]);
    
//      // Gọi API để lấy danh sách phiếu xuất từ Backend
//      useEffect(() => {
//         const fetchExportRecords = async () => {
//             try {
//                 const response = await api.get('http://localhost:8088/phieu-xuat-dong-vat/all');
//                 console.log("Dữ liệu nhận được:", response.data); // Log dữ liệu để kiểm tra
//                 setExportRecords(response.data); // Cập nhật dữ liệu từ Backend
//             } 
//             catch (error) {
//                 console.error("Lỗi khi lấy dữ liệu phiếu xuất:", error);
//             }
//         };

//         fetchExportRecords();
//     }, []);

//     const handleCreateRecord = () => {
//         navigate("choose-export"); // Điều hướng đến trang chọn loại phiếu xuất
//     };
//     // Hàm callback để thêm phiếu xuất mới vào bảng
//     const handleAddRecord = (newRecord) => {
//         const { groupId, ...filteredRecord } = newRecord; // Loại bỏ groupId
//         // console.log("Danh sách phiếu xuất sau khi thêm:", newRecord); 
//         setExportRecords((prevRecords) => [...prevRecords, filteredRecord]);
//     };
// // const handleAddRecord = (newRecord) => {
// //     setExportRecords(prevRecords => {
// //         const updatedRecords = [...prevRecords, newRecord];
// //         console.log("Danh sách phiếu xuất sau khi thêm:", updatedRecords); // Kiểm tra
// //         return updatedRecords;
// //     });
// // };


//      // Đặt biến gọi ExportRecordsComponent
//     return (
//             <div className="contentexport">
//                 <button className="create-button" onClick={handleCreateRecord}>
//                     Tạo Phiếu Xuất Động Vật
//                 </button>
//                 <ExportRecordsComponent exportRecords={exportRecords} onAddRecord={handleAddRecord} />
//             </div>
//     );
// }


import React, { useState, useEffect } from "react";
import "./ExportRecord.component.css";
import "../office-employee.component.css";
import { useNavigate } from "react-router-dom";
import api from "../../../api"; // Import API đã cấu hình

export function ExportRecordsComponent({ exportRecords, onAddRecord }) {
    const [searchId, setSearchId] = useState("");
    const [searchName, setSearchName] = useState("");
    const navigate = useNavigate(); // Sử dụng hook điều hướng
    
    // Bộ lọc dữ liệu
    const filteredRecords = exportRecords.filter(record =>
        record.id_px.toString().includes(searchId) &&
        record.ten_khoa_hoc.toLowerCase().includes(searchName.toLowerCase())
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
                        <tr key={record.id_px}>
                            <td>{record.id_px}</td>
                            <td>{record.ten_khoa_hoc}</td>
                            <td>{new Date(record.ngay_xuat).toLocaleDateString()}</td>
                            <td>{record.so_luong}</td>
                            <td>{record.ly_do_xuat}</td>
                            <td>{record.id_dt}</td>
                            <td>{record.cccd}</td>
                            <td>
                                <button  className="detail-button"
                                         onClick={() => handleViewDetails(record.id_px)}
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
    const [exportRecords, setExportRecords] = useState([]);
    
    // Gọi API để lấy danh sách phiếu xuất từ Backend
    useEffect(() => {
        const fetchExportRecords = async () => {
            try {
                const response = await api.get('http://localhost:8088/phieu-xuat-dong-vat/all');
                // console.log("Dữ liệu nhận được:", response.data); // Log dữ liệu để kiểm tra
                setExportRecords(response.data); // Cập nhật dữ liệu từ Backend
            } 
            catch (error) {
                console.error("Lỗi khi lấy dữ liệu phiếu xuất:", error);
            }
        };

        fetchExportRecords();
    }, []);

    const handleCreateRecord = () => {
        navigate("choose-export"); // Điều hướng đến trang chọn loại phiếu xuất
    };

    // Hàm callback để thêm phiếu xuất mới vào bảng
    const handleAddRecord = (newRecord) => {
        const { groupId, ...filteredRecord } = newRecord; // Loại bỏ groupId
        setExportRecords((prevRecords) => [...prevRecords, filteredRecord]);
    };

    return (
        <div className="contentexport">
            <button className="create-button" onClick={handleCreateRecord}>
                Tạo Phiếu Xuất Động Vật
            </button>
            <ExportRecordsComponent exportRecords={exportRecords} onAddRecord={handleAddRecord} />
        </div>
    );
}
