import React from "react";
import { useState } from "react";
import SuggItin from "./SuggItin";
import "./Explore.css";
import two from "../../images/2.png";
import { Input, Space } from "antd";
import "./Explore.css";
import Select from 'react-select';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';



function Pref() {


  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            alignItems: "center",
          }}
        >
          <img style={{ width: "40px", height: "40px" }} src={two} />
          <h1 className="h1Style">
            Preferences
          </h1>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pref;
