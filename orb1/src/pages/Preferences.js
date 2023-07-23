import React, { useState } from "react";
//import { Steps, Layout, Menu, theme } from "antd";
import Sidebar from "../components/Sidebar";

import Explore from "../components/Pref_Page/Explore";
import Accommodation from "../components/Pref_Page/Accommodation";
import Preference from "../components/Pref_Page/Preference";
import FoodOptions from "../components/Pref_Page/FoodOptions";
import SuggestedLocations from "../components/Pref_Page/SuggestedLocation";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import  useStore  from './authStore';
import axios from "axios";
import { auth } from "../firebase";
import {
  collection,
  query,
  getDocs,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { getDoc, db, firebase } from "../firebase";


const App = () => {
  const [generatedLocations, setGeneratedLocations] = useState([]);
  const [isPreferencesSubmitted, setIsPreferencesSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const tripId = useStore((state) => state.tripId);
  const setLocations = useStore((state) => state.setfoodLocations);

  const handlePreferencesSubmitted = async (data) => {
    setGeneratedLocations(data);
    console.log("data: ", data);
    setIsPreferencesSubmitted(true);
    
    // Wait for the promises to resolve before logging the result
    const destination = await fetchfromFirebase();
    const locationsData = await callFoodAPI(destination);
    setLocations(locationsData);

    console.log("call food API: ", locationsData);
};


async function fetchfromFirebase() {
  const userID = auth.currentUser.uid;
  const tripID = tripId;
  console.log("userID: " + userID);
  console.log("tripID: " + tripID);

  const tripRef = doc(db, "users", userID, "trips", tripID);
  const tripSnap = await getDoc(tripRef);

  if (tripSnap.exists()) {
    const trip = tripSnap.data();
    const accommodation = trip.accommodation[0];  // get the first accommodation in the array
    const latLong = accommodation.latLong;
    console.log(`latLong for accommodation: ${latLong}`);
    return latLong;
  } else {
    console.error("No such document exists!");
  }
}

async function callFoodAPI(destination) {
  const endpoint = "http://localhost:5123/food-options";
  try {
    const response = await axios.get(endpoint, {
      params: { destination },
    });
    console.log("food response: ", response.data.data);
    return response.data.data; 
  } catch (error) {
    console.error("Error retrieving data: ", error);
  }
}

  const A = () => <Explore />;

  const handleCheckInDateTimeChange = (value) => {
    console.log("Check-in date and time: ", value);
  };
  const handleCheckOutDateTimeChange = (value) => {
    console.log("Check-out date and time: ", value);
  };
  
  const handleLocationChange = (event) => {
    console.log("Location: ", event.target.value);
  };
  
  const handleHotelNameChange = (event) => {
    console.log("Hotel Name: ", event.target.value);
  };
  
  
  const B = () => (
    <>
      <h1>Accommodation</h1>
      <Accommodation
      onCheckInDateTimeChange={handleCheckInDateTimeChange}
      onCheckOutDateTimeChange={handleCheckOutDateTimeChange}
      onLocationChange={handleLocationChange}
      onHotelNameChange={handleHotelNameChange}
       />
    </>
  );
  
  
  const C = () => (
    <>
      <h1>Preferences</h1>
      <Preference onSubmit={() => {setCurrentStep(3); setHeader(3)}} onPreferencesSubmitted={handlePreferencesSubmitted}/>
    </>
  );
  
  
  const D = () => {
    if (!isPreferencesSubmitted) {
      return null;
    }

    return (
      <>
       <h1 style={{ marginBottom: '5px' }}>Suggested Locations</h1>
       <h6 style={{ opacity: 0.7, fontSize: '14px', marginTop: '0' }}>tick the locations if you wish to include it in your itinerary</h6>
       <SuggestedLocations data={generatedLocations}/>
      </>
    );
  };


  const E = () => {
    if (!isPreferencesSubmitted) {
      return null;
    }

    return (
      <>
       <h1 style={{ marginBottom: '5px' }}>Food Options</h1>
        <h6 style={{ opacity: 0.7, fontSize: '14px', marginTop: '0' }}>Pick the food you would like to include</h6>
      <FoodOptions />
      </>
    );
  };


  const [header, setHeader] = useState(0);
  return (
    <>
      <Sidebar setHeader={(x) => {setHeader(x); setCurrentStep(x);}} currentStep={currentStep} isPreferencesSubmitted={isPreferencesSubmitted} />
      <ToastContainer />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "70px",
          marginLeft: "450px",
        }}
      >
        <div style={{ marginLeft: "17px", fontSize: "19px", color: "#1C395B" }}>
          {header === 0 ? (
            <A />
          ) : header === 1 ? (
            <B />
          ) : header === 2 ? (
            <C />
          ) : header === 3 ? (
            <D />
          ) : (
            <E />
          )}
        </div>
      </div>
    </>
  );
};
export default App;