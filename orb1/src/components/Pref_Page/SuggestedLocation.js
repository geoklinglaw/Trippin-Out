import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import SuggLocations from "./SuggLocations";
import "./Explore.css";
import { getFirestore } from 'firebase/firestore';
import { db, firebase } from '../../firebase';
import { collection, query, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import axios from 'axios';
import  useStore  from '../../pages/authStore';
import { auth } from "../../firebase";
import { saveSuggestedLocations } from '../../pages/authStore';

const SuggestedLocations = (props) => {
  const suggestedLocations = useStore((state) => state.suggestedLocations);
  const selectedSuggestedLocations = useStore((state) => state.selectedSuggestedLocations);
  const setSuggestedLocations = useStore((state) => state.setSuggestedLocations);
  const setSelectedSuggestedLocations = useStore((state) => state.setSelectedSuggestedLocations);
  const tripID = useStore((state) => state.tripId);
  // const setLocationId = useStore((state) => state.setLocationId);

  const toggleSelected = (props) => {
    console.log("SELECTED")
    console.log(props.activity_duration)
    const { locationId, photo, name, formatted_address, price, geocodes, category, activity_duration } = props;
    
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
    // const tripID = useStore((state) => state.tripId);
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
};
  

  // useEffect(() => {
  //   // filename: location_list_20230625T195008389Z.json
  //   const filename = 'location_list_20230627T131746308Z.json';
  //   fetch(`http://localhost:5123/files/${filename}`)
  //         .then(response => response.json())
  //         .then(data => {
  //             console.log(data);
  //             setSuggestedLocations(data); 
  //         })
  //         .catch(error => console.error('Error fetching data:', error));
  //   }, []);


  return (
    <>
      <div style={{ display: "flex" }}>
        {/* ... */}
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
    </>
  );
};

export default SuggestedLocations;