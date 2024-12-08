import React, { useState } from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Paper,
} from "@mui/material";
import { AnimalExportRecord, mockExportRecords } from "./mockExportRecords";

// Column Definitions
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "species", headerName: "Loài", flex: 1 },
  { field: "date", headerName: "Ngày", flex: 1 },
  { field: "quantity", headerName: "Số lượng", flex: 1 },
  { field: "reason", headerName: "Lý do", flex: 1.5 },
  { field: "partner", headerName: "Đối tác", flex: 1 },
  { field: "staff", headerName: "Nhân viên", flex: 1 },
];

export default function AnimalExportComponent() {
  const [selectedRecord, setSelectedRecord] =
    useState<AnimalExportRecord | null>(null);

  const handleRowClick = (params: GridRowParams) => {
    const record = mockExportRecords.find((r) => r.id === params.row.id);
    setSelectedRecord(record || null);
  };

  const handleClose = () => setSelectedRecord(null);

  return (
    <>
      {/* DataGrid */}
      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={mockExportRecords}
          columns={columns}
          onRowClick={handleRowClick}
          sx={{ border: 0 }}
        />
      </Paper>

      {/* Dialog for Details */}
      <Dialog
        open={!!selectedRecord}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Thông Tin Chi Tiết Phiếu Xuất</DialogTitle>
        <DialogContent>
          {selectedRecord && (
            <>
              <Typography variant="h6" gutterBottom>
                Thông Tin Chi Tiết
              </Typography>
              <Typography>ID: {selectedRecord.id}</Typography>
              <Typography>Loài: {selectedRecord.species}</Typography>
              <Typography>Ngày: {selectedRecord.date}</Typography>
              <Typography>Số lượng: {selectedRecord.quantity}</Typography>
              <Typography>Lý do: {selectedRecord.reason}</Typography>
              <Typography>Đối tác: {selectedRecord.partner}</Typography>
              <Typography>Nhân viên: {selectedRecord.staff}</Typography>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
