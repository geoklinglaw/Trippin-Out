import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import SuggLocations from "./SuggLocations";
import "./Explore.css";
import { getFirestore } from 'firebase/firestore';
import { db, firebase } from '../../firebase';
import { collection, query, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import axios from 'axios';
import  useStore  from '../../pages/authStore';

const SuggestedLocations = (props) => {
  const suggestedLocations = useStore((state) => state.suggestedLocations);
  const selectedSuggestedLocations = useStore((state) => state.selectedSuggestedLocations);
  const setSuggestedLocations = useStore((state) => state.setSuggestedLocations);
  const setSelectedSuggestedLocations = useStore((state) => state.setSelectedSuggestedLocations);

  const toggleSelected = (props) => {
    const { locationId, photo, name, formatted_address, price } = props;
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