import React from "react";
import { Button, Space } from "antd";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import "./Header.css";
import SignUp from "../pages/Signup";
import Login from "../pages/Login";
import Preferences from "../pages/Preferences";
import PastItineraries from "../pages/PastItineraries";

const Header = () => {
  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate("/signup");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToPreferences = () => {
    navigate("/preferences");
  };

  const navigateToPastItineraries = () => {
    navigate("/pastitineraries");
  };

  return (
    <nav>
      <div className="div-header">
        <div className="div-svg" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Button onClick={navigateToLogin}>Login</Button>
          <Button onClick={navigateToSignUp}>Create Account</Button>
          <Button onClick={navigateToPreferences}>Preferences</Button>
          <Button onClick={navigateToPastItineraries}>Past Itineraries</Button>
          <Routes>
            <Route path="orb1/src/pages/Login.js" element={<Login />} />
            <Route path="orb1/src/pages/Signup.js" element={<SignUp />} />
            <Route
              path="orb1/src/pages/Preferences.js"
              element={<Preferences />}
            />
            <Route path="orb1/src/pages/PastItineraries.js" element={<PastItineraries />} />
          </Routes>
        </div>
      </div>
    </nav>
  );
};

export default Header;
