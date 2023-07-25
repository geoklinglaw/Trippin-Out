import React, { useState } from "react";
//import { Steps, Layout, Menu, theme } from "antd";
import Sidebar from "../components/Sidebar";
import { useLocation, useNavigate, Route, Routes, BrowserRouter, Router } from "react-router-dom";

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
  const [isAccommodationSubmitted, setIsAccommodationSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const tripId = useStore((state) => state.tripId);
  const setLocations = useStore((state) => state.setfoodLocations);
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleAccommodationSubmitted= (data) => {
    setIsAccommodationSubmitted(true); 
  }

  const handlePreferencesSubmitted = async (data) => {
    console.log("RECEIVED IN PREF.JS PAGES ", data)
    setGeneratedLocations(data);
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
const handleSidebarChange = (value) => {
  setCurrentStep(value);
  setHeader(value);
};



async function callFoodAPI(destination) {
  const endpoint = "https://trippin-out-ten.vercel.app/food-options";
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
      tripId={state.tripId}
      onCheckInDateTimeChange={handleCheckInDateTimeChange}
      onCheckOutDateTimeChange={handleCheckOutDateTimeChange}
      onLocationChange={handleLocationChange}
      onHotelNameChange={handleHotelNameChange}
      onSubmit = {() => {setCurrentStep(2); setHeader(2)}}
      onAccommodationSubmitted = {handleAccommodationSubmitted}
     
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
       <SuggestedLocations data={generatedLocations}  tripId={state.tripId}/>
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
      <FoodOptions tripId={state.tripId}/>
      </>
    );
  };


  const [header, setHeader] = useState(0);
  return (
    <>
      <Sidebar setHeader={(x) => handleSidebarChange(x)}
       currentStep={currentStep} 
       isPreferencesSubmitted={isPreferencesSubmitted} 
       isAccommodationSubmitted={isAccommodationSubmitted}
       />
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
           <Routes>
            <Route path="/explore" element={<A />} />
            <Route path="/accommodation" element={<B />} />
            <Route path="/preferences" element={<C />} />
            <Route path="/suggested-locations" element={<D />} />
            <Route path="/food-options" element={<E />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
export default App;