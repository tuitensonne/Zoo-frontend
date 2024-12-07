import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NotificationsSignInPageError from "../pages/Login/LoginPage";
import CaretakerHomePage from "../pages/Home/CaretakerHomePage";
import ClerkHomePage from "../pages/Home/ClerkHomePage";
import VetHomePage from "../pages/Home/VetHomePage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<NotificationsSignInPageError />} />

        <Route path="/home">
          <Route path="vet" element={<VetHomePage />}></Route>
          <Route path="clerk" element={<ClerkHomePage />}></Route>
          <Route path="caretaker" element={<CaretakerHomePage />}></Route>
        </Route>
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
