import React, { useState } from "react";
import { Steps, Layout, Menu, theme } from "antd";
import Sidebar from "../components/Sidebar";
import two from "../images/2.png";
import Explore from "../components/Pref_Page/Explore";
import Pref from "../components/Pref_Page/Pref";
import Accommodation from "../components/Pref_Page/Accommodation";

const description = "This is a description.";
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

const C = () => <h1>Preferences</h1>; 
                <Pref />
const D = () => {
  return (
    <h1>
      <img src={two} />
      Locations
    </h1>
  );
};
const E = () => {
  return <h1>Food Options</h1>;
};
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
