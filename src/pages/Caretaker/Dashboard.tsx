import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
} from "@mui/material";

// Example data
const exampleData = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  performer: `Nguyễn Văn A`,
  date: "21/06/2024",
  mealName: "Khẩu phần ăn cho hổ trưởng thành",
  location: "Khu vực A",
  foodDetails: [
    { foodId: 1, name: "Ức gà", quantity: "5kg" },
    { foodId: 2, name: "Sườn heo", quantity: "5kg" },
  ],
}));

const PaginatedCardListWithModal = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  return (
    <Box sx={{ width: "90%", margin: "0 auto", mt: 3 }}>
      {/* List of Cards */}
      {exampleData.map((item) => (
        <Card key={item.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="body1">
              <strong>Người thực hiện:</strong> {item.performer}
            </Typography>
            <Typography variant="body1">
              <strong>Ngày thực hiện:</strong> {item.date}
            </Typography>
            <Typography variant="body1">
              <strong>Tên khẩu phần ăn:</strong> {item.mealName}
            </Typography>
            <Typography variant="body1">
              <strong>Vị trí:</strong> {item.location}
            </Typography>
            <Box sx={{ textAlign: "right", mt: 2 }}>
              <Button
                variant="text"
                size="small"
                onClick={() => handleOpen(item)}
              >
                Xem thêm
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}

      {/* Modal for Detailed View */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="detail-view-title"
        aria-describedby="detail-view-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {selectedItem && (
            <CardContent>
              <Typography
                id="detail-view-title"
                variant="h6"
                component="h2"
                gutterBottom
              >
                Chi tiết cho khẩu phần ăn
              </Typography>
              <Typography>
                <strong>Người thực hiện:</strong> {selectedItem.performer}
              </Typography>
              <Typography>
                <strong>ID Quá trình cho ăn:</strong> {selectedItem.id}
              </Typography>
              <Typography>
                <strong>Tên khẩu phần ăn:</strong> {selectedItem.mealName}
              </Typography>
              <Typography>
                <strong>Vị trí:</strong> {selectedItem.location}
              </Typography>
              <Typography>
                <strong>Ngày thực hiện:</strong> {selectedItem.date}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Chi tiết thức ăn:
              </Typography>
              <TableContainer component={Paper}>
                <Table size="small" aria-label="food details">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID Thức ăn</TableCell>
                      <TableCell>Tên thức ăn</TableCell>
                      <TableCell>Số lượng</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedItem.foodDetails.map((food) => (
                      <TableRow key={food.foodId}>
                        <TableCell>{food.foodId}</TableCell>
                        <TableCell>{food.name}</TableCell>
                        <TableCell>{food.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Button variant="contained" onClick={handleClose}>
                  Đóng lại
                </Button>
              </Box>
            </CardContent>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default PaginatedCardListWithModal;
