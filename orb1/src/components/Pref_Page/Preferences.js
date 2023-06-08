import React, { useState } from "react";
import { Form, InputNumber, Checkbox, Button } from "antd";
import { CoffeeOutlined, ShoppingOutlined, StarOutlined } from "@ant-design/icons";

import "./Preferences.css";

function Preferences() {
  const [preferences, setPreferences] = useState({
    Food: undefined,
    Shopping: undefined,
    "Night Life": undefined,
    "Outdoor Activities": undefined,
    "Cultural Experiences": undefined,
    Sightseeing: undefined,
    "Beauty And Wellness": undefined,
    "Special Events": undefined,
  });

  const handlePreferenceChange = (name) => (value) => {
    const newValue = Math.min(Math.max(value, 1), 8);
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: newValue,
    }));
  };

  const handleIncludeChange = (name, checked) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: checked ? undefined : "-",
    }));
  };

  const handleSubmit = () => {
    // Perform actions with the preferences data
    console.log(preferences);
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
              onChange={(e) => handleIncludeChange(name, e.target.checked)}
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

export default Preferences;
