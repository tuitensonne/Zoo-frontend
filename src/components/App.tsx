import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NotificationsSignInPageError from "../pages/Login/LoginPage";
import HomePage from "../pages/Home/HomePage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Default Route: Redirect to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login Page */}
        <Route path="/login" element={<NotificationsSignInPageError />} />

        <Route path="/home" element={<HomePage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
