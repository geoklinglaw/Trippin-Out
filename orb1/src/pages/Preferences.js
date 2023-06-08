import React, { useState } from "react";
import { Steps, Layout, Menu, theme } from "antd";
import Sidebar from "../components/Sidebar";
import two from "../images/2.png";
import Explore from "../components/Pref_Page/Explore";
import Pref from "../components/Pref_Page/Pref";


const description = "This is a description.";
const A = () => <Explore />;
const B = () => {
  return <h1>Accomodation</h1>;
};
const C = () => <Pref />;
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
