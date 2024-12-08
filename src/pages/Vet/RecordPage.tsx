import * as React from "react";
import { useState } from "react";
import { HealthRecord, mockHealthRecords } from "./MockRecords";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "type", headerName: "Loại", flex: 1 },
  { field: "name", headerName: "Tên khoa học", flex: 1.5 },
  { field: "ageOrCount", headerName: "Tuổi/Số lượng", flex: 1 },
  { field: "health", headerName: "Tình trạng sức khỏe", flex: 1 },
  { field: "height", headerName: "Chiều cao", flex: 1 },
  { field: "weight", headerName: "Cân nặng", flex: 1 },
];

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function RecordComponent() {
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(
    null
  );

  const handleRowClick = (params: any) => {
    const record = mockHealthRecords.find((r) => r.id === params.id);
    setSelectedRecord(record || null);
  };

  const handleCloseModal = () => {
    setSelectedRecord(null);
  };

  return (
    <>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={mockHealthRecords}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          onRowClick={handleRowClick}
          sx={{ border: 0 }}
        />
      </Paper>

      {/* Modal for detailed information */}
      <Modal open={!!selectedRecord} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          {selectedRecord && (
            <>
              <Typography variant="h5" gutterBottom>
                Thông Tin Chi Tiết Hồ Sơ
              </Typography>

              {/* Record Creator Details */}
              <Typography variant="subtitle1" gutterBottom>
                Người Tạo Hồ Sơ
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Họ và Tên</TableCell>
                      <TableCell>{selectedRecord.creatorName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>CCCD</TableCell>
                      <TableCell>{selectedRecord.creatorID}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Health Information */}
              <Typography variant="subtitle1" gutterBottom>
                Hồ Sơ Sức Khỏe
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID Hồ Sơ</TableCell>
                      <TableCell>Loại</TableCell>
                      <TableCell>Giới tính</TableCell>
                      <TableCell>Tình Trạng Sức Khỏe</TableCell>
                      <TableCell>Chiều Cao</TableCell>
                      <TableCell>Cân Nặng</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{selectedRecord.id}</TableCell>
                      <TableCell>{selectedRecord.type}</TableCell>
                      <TableCell>{selectedRecord.sex}</TableCell>
                      <TableCell>{selectedRecord.health}</TableCell>
                      <TableCell>{selectedRecord.height}</TableCell>
                      <TableCell>{selectedRecord.weight}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Vaccination History */}
              <Typography variant="subtitle1" gutterBottom>
                Lịch Sử Tiêm Chủng
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID Tiêm Chủng</TableCell>
                      <TableCell>Ngày Tiêm</TableCell>
                      <TableCell>Phương Pháp Tiêm</TableCell>
                      <TableCell>Loại Vaccine</TableCell>
                      <TableCell>Liều Lượng</TableCell>
                      <TableCell>Phản Ứng Sau Tiêm</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{selectedRecord.vaccinationID}</TableCell>
                      <TableCell>{selectedRecord.vaccinationDate}</TableCell>
                      <TableCell>{selectedRecord.vaccinationMethod}</TableCell>
                      <TableCell>{selectedRecord.vaccineType}</TableCell>
                      <TableCell>{selectedRecord.vaccineDose}</TableCell>
                      <TableCell>
                        {selectedRecord.vaccinationReaction}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Treatment History */}
              <Typography variant="subtitle1" gutterBottom>
                Lịch Sử Điều Trị
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID Điều Trị</TableCell>
                      <TableCell>Triệu Chứng</TableCell>
                      <TableCell>Chẩn Đoán</TableCell>
                      <TableCell>Kết Quả</TableCell>
                      <TableCell>Loại Thuốc</TableCell>
                      <TableCell>Ghi Chú</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{selectedRecord.treatmentID}</TableCell>
                      <TableCell>{selectedRecord.symptom}</TableCell>
                      <TableCell>{selectedRecord.diagnosis}</TableCell>
                      <TableCell>{selectedRecord.treatmentResult}</TableCell>
                      <TableCell>{selectedRecord.medicineType}</TableCell>
                      <TableCell>{selectedRecord.notes}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Additional Notes */}
              <Typography variant="subtitle1" gutterBottom>
                Ghi Chú Thêm
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedRecord.notes}
              </Typography>

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleCloseModal}
              >
                Trở về
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
