import React from "react";
import { useState } from "react";
import SuggItin from "../SuggItin";
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
          <h1
            style={{ marginLeft: "17px", fontSize: "40px", color: "#1C395B" }}
          >
            Explore
          </h1>
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
                  pic={itin.link}
                  title={itin.title}
                  description={itin.description}
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
