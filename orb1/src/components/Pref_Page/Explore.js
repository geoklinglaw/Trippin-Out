import React from "react";
import { useState } from "react";
import SuggItin from "./SuggItin";
import "./Explore.css";
import itinerary from "../../json/suggItin.json";
import two from "../../images/2.png";
import { Input, Space } from "antd";
const { Search } = Input;

function Explore() {
  const handleSubmit = (e) => {
    console.log(search);
    alert("You have searched successfully!");
  };

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const isEmpty = (search) => {
    return search === "";
  };

  async function fetchItineraries() {
    const response = await fetch('itinerary');
    // waits until the request completes...
    console.log(response);
  }

  const itin = itinerary;

  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img style={{ width: "40px", height: "40px" }} src={two} />
          <h1 className="h1Style"> Explore </h1>
        </div>
        {/* <form onSubmit={handleSubmit}> 
                <input value={search} onChange={handleSearch} type='text'/>
                <button type='submit'> search </button>
                <p> {isEmpty(search) ? 'Please enter a search term' : search} </p>
            </form> */}
        <div
          style={{ marginLeft: "auto", marginRight: "45px", marginTop: "90px" }}
        >
          <Search
            placeholder="Search for an itinerary"
            onSearch={handleSubmit}
            onChange={handleSearch}
            style={{
              width: 250,
            }}
          />
          <p> {isEmpty(search) ? "Please enter a search term" : search} </p>
        </div>
      </div>
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
              {itinerary.map((itin) => (
                <SuggItin
                  key={itin.id}
                  pic={itin.image}
                  title={itin.title}
                  description={itin.description}
                  link={itin.link}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Explore;
