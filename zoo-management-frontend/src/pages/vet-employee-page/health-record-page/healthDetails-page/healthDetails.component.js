import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import "./healthDetails.component.css";
import { mockHealthRecords } from "../../../../pages/vet-employee-page/mockHealthRecords"; 

const HealthRecordDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const record = mockHealthRecords.find(record => record.id === parseInt(id));

    if (!record) {
        return <p>Không tìm thấy hồ sơ.</p>;
    }

    return (
        <div className="health-record-detail-container">
            <h2 className="form-title">Thông Tin Chi Tiết Hồ Sơ</h2>
            <p className='section-label'>Người Tạo Hồ Sơ</p>
            <hr className="section-divider" />
            <table className="health-records-table">
                <thead>
                    <tr>
                        <th>Họ và Tên</th>
                        <th>CCCD</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={record.id}>
                        <td>{record.creatorName}</td>
                        <td>{record.creatorID}</td>
                    </tr>
                </tbody>
            </table>
            
            <p className='section-label'>Hồ Sơ Sức Khỏe</p>
            <hr className="section-divider" />
            <table className="health-records-table">
                <thead>
                    <tr>
                        <th>ID Hồ Sơ</th>
                        <th>Loại</th>
                        <th>Giới tính</th>
                        <th>Tình Trạng Sức Khỏe</th>
                        <th>Chiều Cao (cm)</th>
                        <th>Cân Nặng (kg)/Số lượng (con)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={record.id}>
                        <td>{record.id}</td>
                        <td>{record.type}</td>
                        <td>{record.sex}</td>
                        <td>{record.health}</td>
                        <td>{record.height}</td>
                        <td>{record.weight}</td>
                    </tr>
                </tbody>
            </table>
              
            <p className='section-label'>Lịch Sử Tiêm Chủng</p>
            <hr className="section-divider" />
            <table className="health-records-table">
                <thead>
                    <tr>
                        <th>ID Tiêm Chủng</th>
                        <th>Ngày Tiêm</th>
                        <th>Phương Pháp Tiêm</th>
                        <th>Loại Vaccine</th>
                        <th>Liều Lượng</th>
                        <th>Phản Ứng Sau Tiêm</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={record.id}>
                        <td>{record.vaccinationID}</td>
                        <td>{record.vaccinationDate}</td>
                        <td>{record.vaccinationMethod}</td>
                        <td>{record.vaccineType}</td>
                        <td>{record.vaccineDose}</td>
                        <td>{record.vaccinationReaction}</td>
                    </tr>
                </tbody>
            </table>

            <p className='section-label'>Lịch Sử Điều Trị</p>
            <hr className="section-divider" />
            <table className="health-records-table">
                <thead>
                    <tr>
                        <th>ID Điều Trị</th>
                        <th>Triệu Chứng</th>
                        <th>Chẩn Đoán</th>
                        <th>Kết quả</th>
                        <th>Loại Thuốc</th>
                        <th>Ghi Chú</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={record.id}>
                        <td>{record.treatmentID}</td>
                        <td>{record.symptom}</td>
                        <td>{record.diagnosis}</td>
                        <td>{record.treatmentResult}</td>
                        <td>{record.medicineType}</td>
                        <td>{record.notes}</td>
                    </tr>
                </tbody>
            </table> 

            <button 
                className="back-button" 
                onClick={() => navigate(-1)} // Quay lại trang trước
            >
                Trở về
            </button>
        </div>
    );
};

export default HealthRecordDetail;
