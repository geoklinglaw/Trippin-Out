
import React, { useState, useEffect } from "react";
import { Button, message, Progress } from "antd";
import { FaArrowDown } from "react-icons/fa";
import SuggLocations from "./SuggLocations";
import "./FoodOptions.css";
import { getDoc, db, auth } from "../../firebase";
import {
  collection,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import itinerary from "./../../pages/itinerary";
import axios from "axios";
import  useStore  from '../../pages/authStore';

const FoodOptions = (props) => {
 // Use the state and actions from authStore.js
 const { tripId } = props;

 const locations = useStore((state) => state.foodLocations);
 const selectedLocations = useStore((state) => state.selectedfoodLocations);
 const setLocations = useStore((state) => state.setfoodLocations);
 const setSelectedLocations = useStore((state) => state.setSelectedfoodLocations);
  const navigate = useNavigate();
  const [duration, setDuration] = useState(0);
  const selectedData = Object.values(selectedLocations).filter(location => location);
  const [selectedCount, setSelectedCount] = useState(0);

  const handleScrollToBottom = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const offset = 100; // To leave some space after scrolling
    const scrollTo = scrollHeight - windowHeight + offset;
    window.scrollTo({ top: scrollTo, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchDuration = async () => {
      const userId = auth.currentUser.uid;
      try {
        const tripRef = doc(db, "users", userId, "trips", tripId);
        const tripSnap = await getDoc(tripRef);
        const tripData = tripSnap.data();
        if (tripData) {
          setDuration(tripData.duration);
        }
      } catch (error) {
        console.error("Error fetching duration from Firestore:", error);
      }
    };

    fetchDuration();
  }, []);

  const YOUR_API_KEY = "AIzaSyCcw5UjfxwKAhVVUeSqjp_Gx4wxFys8mbo";

  const toggleSelected = (props) => {
    const { locationId, photo, name, formatted_address, price } = props;
  
    const updatedSelectedLocations = { ...selectedLocations };
  
    if (selectedLocations[locationId]) {
      // Deselect the location
      updatedSelectedLocations[locationId] = undefined;
      setSelectedCount((prevCount) => prevCount - 1);
    } else {
      // Check if the limit of duration * 4 locations has been reached
      if (selectedCount >= duration * 4) {
        message.warning("You have reached the maximum limit of selected locations!");
        return;
      }
  
      // Select the location
      updatedSelectedLocations[locationId] = {
        name,
        locationId,
        photo,
        formatted_address,
        price,
      };
      setSelectedCount((prevCount) => prevCount + 1);
    }
  
    setSelectedLocations(updatedSelectedLocations);
  };
  


  const handleClick = (e) => {
    submitData();
    generateItinerary();
  };

  const generateItinerary = () => {
    console.log("generateItinerary");
    navigate("/itinerary");
    <Route path="orb1/src/pages/itinerary" element={<itinerary />} />;
  };


  
  

  const submitData = async () => {
    const selectedData = Object.values(selectedLocations).filter(
      (location) => location
    );

    const userID = "pVOrWYawmnkMvUu3IFtn";
    const tripID = "V1NBZp7HSK7hnEkKT0Aw";

    // Reference to the locations collection
    const locationsRef = collection(
      db,
      "users",
      userID,
      "trips",
      tripID,
      "food"
    );

    // Loop through each selected location and save it to Firestore
    for (const location of selectedData) {
      try {
        // console.log("id: " + location.locationId);
        // console.log("name: " + location.name);
        // console.log("add: " + location.formatted_address);
        // console.log("photo: " + location.photo);

        await addDoc(locationsRef, {
          name: location.name,
          locationId: location.locationId,
          photo: location.photo,
          address: location.formatted_address,
          // price: location.price
        });
        console.log("Document successfully written!");
      } catch (error) {
        console.error("Error storing locations:", error);
      }
    }
    message.success("Successfully submitted!");
  }

  return (
    <>
    <Progress
        style={{ position: 'absolute', top: 60, right: 100}}
        type="circle"
        percent={(selectedData.length / (duration * 4)) * 100} // Calculate the percentage of locations selected
        format={(percent) => `${selectedData.length} / ${duration * 4}`}
        width={120}
        strokeWidth={15} 
      />
      <div style={{ display: "flex" }}></div>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ margin: "30px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
             {locations.map((location, index) => (
                  <SuggLocations
                    key={index}
                    locationId={index}
                    selected={!!selectedLocations[index]}
                    toggleSelected={toggleSelected}
                    photo={location.photos ? location.photos[0] : null}
                    name={location.name}
                    formatted_address={
                      location.location ? location.location.formatted_address : ""
                    }
                    price={location.price}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div style={{ justifyContent: "end" }}>
        <Button type="primary" onClick={handleClick}>
          {" "}
          Submit{" "}
        </Button>
      </div>
      <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: "999" }}>
        <Button type="primary" shape="circle" size="large" onClick={handleScrollToBottom}>
        <FaArrowDown />

        </Button>
      </div>
    </>
  );
};

export default FoodOptions;

