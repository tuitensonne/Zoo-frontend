import {
  SignInPage,
  type AuthProvider,
  type AuthResponse,
} from "@toolpad/core/SignInPage";
import { useNavigate } from "react-router-dom";
import theme from "../../../theme";
import { AppProvider } from "@toolpad/core/AppProvider";

// Mock authentication credentials
const MOCK_USER = {
  email: "john.doe@example.com",
  password: "password123",
};

// Authentication providers
const providers = [{ id: "credentials", name: "Email and password" }];

export default function NotificationsSignInPageError() {
  const navigate = useNavigate(); // React Router's hook for navigation

  // Define the signIn function
  const signIn = async (
    provider: AuthProvider,
    formData?: FormData
  ): Promise<AuthResponse> => {
    if (provider.id === "credentials") {
      const email = formData?.get("email") as string | undefined;
      const password = formData?.get("password") as string | undefined;

      if (email === MOCK_USER.email && password === MOCK_USER.password) {
        // Redirect to /home if login is successful
        navigate("/home");
        return {
          type: "CredentialsSignin",
          error: undefined, // No error
        };
      } else {
        return {
          type: "CredentialsSignin",
          error: "Invalid credentials.",
        };
      }
    }
    return {
      type: provider.id,
      error: "Unsupported provider.",
    };
  };

  return (
    <AppProvider theme={theme}>
      <SignInPage signIn={signIn} providers={providers} />
    </AppProvider>
  );
}
