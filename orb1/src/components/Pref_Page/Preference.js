import React, { useState } from "react";
import { Form, InputNumber, Checkbox, Button } from "antd";
import { CoffeeOutlined, ShoppingOutlined, StarOutlined } from "@ant-design/icons";
import {firestore} from "../.././pages/firebase";


import {firebase} from "../.././pages/firebase"
import {addDoc, collection} from "firebase/firestore"


import "./Preference.css";

console.log(firestore);


function Preference() {
  const [preferences, setPreferences] = useState({
    Food: undefined,
    Shopping: undefined,
    "Night Life": undefined,
    "Outdoor Activities": undefined,
    "Cultural Experiences": undefined,
    Sightseeing: undefined,
    "Beauty And Wellness": undefined,
    "Special Events": undefined
  });

  const handlePreferenceChange = (name) => (value) => {
    const newValue = Math.min(Math.max(value, 1), 8);
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: newValue,
    }));
  };

  const handleIncludeChange = (name) => (event) => {
    const checked = event.target.checked;
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: checked ? 1 : undefined,
    }));
  };

  // const handleSubmit = () => {
  //   // Perform actions with the preferences data
  //   console.log(preferences);
  // };
  //const ref = collection(firebase, "messages");

  const handleSubmit = async () => {
    try {
      // Perform actions with the preferences data
      console.log(preferences);

      // Store preferences in Firestore
      await addDoc(collection(firestore, "users"), preferences);
      console.log("Preferences stored in Firestore");
    } catch (error) {
      console.error("Error storing preferences:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        {Object.entries(preferences).map(([name, value]) => (
          <div className="preference" key={name}>
            <div>
              <span className="preference-name">
                {name}
                {name === "Food" && <CoffeeOutlined className="preference-icon" />}
                {name === "Shopping" && <ShoppingOutlined className="preference-icon" />}
                {name === "Night Life" && <StarOutlined className="preference-icon" />}
              </span>
            </div>
            <Checkbox
              name={name}
              checked={value !== undefined}
              onChange={handleIncludeChange(name)}
              className="include-checkbox"
            />
            {value !== undefined && (
              <InputNumber
                min={1}
                max={8}
                value={value}
                onChange={handlePreferenceChange(name)}
                className="input"
              />
            )}
          </div>
        ))}
        <div className="submit-button-wrapper">
          <Button type="primary" onClick={handleSubmit} className="submit-button">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Preference;
