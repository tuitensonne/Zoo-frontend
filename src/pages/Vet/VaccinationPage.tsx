import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";

interface VaccinationData {
  healthRecordId: string;
  vacinationDay: string;
  injectionMethod: string;
  typeOfVaccine: string;
  dosage: string;
  postInjectionReaction: string;
}

export default function VaccinationComponent() {
  const navigate = useNavigate();
  const [vaccinationData, setVaccinationData] = useState<VaccinationData>({
    healthRecordId: "",
    vacinationDay: "",
    injectionMethod: "",
    typeOfVaccine: "",
    dosage: "",
    postInjectionReaction: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setVaccinationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Data saved:", vaccinationData);
    // API Call can be added here
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
        Tạo Lần Tiêm Chủng
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="ID Hồ Sơ Sức Khỏe"
          name="healthRecordId"
          value={vaccinationData.healthRecordId}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Ngày Tiêm Chủng"
          name="vacinationDay"
          type="date"
          value={vaccinationData.vacinationDay}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }} // Ensure label stays above date input
        />
        <TextField
          label="Phương Pháp Tiêm"
          name="injectionMethod"
          value={vaccinationData.injectionMethod}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Loại Vaccine"
          name="typeOfVaccine"
          value={vaccinationData.typeOfVaccine}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Liều Lượng"
          name="dosage"
          value={vaccinationData.dosage}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Phản Ứng Sau Tiêm"
          name="postInjectionReaction"
          value={vaccinationData.postInjectionReaction}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
        />
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
        <Button variant="contained" onClick={handleSave}>
          Lưu Tiêm Chủng
        </Button>
        <Button variant="outlined" onClick={handleBack}>
          Trở Về
        </Button>
      </Stack>
    </Box>
  );
}
