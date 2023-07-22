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


const App = () => {
  const [generatedLocations, setGeneratedLocations] = useState([]);
  const [isPreferencesSubmitted, setIsPreferencesSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { state } = useLocation();
  const navigate = useNavigate();
  const handlePreferencesSubmitted = (data) => {
    setGeneratedLocations(data);
    setIsPreferencesSubmitted(true);
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