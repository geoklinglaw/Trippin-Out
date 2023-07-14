import React, { useState } from "react";
import { InputNumber, Button, message } from "antd";
import axios from 'axios';
import "./Preference.css";
import '../../tailwind.css';
import SuggestedLocations from './SuggestedLocation.js'


function Preference(props) {

  const [preferences, setPreferences] = useState([
    {
      "category": "Exhibitions & Museums",
      "category_id": "10000",
      "activity_duration": 2,
      "rank": undefined
    },
    {
      "category": "Sports and Recreation",
      "category_id": "18067",
      "activity_duration": 2,
      "rank": undefined
    },
    {
      "category": "Night Life",
      "category_id": "10032",
      "activity_duration": 3,
      "rank": undefined
    },
    {
      "category": "Historic & Protected Sites",
      "category_id": "16020",
      "activity_duration": 3,
      "rank": undefined
    },
    {
      "category": "Landmark & Outdoors",
      "category_id": "16000",
      "activity_duration": 3,
      "rank": undefined
    },
    {
      "category": "Entertainment Events",
      "category_id": "14003",
      "activity_duration": 3,
      "rank": undefined
    }
    // {
    //   "category": "Dining",
    //   "category_id": "13000",
    //   "activity_duration": 1,
    //   "rank": undefined
    // }
  ]);

  const handlePreferenceChange = (index) => (value) => {
    const newValue = Math.min(Math.max(value, 1), 7);
    const newPreferences = [...preferences];
    newPreferences[index].rank = newValue;
    setPreferences(newPreferences);
  };
  
  async function submitPreferences() {
    const endpoint = 'http://localhost:5000/Preferences';
    try {
      const response = await axios.post(endpoint, { 
        preferences
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error submitting data:', error)
      return null;
    }
  }
  
  const handleSubmit = async () => {
    const ranks = preferences.map(p => p.rank);
    const uniqueRanks = new Set(ranks);

    if (uniqueRanks.size !== ranks.length) {
      message.error("Please fill up all boxes and ensure that all rankings are unique.");
      return;
    } else {
      const responseData = await submitPreferences();
      console.log(responseData);
      props.onPreferencesSubmitted(responseData);
      props.onSubmit();

    }
    
  };

  return (
    <div className="container mx-auto p-4">
      <div >
        {preferences.map((preference, index) => (
          <div
            key={preference.category_id}
            className="preference-item"
          >
            <div className="category-text">
              {preference.category}
            </div>
            <InputNumber
              min={1}
              max={6}
              value={preference.rank}
              onChange={handlePreferenceChange(index)}
              className="input"
            />
          </div>
        ))}
      </div>
      <div style={{ margin: "60px" }}> </div>
      <div className="submit-button-wrapper">
        <Button
          type="primary"
          onClick={handleSubmit}
          className="submit-button"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Preference;