import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

export default function GroupExportComponent() {
  const [species, setSpecies] = useState("");
  const [groupId, setGroupId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [partner, setPartner] = useState("");
  const [staff, setStaff] = useState("");
  const [error, setError] = useState("");

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tạo Phiếu Xuất Nhóm Động Vật
      </Typography>

      <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
        {/* Species */}
        <TextField
          select
          label="Loài động vật"
          fullWidth
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          margin="normal"
        >
          {["Hổ", "Sư Tử", "Hươu", "Voi", "Khỉ"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        {/* Group ID */}
        <TextField
          label="ID nhóm"
          fullWidth
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          margin="normal"
        />

        {/* Quantity */}
        <TextField
          label="Số lượng xuất"
          type="number"
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          margin="normal"
          inputProps={{ min: 1 }}
        />

        {/* Date */}
        <TextField
          label="Ngày xuất"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true, // Keeps the label above the input
          }}
        />

        {/* Reason */}
        <TextField
          select
          label="Lý do xuất"
          fullWidth
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          margin="normal"
        >
          {["Chuyển giao", "Bán", "Trao đổi"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        {/* Partner */}
        <TextField
          select
          label="Đối tác"
          fullWidth
          value={partner}
          onChange={(e) => setPartner(e.target.value)}
          margin="normal"
        >
          {["Công ty A", "Công ty B", "Không có"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        {/* Staff */}
        <TextField
          label="Nhân viên (CCCD)"
          fullWidth
          value={staff}
          onChange={(e) => setStaff(e.target.value)}
          margin="normal"
          error={!!error}
          helperText={error || ""}
        />

        {/* Action Buttons */}
        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button variant="contained" color="primary" fullWidth>
            Tạo Phiếu Xuất
          </Button>
          <Button variant="outlined" color="secondary" fullWidth>
            Trở Về
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
