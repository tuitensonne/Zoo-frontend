import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'; 
import "./healthDetails.component.css";
// import { mockHealthRecords } from "../../../../pages/vet-employee-page/mockHealthRecords"; 
import { getHealthRecordsDetails } from "../../../../services/healthRecordService";
import { typeMapping, sexMapping } from "../../../../services/enumMappings";


const HealthRecordDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [record, setRecord] = useState(null); // Dữ liệu hồ sơ
    const [loading, setLoading] = useState(true); // Trạng thái đang tải
    const [error, setError] = useState(null); // Trạng thái lỗi

    // const record = mockHealthRecords.find(record => record.id === parseInt(id));

    useEffect(() => {
        const getRecord = async () => {
            try {
                const data = await getHealthRecordsDetails(id);
                setRecord(data);
                console.log("Dữ liệu từ BE:", data);
            } catch (err) {
                console.log("Dữ liệu từ BE:", id);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getRecord();
    }, [id]);

    if (loading) {
        return <p>Đang tải dữ liệu...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

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
                    <tr key={record.ID_ho_so_suc_khoe}>
                        <td>{record.ten_thu_y}</td>
                        <td>{record.cccd_thu_y}</td>
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
                    <tr key={record.ID_ho_so_suc_khoe}>
                        <td>{record.ID_ho_so_suc_khoe}</td>
                        <td>{typeMapping[record.loai]}</td>
                        <td>{sexMapping[record.gioi_tinh]}</td>
                        <td>{record.tinh_trang}</td>
                        <td>{record.chieu_cao}</td>
                        <td>{record.can_nang}</td>
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
                {record.lich_su_tiem_chung?.map((vaccine) => (
                        <tr key={vaccine.id_tc}>
                            <td>{vaccine.id_tc}</td>
                            <td>{vaccine.ngay_tiem}</td>
                            <td>{vaccine.phuong_phap_tiem}</td>
                            <td>{vaccine.loai_vaccine}</td>
                            <td>{vaccine.lieu_luong}</td>
                            <td>{vaccine.phan_ung_sau_tiem}</td>
                        </tr>
                    ))}
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
                    {record.lich_su_dieu_tri?.map((treatment) => (
                        <tr key={treatment.id_lsdt}>
                            <td>{treatment.id_lsdt}</td>
                            <td>{treatment.trieu_chung}</td>
                            <td>{treatment.chan_doan}</td>
                            <td>{treatment.ket_qua}</td>
                            <td>{treatment.loai_thuoc}</td>
                            <td>{treatment.ghi_chu}</td>
                        </tr>
                    ))}
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
