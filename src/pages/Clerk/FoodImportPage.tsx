import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function FoodImportComponent() {
  const [formData, setFormData] = useState({
    cccd: "",
    ID_ben_cung_cap_thuc_an: "",
    ten_thuc_an: "",
    ham_luong_dinh_duong: 0,
    ngay_het_han: "",
    ngay_nhap: "",
    so_luong: 0,
    nguon_goc_xuat_xu: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "ham_luong_dinh_duong" ||
        name === "so_luong" ||
        name === "ID_ben_cung_cap_thuc_an"
          ? Number(value)
          : value,
    }));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tạo Phiếu Nhập Thức Ăn
      </Typography>

      <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
        {/* CCCD */}
        <TextField
          label="CCCD"
          fullWidth
          name="cccd"
          value={formData.cccd}
          onChange={handleInputChange}
          margin="normal"
        />

        {/* Food Supplier ID */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              label="ID Bên Cung Cấp Thức Ăn"
              fullWidth
              name="ID_ben_cung_cap_thuc_an"
              value={formData.ID_ben_cung_cap_thuc_an}
              onChange={handleInputChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/add-doi-tac")}
            >
              Thêm Đối Tác
            </Button>
          </Grid>
        </Grid>

        {/* Food Name */}
        <TextField
          label="Tên Thức Ăn"
          fullWidth
          name="ten_thuc_an"
          value={formData.ten_thuc_an}
          onChange={handleInputChange}
          margin="normal"
        />

        {/* Nutritional Content */}
        <TextField
          label="Hàm Lượng Dinh Dưỡng"
          fullWidth
          type="number"
          name="ham_luong_dinh_duong"
          value={formData.ham_luong_dinh_duong}
          onChange={handleInputChange}
          margin="normal"
        />

        {/* Import Date */}
        <TextField
          label="Ngày Nhập"
          fullWidth
          type="date"
          name="ngay_nhap"
          value={formData.ngay_nhap}
          onChange={handleInputChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Expiration Date */}
        <TextField
          label="Ngày Hết Hạn"
          fullWidth
          type="date"
          name="ngay_het_han"
          value={formData.ngay_het_han}
          onChange={handleInputChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Quantity */}
        <TextField
          label="Số Lượng"
          fullWidth
          type="number"
          name="so_luong"
          value={formData.so_luong}
          onChange={handleInputChange}
          margin="normal"
        />

        {/* Origin */}
        <TextField
          label="Nguồn Gốc Xuất Xứ"
          fullWidth
          name="nguon_goc_xuat_xu"
          value={formData.nguon_goc_xuat_xu}
          onChange={handleInputChange}
          margin="normal"
        />

        {/* Submit Button */}
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Tạo Phiếu Nhập"}
          </Button>
        </Box>

        {/* Error Message */}
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
