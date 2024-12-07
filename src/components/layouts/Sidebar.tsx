import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  AppProvider,
  type Navigation,
  type Authentication,
  type Session,
} from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import Footer from "./Footer";
import themeProps from "../../../theme";

// Sidebar props interface
interface SidebarProps {
  navigation: Navigation; // Accepts navigation as a prop
  session: Session | null;
  authentication: Authentication;
}

const theme = themeProps;

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

export default function Sidebar({
  navigation,
  session,
  authentication,
}: SidebarProps) {
  const router = useDemoRouter("/dashboard");

  return (
    <AppProvider
      navigation={navigation}
      router={router}
      theme={theme}
      session={session}
      authentication={authentication}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
        <Footer />
      </DashboardLayout>
    </AppProvider>
  );
}
