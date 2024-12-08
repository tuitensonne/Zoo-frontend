import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import HandshakeIcon from "@mui/icons-material/Handshake";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import KitchenIcon from "@mui/icons-material/Kitchen";
import PetsIcon from "@mui/icons-material/Pets";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import { type Navigation } from "@toolpad/core";

type RoleNavigation = {
  Vet: Navigation;
  Clerk: Navigation;
  Caretaker: Navigation;
};

const vetBase: string = "home/vet/";
const clerkBase: string = "home/clerk/";
const caretakerBase: string = "home/caretaker/";

export const ROLE_NAVIGATION: RoleNavigation = {
  Vet: [
    {
      kind: "header",
      title: "Dashboard",
    },
    {
      segment: vetBase + "records",
      title: "Hồ sơ sức khỏe",
      icon: <DashboardCustomizeIcon />,
    },
    {
      segment: vetBase + "treatment",
      title: "Điều trị",
      icon: <MedicalInformationIcon />,
    },
    {
      segment: vetBase + "vaccination",
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
      segment: vetBase + "new",
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
      segment: clerkBase + "dashboard",
      title: "Thông tin chăm sóc",
      icon: <DashboardCustomizeIcon />,
    },
    {
      segment: clerkBase + "import",
      title: "Phiếu nhập",
      icon: <BookmarkAddIcon />,
    },
    {
      segment: clerkBase + "export",
      title: "Phiếu xuất",
      icon: <BookmarkRemoveIcon />,
    },
    {
      segment: clerkBase + "partners",
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
    // {
    // segment: clerkBase + "new",
    // title: "Tạo phiếu",
    // icon: <CreateNewFolderIcon />,
    // children: [
    {
      segment: clerkBase + "import",
      title: "Phiếu nhập",
      icon: <BookmarkAddIcon />,
      children: [
        {
          segment: "animals",
          title: "Nhập động vật",
          icon: <PetsIcon />,
        },
        {
          segment: "foods",
          title: "Nhập thức ăn",
          icon: <FoodBankIcon />,
        },
      ],
    },
    {
      segment: clerkBase + "export",
      title: "Phiếu xuất",
      icon: <BookmarkRemoveIcon />,
      children: [
        {
          segment: "single",
          title: "Xuất cá thể",
          icon: <PersonIcon />,
        },
        {
          segment: "group",
          title: "Xuất nhóm",
          icon: <PeopleIcon />,
        },
      ],
    },
    {
      segment: clerkBase + "partners",
      title: "Đối tác",
      icon: <HandshakeIcon />,
    },
    // ],
    // },
  ],
  Caretaker: [
    {
      kind: "header",
      title: "Dashboard",
    },
    {
      segment: caretakerBase + "dashboard",
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
      segment: caretakerBase + "new",
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
