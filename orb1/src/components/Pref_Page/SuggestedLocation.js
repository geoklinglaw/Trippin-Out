import React, { useEffect, useState } from 'react';
import { Progress, Button, message } from 'antd';
import SuggLocations from "./SuggLocations";
import "./SuggestedLocations.css";
import { db, auth } from '../../firebase';
import { collection, query, getDoc, addDoc, doc, setDoc } from "firebase/firestore";
import  useStore  from '../../pages/authStore';
import { FaArrowDown } from "react-icons/fa";
import { saveSuggestedLocations } from '../../pages/authStore';
import { max } from 'moment/moment';


const SuggestedLocations = (props) => {

  const suggestedLocations = useStore((state) => state.suggestedLocations);
  const selectedSuggestedLocations = useStore((state) => state.selectedSuggestedLocations);
  const setSuggestedLocations = useStore((state) => state.setSuggestedLocations);
  const setSelectedSuggestedLocations = useStore((state) => state.setSelectedSuggestedLocations);
  const [duration, setDuration] = useState(0);
  const tripID = useStore((state) => state.tripId);
  let maxCount = duration < 3 ? duration * 3 : 8;
  
  const selectedData = Object.values(selectedSuggestedLocations).filter(location => location);

  const handleScrollToBottom = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const offset = 100; // To leave some space after scrolling
    const scrollTo = scrollHeight - windowHeight + offset;
    window.scrollTo({ top: scrollTo, behavior: "smooth" });
  };

  useEffect(() => {
    // Function to fetch the duration from Firestore
    const fetchDuration = async () => {
      const userId = auth.currentUser.uid;

      try {
        // Fetch the trip document from Firestore
        const tripRef = doc(db, 'users', userId, 'trips', tripID);
        const tripSnap = await getDoc(tripRef);
  
        // Get the duration from the trip document
        const tripData = tripSnap.data();
        if (tripData) {
          setDuration(tripData.duration);
        }
      } catch (error) {
        console.error('Error fetching duration from Firestore:', error);
      }
    };
  
    // Call the function to fetch the duration
    fetchDuration();
  }, []); // Empty dependency array ensures this effect runs only once on mount
  

  const toggleSelected = (props) => {
    const { locationId, photo, name, formatted_address, price, geocodes, category, activity_duration } = props;
    const selectedCount = Object.values(selectedSuggestedLocations).filter(location => location).length;
  
    console.log(duration);
  // Check if the limit of duration * 3 locations has been reached

  if (selectedCount >= maxCount) {
    message.warning('You have reached the maximum limit of selected locations!');
    return;
  }
    setSelectedSuggestedLocations({
      ...selectedSuggestedLocations,
      [locationId]: selectedSuggestedLocations[locationId]
        ? undefined 
        : { name, locationId, photo, formatted_address, price, geocodes, category, activity_duration } 
    });
  };
  

  const submitData = async () => {
    const selectedData = Object.values(selectedSuggestedLocations).filter(location => location);
    

    // const userID = useStore((state) => state.tripId);
    
    const userID = auth.currentUser.uid;
    // const locationID = Math.random().toString();
    // setLocationId(locationID);
    console.log("userID: " + userID);
    console.log("tripID: " + tripID);
    

    const locationsRef = collection(db, 'users', userID, 'trips', tripID, 'locations');
    for (const location of selectedData) {
        console.log(location)
        try {
            // console.log("id: " + location.locationId);
            // console.log("name: " + location.name);
            // console.log("add: " + location.formatted_address);
            // console.log("photo: " + location.photo);

            await addDoc(locationsRef, {
                name: location.name,
                locationId: location.locationId,
                latitude: location.geocodes.main.latitude.toFixed(4),
                longitude: location.geocodes.main.longitude.toFixed(4),
                photo: location.photo,
                address: location.formatted_address,
                category: location.category,
                activity_duration: location.activity_duration,
                // price: location.price
            });
            console.log("Document successfully written!");
        } catch (error) {
            console.error("Error storing locations:", error);
        }
    }
    message.success("Successfully submitted! Please proceed to explore the food options!");
};



  return (
    <>
    <Progress
        style={{ position: 'absolute', top: 60, right: 100}}
        type="circle"
        percent={(selectedData.length / maxCount) * 100} // Calculate the percentage of locations selected
        format={(percent) => `${selectedData.length} / ${maxCount}`}
        width={120}
        strokeWidth={15} 
      />
      <div style={{ display: "flex" }}>

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
              {suggestedLocations.map((location, index) => (
                  <SuggLocations
                    key={index}
                    locationId={index}
                    geocodes={location.geocodes}
                    selected={!!selectedSuggestedLocations[index]}
                    toggleSelected={toggleSelected}
                    photo={location.photos ? location.photos[0] : null}
                    name={location.name}
                    formatted_address={
                      location.location ? location.location.formatted_address : ""
                    }
                    price={location.price}
                    category={location.category}
                    activity_duration={location.activity_duration}
                  />
                ))
              };
            </div>
          </div>
        </div>
      </div>
      <div style={{ justifyContent: 'end' }}>
        <Button type="primary" onClick={submitData}>Submit</Button>
      </div>
      <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: "999" }}>
        <Button type="primary" shape="circle" size="large" onClick={handleScrollToBottom}>
        <FaArrowDown />
        </Button>
      </div>
    </>
  );
};

export default SuggestedLocations;