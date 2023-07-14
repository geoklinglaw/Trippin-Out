import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Steps } from "antd";
import img from "../images/Asset 1.png";
import { db, auth } from "../firebase";
import { collection, doc, getDoc } from "firebase/firestore";


const { Step } = Steps;

function Sidebar({ setHeader }) {
  const [current, setCurrent] = useState(0);
  const [username, setUsername] = useState("");

  // useEffect(() => {
  //   const user = auth.currentUser.uid;
  //   const username= db.collection("username");
  //   console.log(user);
  //   const storedUsername = localStorage.getItem("username");
  //   if (storedUsername) {
  //     setUsername(username);
  //   }
  // }, []);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const userRef = doc(db, "users", userId);
  
      getDoc(userRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            setUsername(userData.username);
          } else {
            console.log("User document does not exist");
          }
        })
        .catch((error) => {
          console.error("Error retrieving user data:", error);
        });
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
