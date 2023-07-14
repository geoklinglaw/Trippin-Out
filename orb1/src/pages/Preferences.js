import React, { useState } from "react";
//import { Steps, Layout, Menu, theme } from "antd";
import Sidebar from "../components/Sidebar";

import Explore from "../components/Pref_Page/Explore";
import Accommodation from "../components/Pref_Page/Accommodation";
import Preference from "../components/Pref_Page/Preference";
import FoodOptions from "../components/Pref_Page/FoodOptions";
import SuggestedLocations from "../components/Pref_Page/SuggestedLocation";

//const description = "This is a description.";
const A = () => <Explore />;

// const B = () => {
//   return <h1>Accomodation</h1>;
// };

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
    <Preference/>
  </>
);

//const C = () => <h1>Preferences</h1>;


const D = () => (
  <>
   <h1 style={{ marginBottom: '5px' }}>Suggested Locations</h1>
    <h6 style={{ opacity: 0.7, fontSize: '14px', marginTop: '0' }}>tick the locations if you wish to include it in your itinerary</h6>
  <SuggestedLocations/>
  </>
)
const E = () => (
  <>
   <h1 style={{ marginBottom: '5px' }}>Food Options</h1>
    <h6 style={{ opacity: 0.7, fontSize: '14px', marginTop: '0' }}>Pick the food you would like to include</h6>
  <FoodOptions />
  </>
);
const App = () => {
  const [header, setHeader] = useState(0);
  return (
    <>
      <Sidebar setHeader={(x) => setHeader(x)} />
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