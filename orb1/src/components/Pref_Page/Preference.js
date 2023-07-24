import React, { useState, useEffect } from "react";
import { InputNumber, Button, message, Modal } from "antd";
import  useStore  from '../../pages/authStore';
import { getDoc, db, firebase } from "../../firebase";
import axios from 'axios';
import "./Preference.css";
import '../../tailwind.css';
import { auth } from "../../firebase";
import SuggestedLocations from './SuggestedLocation.js'
import {
  collection,
  query,
  getDocs,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import Loading from "../Loading";

function Preference(props) {
  const preferences = useStore((state) => state.preferences);
  const setPreferences = useStore((state) => state.setPreferences);
  const setSuggestedLocations = useStore((state) => state.setSuggestedLocations);
  const setLocations = useStore((state) => state.setfoodLocations);
  const tripID = useStore((state) => state.tripId);
  const [loading, setLoading] = useState(false);
  const accommodation = useStore((state) => state.accommodation);
  
  async function fetchDataWithParams(destination) {
    const endpoint = "http://localhost:5123/food-options";
    try {
      const response = await axios.get(endpoint, {
        params: { destination },
      });
      console.log("response: ", response.data.data);
      return response.data.data; 
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  }

  
  async function fetchfromFirebase() {
    const userID = auth.currentUser.uid;
    const durationRef = doc(db, "users", userID, "trips", tripID);
    const durationSnap = await getDoc(durationRef);

    if (durationSnap.exists()) {
      const duration = durationSnap.data().duration;
      console.log("DURATION IN RPEFERENCES.JS: ", duration);
      return duration;
    } else {
      console.error("No such document exists!");
    }
  }

  // useEffect(() => {
  //   (async () => {
  //     // const destination = await fetchfromFirebase();
  //     // const locationsData = await fetchDataWithParams(destination);
  //     // setLocations(locationsData);
  //   })();
  // }, [setLocations]);
    

  const handlePreferenceChange = (index) => (value) => {
    const newValue = Math.min(Math.max(value, 1), 7);
    const newPreferences = [...preferences];
    newPreferences[index].rank = newValue;
    setPreferences(newPreferences);
    console.log(newPreferences);
  };
  
  async function submitPreferences(accommodations) {
    const endpoint = 'http://localhost:5123/Preferences';
    try {
      console.log("accommodations: ", accommodations);
      const accommodation = accommodations[0].latLong;
      console.log("Acommodation details", accommodation)
      const duration = await fetchfromFirebase();
      const response = await axios.post(endpoint, { 
        preferences, accommodation, duration
      });
      console.log("RECEIVED PREF.JS:", response.data)
      return response.data;
    } catch (error) {
      console.error('Error submitting data:', error)
      return null;
    }
  }
  
  // const handleSubmit = async () => {
  //   const ranks = preferences.map(p => p.rank);
  //   console.log(ranks); // Add this line to see the rankings before validation
  //   const uniqueRanks = new Set(ranks);

  //   if (uniqueRanks.size !== ranks.length) {
  //     message.error("Please fill up all boxes and ensure that all rankings are unique.");
  //     return;
  //   } else {
  //     const responseData = await submitPreferences();
  //     console.log(responseData.data);
  //     setSuggestedLocations(responseData.data);
  //     props.onPreferencesSubmitted(responseData);
  //     props.onSubmit();

  //   }
    
  // };
  const handleSubmit = async () => {
    const ranks = preferences.map((p) => p.rank);
    console.log(ranks); // Add this line to see the rankings before validation
    const uniqueRanks = new Set(ranks);
  
    if (uniqueRanks.size !== ranks.length) {
      message.error(
        "Please fill up all boxes and ensure that all rankings are unique."
      );
      return;
    } else {

      try {
        setLoading(true); // Show the loading modal
        const responseData = await submitPreferences(accommodation);
        console.log("PREFERENCE", responseData.data);
        setSuggestedLocations(responseData.data);
        props.onPreferencesSubmitted(responseData);
        props.onSubmit();
      
      } catch (error) {
        console.error("Error submitting data:", error);
      } finally {
        setLoading(false); // Hide the loading modal after the API call is completed
      }

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
      <Modal
        visible={loading}
        title="Loading"
        closable={false}
        footer={null}
        style={{ textAlign: "center" }} // Add this line to centralize the title
      >
      </Modal>

    </div>
  );
}

export default Preference;