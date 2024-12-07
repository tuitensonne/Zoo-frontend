import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NotificationsSignInPageError from "../pages/Login/LoginPage";
import Dashboard from "./layouts/Dashboard";
import VetDashboard from "../pages/Vet/Dashboard";
import CareTakerDashboard from "../pages/Caretaker/Dashboard";
import FoodFormPage from "../pages/Caretaker/NewFeeding";
import { ROLE_NAVIGATION } from "../configs/SidebarRoleConfig";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Default redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login page */}
        <Route path="/login" element={<NotificationsSignInPageError />} />

        {/* Vet Routes */}
        <Route
          path="/home/vet/*"
          element={<Dashboard navigation={ROLE_NAVIGATION.Vet} />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<VetDashboard />} />
          <Route path="vaccination" element={<div>Vaccination Page</div>} />
          <Route path="treatment" element={<div>Treatment Page</div>} />
        </Route>

        {/* Clerk Routes */}
        <Route
          path="/home/clerk/*"
          element={<Dashboard navigation={ROLE_NAVIGATION.Clerk} />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<div>Clerk Dashboard</div>} />
          <Route path="import" element={<div>Import Ticket Page</div>} />
          <Route path="export" element={<div>Export Ticket Page</div>} />
        </Route>

        {/* Caretaker Routes */}
        <Route
          path="/home/caretaker/*"
          element={<Dashboard navigation={ROLE_NAVIGATION.Caretaker} />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<CareTakerDashboard />} />
          <Route path="new/feed" element={<FoodFormPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
