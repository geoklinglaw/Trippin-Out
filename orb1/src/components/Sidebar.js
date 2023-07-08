import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Steps } from "antd";
import img from "../images/Asset 1.png";

const { Step } = Steps;

function Sidebar({ setHeader }) {
  const [current, setCurrent] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const arr = [
    "Explore",
    "Accommodation",
    "Preferences",
    "Locations",
    "Food Options",
  ];

  const onChange = (value) => {
    console.log("onChange:", value);
    setHeader(value);
    setCurrent(value);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-user">
        <img src={img} alt="logo" className="sidebar-user img" />
        <span className="username">{username}</span>
      </div>
      <div className="sidebar-content">
        <Steps
          className="sidebar-list"
          current={current}
          onChange={onChange}
          direction="vertical"
        >
          {arr.map((title) => (
            <Step key={title} title={title} />
          ))}
        </Steps>
      </div>
    </div>
  );
}

export default Sidebar;
