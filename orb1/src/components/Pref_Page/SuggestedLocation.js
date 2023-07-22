import React, { useEffect, useState } from 'react';
import { Progress, Button, message } from 'antd';
import SuggLocations from "./SuggLocations";
import "./Explore.css";
import { getFirestore } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { collection, query, getDoc, addDoc, doc, setDoc } from "firebase/firestore";
import axios from 'axios';
import  useStore  from '../../pages/authStore';

const SuggestedLocations = (props) => {
  const { tripId } = props;
  console.log("tripId", tripId);
  const suggestedLocations = useStore((state) => state.suggestedLocations);
  const selectedSuggestedLocations = useStore((state) => state.selectedSuggestedLocations);
  const setSuggestedLocations = useStore((state) => state.setSuggestedLocations);
  const setSelectedSuggestedLocations = useStore((state) => state.setSelectedSuggestedLocations);
  const [duration, setDuration] = useState(0);
  
  const selectedData = Object.values(selectedSuggestedLocations).filter(location => location);
  useEffect(() => {
    // Function to fetch the duration from Firestore
    const fetchDuration = async () => {
      const userId = auth.currentUser.uid;
      console.log(userId);
      try {
        // Fetch the trip document from Firestore
        const tripRef = doc(db, 'users', userId, 'trips', tripId);
        console.log("tripRef:", tripRef);
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
    const { locationId, photo, name, formatted_address, price } = props;
    const selectedCount = Object.values(selectedSuggestedLocations).filter(location => location).length;
  
    console.log(duration);
  // Check if the limit of duration * 5 locations has been reached
  if (selectedCount >= duration * 5) {
    message.warning('You have reached the maximum limit of selected locations!');
    return;
  }
    setSelectedSuggestedLocations({
      ...selectedSuggestedLocations,
      [locationId]: selectedSuggestedLocations[locationId]
        ? undefined 
        : { name, locationId, photo, formatted_address, price } 
    });
  };
  

  const submitData = async () => {
    const selectedData = Object.values(selectedSuggestedLocations).filter(location => location);

    const userID = 'pVOrWYawmnkMvUu3IFtn';
    const tripID = 'V1NBZp7HSK7hnEkKT0Aw';

    const locationsRef = collection(db, 'users', userID, 'trips', tripID, 'locations');
    for (const location of selectedData) {
        try {
            // console.log("id: " + location.locationId);
            // console.log("name: " + location.name);
            // console.log("add: " + location.formatted_address);
            // console.log("photo: " + location.photo);

            await addDoc(locationsRef, {
                name: location.name,
                locationId: location.locationId,
                photo: location.photo,
                address: location.formatted_address,
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
        percent={(selectedData.length / (duration * 5)) * 100} // Calculate the percentage of locations selected
        format={(percent) => `${selectedData.length} / ${duration * 5}`}
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
                    selected={!!selectedSuggestedLocations[index]}
                    toggleSelected={toggleSelected}
                    photo={location.photos ? location.photos[0] : null}
                    name={location.name}
                    formatted_address={
                      location.location ? location.location.formatted_address : ""
                    }
                    price={location.price}
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
      
    </>
  );
};

export default SuggestedLocations;