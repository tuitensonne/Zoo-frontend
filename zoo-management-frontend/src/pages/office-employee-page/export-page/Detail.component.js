// import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Detail.component.css";
import "../office-employee.component.css";

import React, { useState, useEffect } from "react";
import api from "../../../api"; // Import API đã cấu hình

export function ExportDetailsComponent() {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();

    // // Dữ liệu mở rộng
    // const ExportRecords = [
    //     {
    //         id: 1,
    //         creator: { name: "Nguyễn Văn A", address: "123 Đường ABC, TP.HCM", cccd: "123456789012" },
    //         partner: { id: "DT001", name: "Đối Tác A" },
    //         animal: {
    //             scientificName: "Homo sapiens sapiens",
    //             commonName: "Người",
    //             rarity: "Thông thường",
    //             foodType: "Thực phẩm hỗn hợp",
    //             habitat: "Môi trường sống đô thị",
    //         },
    //     },
    //     {
    //         id: 2,
    //         creator: { name: "Nguyễn Văn B", address: "456 Đường DEF, Hà Nội", cccd: "987654321098" },
    //         partner: { id: "DT002", name: "Đối Tác B" },
    //         animal: {
    //             scientificName: "Panthera tigris",
    //             commonName: "Hổ",
    //             rarity: "Hiếm",
    //             foodType: "Thịt sống",
    //             habitat: "Rừng nhiệt đới",
    //         },
    //     },
    //     // Thêm các bản ghi khác...
    // ];
    // // Tìm phiếu xuất dựa trên ID
    // const record = ExportRecords.find((r) => r.id.toString() === id);

    // if (!record) {
    //     return <p>Không tìm thấy phiếu xuất!</p>;
    // }
    const [record, setRecord] = useState(null); // State để lưu trữ dữ liệu phiếu xuất

    // Gọi API để lấy chi tiết phiếu xuất khi component được render
    useEffect(() => {
        const fetchExportDetails = async () => {
            try {
                const response = await api.get(`http://localhost:8088/phieu-xuat-dong-vat/details/${id}`);
                // console.log("Dữ liệu nhận được từ API:", response.data);
                setRecord(response.data[0]); // Cập nhật state với dữ liệu từ API
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết phiếu xuất:", error);
            }
        };

        fetchExportDetails();
    }, [id]); // Chỉ gọi lại API khi ID thay đổi

    if (!record) {
        return <p>Đang tải dữ liệu...</p>; // Hiển thị thông báo chờ khi dữ liệu chưa được tải
    }
    return (
        <div className="details-container">
            <h2>Thông Tin Chi Tiết Phiếu Xuất</h2>
            {/* Người Tạo Phiếu */}
            <div className="section">
                <h3>Người Tạo Phiếu Xuất</h3>
                <div className="table">
                    <div className="table-row">
                        <div className="table-cell">Họ và Tên:</div>
                        <div className="table-cell">{record.ten_nguoi_tao || 'Không có dữ liệu'}</div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell">Địa Chỉ:</div>
                        <div className="table-cell">{record.address || 'Không có dữ liệu' }</div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell">CCCD:</div>
                        <div className="table-cell">{record.cccd || 'Không có dữ liệu'}</div>
                    </div>
                </div>
            </div>

            {/* Đối Tác */}
            <div className="section">
                <h3>Đối Tác</h3>
                <div className="table">
                    <div className="table-row">
                        <div className="table-cell">ID Đối Tác:</div>
                        <div className="table-cell">{record.id_dt || 'Không có dữ liệu'}</div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell">Tên Đối Tác:</div>
                        <div className="table-cell">{record.ten_doi_tac || 'Không có dữ liệu'}</div>
                    </div>
                </div>
            </div>

            {/* Thông Tin Động Vật */}
            <div className="section">
                <h3>Thông Tin Loài Động Vật</h3>
                <div className="table">
                    <div className="table-row">
                        <div className="table-cell">Tên Khoa Học:</div>
                        <div className="table-cell">{record.ten_khoa_hoc || 'Không có dữ liệu'}</div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell">Tên Loài:</div>
                        <div className="table-cell">{record.ten_loai|| 'Không có dữ liệu'}</div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell">Độ Quý Hiếm:</div>
                        <div className="table-cell">{record.do_quy_hiem || 'Không có dữ liệu'}</div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell">Loại Thức Ăn:</div>
                        <div className="table-cell">{record.loai_thuc_an || 'Không có dữ liệu'}</div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell">Loại Môi Trường Sống:</div>
                        <div className="table-cell">{record.loai_moi_truong_song || 'Không có dữ liệu'}</div>
                    </div>
                </div>
            </div>
            <button className="back-button" onClick={() => navigate(-1)}>
                Trở Về
            </button>
        </div>
        
    );
}


export default function DetailComponent() {
    // Đặt biến gọi ExportRecordsComponent
    const DetailComponent = ExportDetailsComponent;
   return (
           <div className="contentexport">
               <ExportDetailsComponent /> {DetailComponent}
           </div>
   );
}