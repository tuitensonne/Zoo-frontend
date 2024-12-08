import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import NotificationsSignInPageError from "../pages/Login/LoginPage";
import Dashboard from "./layouts/Dashboard";

import RecordComponent from "../pages/Vet/RecordPage";
import TreatmentComponent from "../pages/Vet/TreatmentPage";
import VaccinationComponent from "../pages/Vet/VaccinationPage";

import AnimalExportComponent from "../pages/Clerk/ExportPage";
import SingleExportComponent from "../pages/Clerk/SingleExportPage";
import GroupExportComponent from "../pages/Clerk/GroupExportPage";

import CareTakerDashboard from "../pages/Caretaker/Dashboard";
import FoodFormPage from "../pages/Caretaker/NewFeeding";
import { ROLE_NAVIGATION } from "../configs/SidebarRoleConfig";
import FoodImportComponent from "../pages/Clerk/FoodImportPage";

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
          <Route index element={<Navigate to="records" replace />} />
          <Route path="records" element={<RecordComponent />} />
          {/* <Route path="vaccination" element={<VaccinationComponent />} /> */}
          {/* <Route path="treatment" element={<TreatmentComponent />} /> */}
          <Route path="new/vaccination" element={<VaccinationComponent />} />
          <Route path="new/treatment" element={<TreatmentComponent />} />
          {/* </Route> */}
        </Route>

        {/* Clerk Routes */}
        <Route
          path="/home/clerk/*"
          element={<Dashboard navigation={ROLE_NAVIGATION.Clerk} />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<div>Clerk Dashboard</div>} />

          {/*  */}
          <Route path="export" element={<AnimalExportComponent />} />
          <Route path="export/single" element={<SingleExportComponent />} />
          <Route path="export/group" element={<GroupExportComponent />} />

          {/*  */}
          <Route path="import" element={<div>Import Ticket Page</div>} />
          <Route path="import/foods" element={<FoodImportComponent />} />
          <Route
            path="import/animals"
            element={<div>Hello from new import</div>}
          />
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
