import React from "react";
import "./Sidebar.css";
import { Steps, Layout, Menu, theme, Divider } from "antd";
import { useState } from "react";
import img from "../images/Asset 1.png";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const { Step } = Steps;

function Sidebar({ setHeader, isPreferencesSubmitted, currentStep }) {
  const [current, setCurrent] = useState(0);
  const arr = [
    "Explore",
    "Accomodation",
    "Preferences",
    "Locations",
    "Food Options",
  ];

  const onChange = (value) => {
    console.log("onChange:", value);
    setHeader(value);
    setCurrent(value);
  };

  const notify = () => toast("Submit your preferences first before accessing the locations and food options!");

  const handleClick = (value) => {
    if (!isPreferencesSubmitted && (value === 3 || value === 4)) {
      notify();
    } else {
      onChange(value);
    }
  };
  
  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-user">
          <img src={img} alt="logo" className="sidebar-user img" />
          <span className="username">Law Geok Ling</span>
        </div>
        <div className="sidebar-content">
          <Steps
            className="sidebar-list"
            current={currentStep}
            direction="vertical"
          >
            <Step title="Explore" onClick={() => handleClick(0)} />
            <Step title="Accomodation" onClick={() => handleClick(1)} />
            <Step title="Preferences" onClick={() => handleClick(2)} />
            <Step title="Locations" onClick={() => handleClick(3)} />
            <Step title="Food Options" onClick={() => handleClick(4)} />
          </Steps>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
