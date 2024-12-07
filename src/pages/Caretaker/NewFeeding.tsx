import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Modal,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

const NutritionFormWithFloatingCards = () => {
  const [openNutritionModal, setOpenNutritionModal] = useState(false);
  const [openAreaModal, setOpenAreaModal] = useState(false);

  const handleOpenNutritionModal = () => setOpenNutritionModal(true);
  const handleCloseNutritionModal = () => setOpenNutritionModal(false);

  const handleOpenAreaModal = () => setOpenAreaModal(true);
  const handleCloseAreaModal = () => setOpenAreaModal(false);

  return (
    <Box sx={{ width: "90%", margin: "0 auto", mt: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Tạo Khẩu Phần Ăn
          </Typography>

          {/* Form Inputs */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Thông Tin Khẩu Phần Ăn
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">Loại Động Vật Ăn:</Typography>
              <Select fullWidth defaultValue="">
                <MenuItem value="Ăn Cỏ">Ăn Cỏ</MenuItem>
                <MenuItem value="Ăn Thịt">Ăn Thịt</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">Tên Khẩu Phần:</Typography>
              <TextField fullWidth placeholder="Nhập tên khẩu phần" />
            </Grid>
          </Grid>

          {/* Buttons for Floating Cards */}
          <Typography variant="h6" sx={{ mt: 3 }}>
            Gán Khẩu Phần Ăn
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">ID Chế Độ Dinh Dưỡng:</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TextField fullWidth placeholder="1" />
                <Button variant="outlined" onClick={handleOpenNutritionModal}>
                  Xem Chi Tiết
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">Khu Vực Nuôi:</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TextField fullWidth placeholder="Nhập ID khu vực nuôi" />
                <Button variant="outlined" onClick={handleOpenAreaModal}>
                  Xem Chi Tiết
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Modal for Nutrition Details */}
      <Modal
        open={openNutritionModal}
        onClose={handleCloseNutritionModal}
        aria-labelledby="nutrition-details-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            id="nutrition-details-title"
            variant="h6"
            gutterBottom
            sx={{ color: "blue" }}
          >
            Thông Tin Chi Tiết - Chế Độ Dinh Dưỡng
          </Typography>
          <Typography variant="body2">
            <strong>Hàm lượng dinh dưỡng tối thiểu:</strong> 200
          </Typography>
          <Typography variant="body2">
            <strong>Lượng nước:</strong> 5 lít/ngày
          </Typography>
          <Typography variant="body2">
            <strong>Số bữa ăn:</strong> 3 bữa/ngày
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            <strong>Thực Phẩm Cần Tránh:</strong>
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Thực Phẩm</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Thịt Chuột</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Thịt Gà</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>

      {/* Modal for Area Details */}
      <Modal
        open={openAreaModal}
        onClose={handleCloseAreaModal}
        aria-labelledby="area-details-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            id="area-details-title"
            variant="h6"
            gutterBottom
            sx={{ color: "blue" }}
          >
            Thông Tin Chi Tiết - Khu Vực Nuôi
          </Typography>
          <Typography variant="body2">
            <strong>ID khu vực:</strong> KV001
          </Typography>
          <Typography variant="body2">
            <strong>Vị trí:</strong> Khu A
          </Typography>
          <Typography variant="body2">
            <strong>Diện tích:</strong> 200 m<sup>2</sup>
          </Typography>
          <Typography variant="body2">
            <strong>Chiều cao:</strong> 10 m
          </Typography>
          <Typography variant="body2">
            <strong>Số lượng:</strong> 50 con
          </Typography>
          <Typography variant="body2">
            <strong>Loại động vật ăn:</strong> Ăn thịt
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default NutritionFormWithFloatingCards;
