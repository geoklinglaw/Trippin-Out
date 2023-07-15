import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import SuggLocations from "./SuggLocations";
import "./Explore.css";

import { db, firebase } from '../../firebase';
import { collection, query, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import axios from 'axios';

const SuggestedLocations = (props) => {
  const {data} = props.data;

  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState({});
  const [error, setError] = useState(null);

  const toggleSelected = (props) => {
    const { locationId, photo, name, formatted_address, price } = props;
  
    setSelectedLocations(prevSelected => ({
      ...prevSelected,
      [locationId]: prevSelected[locationId]
        ? undefined 
        : { name, locationId, photo, formatted_address, price } 
    }));
  };
  

  const submitData = async () => {
    const selectedData = Object.values(selectedLocations).filter(location => location);

    const userID = 'pVOrWYawmnkMvUu3IFtn';
    const tripID = 'V1NBZp7HSK7hnEkKT0Aw';

    const locationsRef = collection(db, 'users', userID, 'trips', tripID, 'locations');
    for (const location of selectedData) {
        try {
            console.log("id: " + location.locationId);
            console.log("name: " + location.name);
            console.log("add: " + location.formatted_address);
            console.log("photo: " + location.photo);

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
              {data.map((location, index) => (
                  <SuggLocations
                    key={index}
                    locationId={index}
                    selected={!!selectedLocations[index]}
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




