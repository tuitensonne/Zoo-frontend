import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";

interface TreatmentData {
  healthRecordId: string;
  symptoms: string;
  diagnosis: string;
  result: string;
  medicationType: string;
  notes: string;
}

export default function TreatmentComponent() {
  const navigate = useNavigate();
  const [treatmentData, setTreatmentData] = useState<TreatmentData>({
    healthRecordId: "",
    symptoms: "",
    diagnosis: "",
    result: "",
    medicationType: "",
    notes: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTreatmentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Data saved:", treatmentData);
    // Call API here
  };

  const handleBack = () => {
    console.log("Back to previous page");
    navigate("/vet/records");
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 3,
        borderRadius: 2,
        boxShadow: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" mb={3} textAlign="center">
        Tạo Lần Điều Trị
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="ID Hồ Sơ Sức Khỏe"
          name="healthRecordId"
          value={treatmentData.healthRecordId}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Triệu Chứng"
          name="symptoms"
          value={treatmentData.symptoms}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Chẩn Đoán"
          name="diagnosis"
          value={treatmentData.diagnosis}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Kết Quả"
          name="result"
          value={treatmentData.result}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Loại Thuốc"
          name="medicationType"
          value={treatmentData.medicationType}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Ghi Chú"
          name="notes"
          value={treatmentData.notes}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
        />
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
        <Button variant="contained" onClick={handleSave}>
          Lưu Điều Trị
        </Button>
        <Button variant="outlined" onClick={handleBack}>
          Trở Về
        </Button>
      </Stack>
    </Box>
  );
}
