import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import HandshakeIcon from "@mui/icons-material/Handshake";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import KitchenIcon from "@mui/icons-material/Kitchen";
import { type Navigation } from "@toolpad/core";

type RoleNavigation = {
  Vet: Navigation;
  Clerk: Navigation;
  Caretaker: Navigation;
};

export const ROLE_NAVIGATION: RoleNavigation = {
  Vet: [
    {
      kind: "header",
      title: "Dashboard",
    },
    {
      segment: "vet-dashboard",
      title: "Hồ sơ sức khỏe",
      icon: <DashboardCustomizeIcon />,
    },
    {
      segment: "treatment",
      title: "Điều trị",
      icon: <MedicalInformationIcon />,
    },
    {
      segment: "vaccination",
      title: "Tiêm chủng",
      icon: <VaccinesIcon />,
    },
    {
      kind: "divider",
    },
    {
      kind: "header",
      title: "Tạo mới",
    },
    {
      segment: "new",
      title: "Tạo phiếu",
      icon: <CreateNewFolderIcon />,
      children: [
        {
          segment: "treatment",
          title: "Điều trị",
          icon: <MedicalInformationIcon />,
        },
        {
          segment: "vaccination",
          title: "Tiêm chủng",
          icon: <VaccinesIcon />,
        },
      ],
    },
  ],
  Clerk: [
    {
      kind: "header",
      title: "Dashboard",
    },
    {
      segment: "clerk-dashboard",
      title: "Thông tin chăm sóc",
      icon: <DashboardCustomizeIcon />,
    },
    {
      segment: "import-ticket",
      title: "Phiếu nhập",
      icon: <BookmarkAddIcon />,
    },
    {
      segment: "export-ticket",
      title: "Phiếu xuất",
      icon: <BookmarkRemoveIcon />,
    },
    {
      segment: "partners",
      title: "Đối tác",
      icon: <HandshakeIcon />,
    },
    {
      kind: "divider",
    },
    {
      kind: "header",
      title: "Tạo mới",
    },
    {
      segment: "new",
      title: "Tạo phiếu",
      icon: <CreateNewFolderIcon />,
      children: [
        {
          segment: "import-ticket",
          title: "Điều trị",
          icon: <BookmarkAddIcon />,
        },
        {
          segment: "export-ticket",
          title: "Tiêm chủng",
          icon: <BookmarkRemoveIcon />,
        },
        {
          segment: "partners",
          title: "Đối tác",
          icon: <HandshakeIcon />,
        },
      ],
    },
  ],
  Caretaker: [
    {
      kind: "header",
      title: "Dashboard",
    },
    {
      segment: "caretaker-dashboard",
      title: "Lịch sử cho ăn",
      icon: <KitchenIcon />,
    },
    {
      kind: "divider",
    },
    {
      kind: "header",
      title: "Tạo mới",
    },
    {
      segment: "new",
      title: "Tạo phiếu",
      icon: <CreateNewFolderIcon />,
      children: [
        {
          segment: "feed",
          title: "Khẩu phần ăn",
          icon: <LocalDiningIcon />,
        },
      ],
    },
  ],
};
