import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import themeProps from "../../../theme";
import { Box } from "@mui/material";

const theme = themeProps;

export default function Dashboard({ navigation }: { navigation: Navigation }) {
  return (
    <AppProvider navigation={navigation} theme={theme}>
      <DashboardLayout>
        <Box sx={{ width: "95%", margin: "auto", padding: 0 }}>
          <Outlet />
        </Box>
        <Footer />
      </DashboardLayout>
    </AppProvider>
  );
}
