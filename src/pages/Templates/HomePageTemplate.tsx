import Sidebar from "../../components/layouts/Sidebar";
import React from "react";
import { ROLE_NAVIGATION } from "../../configs/SidebarRoleConfig";
import { type Session } from "@toolpad/core";

export default function HomePageTemplate({ role }: { role: string }) {
  // Capitalize the first letter of the mode to match ROLE_NAVIGATION keys
  const navigation =
    ROLE_NAVIGATION[
      (role.charAt(0).toUpperCase() +
        role.slice(1)) as keyof typeof ROLE_NAVIGATION
    ];

  // Handle invalid modes gracefully
  if (!navigation) {
    return <div>Error: Invalid mode specified</div>;
  }

  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: "Bharat Kashyap",
      email: "bharatkashyap@outlook.com",
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: "Bharat Kashyap",
            email: "bharatkashyap@outlook.com",
            image: "https://avatars.githubusercontent.com/u/19550456",
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  return (
    <Sidebar
      navigation={navigation}
      session={session}
      authentication={authentication}
    />
  );
}
