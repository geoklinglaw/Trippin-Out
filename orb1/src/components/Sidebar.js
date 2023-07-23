import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Steps } from "antd";
import img from "../images/Asset 1.png";
import { db, auth } from "../firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const { Step } = Steps;

function Sidebar({ setHeader,isAccommodationSubmitted, isPreferencesSubmitted, currentStep }) {
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
  
    // const notify = () => toast("Submit your preferences first before accessing the locations and food options!");
  
    // const handleClick = (value) => {
    //   if (!isPreferencesSubmitted && (value === 3 || value === 4)) {
    //     notify();
    //   } 
    //   else {
    //     onChange(value);
    //   }
    // };

    const notifyAccommodation = () => toast("Submit your accommodation details before accessing preferences!");
  const notifyPreferences = () => toast("Submit your preferences first before accessing the locations and food options!");

  const handleClick = (value) => {
    if (value === 2) {
      // Check if user has filled up accommodation details before proceeding to Preferences
      if (!isAccommodationSubmitted) {
        notifyAccommodation();
      } else {
        onChange(value);
      }
    } else if (value === 3 || value === 4) {
      // Check if user has filled up preferences before proceeding to Locations or Food Options
      if (!isPreferencesSubmitted) {
        notifyPreferences();
      } else {
        onChange(value);
      }
    } else {
      // For other steps, no special condition is required
      onChange(value);
    }
  };
    
    return (
      <>
        <div className="sidebar-container">
          <div className="sidebar-user">
            <img src={img} alt="logo" className="sidebar-user img" />
            <span className="username">{username}</span>
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
