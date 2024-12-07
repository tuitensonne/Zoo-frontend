"use client";
import { createTheme } from "@mui/material/styles";

const themeProps = createTheme({
  palette: {
    mode: "dark", // Explicitly set dark mode
    background: {
      default: "#121212", // Dark background
      paper: "#1d1d1d", // Paper components background
    },
    text: {
      primary: "#ffffff", // Text color in dark mode
      secondary: "#b3b3b3", // Secondary text color
    },
  },
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default themeProps;
