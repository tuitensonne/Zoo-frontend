import { Box, Divider, Typography } from "@mui/material";
import themeProps from "../../../theme";

export default function Footer() {
  // Access the current theme
  const theme = themeProps;

  return (
    <Box
      sx={{
        mt: "auto",
        py: 2,
        px: 3,
        backgroundColor: theme.palette.background.default, // Use theme background
        color: theme.palette.text.secondary, // Use theme text color
        textAlign: "center",
      }}
    >
      <Divider sx={{ m: 0, mb: 2, borderWidth: "2px" }} />
      <Typography variant="body2">
        © {new Date().getFullYear()} Zoo Management System. All rights
        reserved.
      </Typography>
    </Box>
  );
}
