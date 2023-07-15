import React, { useState } from "react";
import { InputNumber, Button, message } from "antd";
import axios from 'axios';
import "./Preference.css";
import '../../tailwind.css';



function Preference(props) {
  const [preferences, setPreferences] = useState([
    {
      "category": "Arts & Entertainment",
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
      "category": "Night Clubs",
      "category_id": "10032",
      "activity_duration": 3,
      "rank": undefined
    },
    {
      "category": "Historic and Protected Sites",
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
    },
    {
      "category": "Dining",
      "category_id": "13000",
      "activity_duration": 1,
      "rank": undefined
    }
  ]);

  const handlePreferenceChange = (index) => (value) => {
    const newValue = Math.min(Math.max(value, 1), 7);
    const newPreferences = [...preferences];
    newPreferences[index].rank = newValue;
    setPreferences(newPreferences);
  };

  
  async function submitPreferences() {
    const endpoint = 'http://localhost:5123/Preferences';
    try {
      const response = await axios.post(endpoint, { 
        "preferences": preferences
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
      message.error("Please ensure that all rankings are unique.");
      return;

    } else {
      const responseData = await submitPreferences();
      console.log(responseData);
      props.onPreferencesSubmitted(responseData);
      props.onSubmit();

    }

    const endpoint = 'YOUR_BACKEND_API_ENDPOINT';

    try {
      const response = await axios.post(endpoint, { preferences });
      console.log('Response from backend:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
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
              max={7}
              value={preference.rank}
              onChange={handlePreferenceChange(index)}
              className="input"
            />
          </div>
        ))}
      </div>
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