import Sidebar from "../../components/layouts/Sidebar";
import { ROLE_NAVIGATION } from "../../components/layouts/SidebarRoleConfig";

const mode: string = "vet"; // Can be dynamic based on the user's role or input

export default function HomePage() {
  // Capitalize the first letter of the mode to match ROLE_NAVIGATION keys
  const navigation =
    ROLE_NAVIGATION[
      (mode.charAt(0).toUpperCase() +
        mode.slice(1)) as keyof typeof ROLE_NAVIGATION
    ];

  // Handle invalid modes gracefully
  if (!navigation) {
    return <div>Error: Invalid mode specified</div>;
  }

  return <Sidebar navigation={navigation} />;
}
