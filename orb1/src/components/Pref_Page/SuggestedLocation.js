import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import SuggLocations from "./SuggLocations";
import "./Explore.css";
import { getFirestore } from 'firebase/firestore';
import { firestore, firebase } from '../../firebase';
import { collection, query, getDocs, addDoc, doc, setDoc } from "firebase/firestore";

import axios from 'axios';

const SuggestedLocations = (props) => {
  const {data} = props;
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState({});
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState(null);

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

    const locationsRef = collection(firestore, 'users', userID, 'trips', tripID, 'locations');
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

    // Save as JSON file (server-side handling is recommended)
    // const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(selectedData));
    // const downloadAnchorNode = document.createElement('a');
    // downloadAnchorNode.setAttribute("href", dataStr);
    // downloadAnchorNode.setAttribute("download", "locations.json");
    // document.body.appendChild(downloadAnchorNode);
    // downloadAnchorNode.click();
    // downloadAnchorNode.remove();
  

  useEffect(() => {
    // filename: location_list_20230625T195008389Z.json

    const filename = 'location_list_20230627T192603047Z.json';
    fetch(`http://localhost:5123/files/${filename}`)
          .then(response => response.json())
          .then(data => {
              console.log(data);
              setLocations(data); 
          })
          .catch(error => console.error('Error fetching data:', error));
    }, []);


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
              {error ? (
                <div>Error fetching locations: {error}</div>
              ) : (
                locations.map((location, index) => (
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
              )}
              {/* {data.map((location, index) => (
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
              }; */}
            </div>
          </div>
        </div>
      </div>
      <div style={{ justifyContent: 'end' }}>
        <Button type="primary" onClick={submitData}>Submit</Button>
      </div>

      {/* Render API response */}
      {apiData && (
        <div>
          {apiData.map((location, index) => (
            <Card key={index} title={location.name}>
              {/* Display relevant data from the API response */}
              <p>Location: {location.location}</p>
              <p>Price: {location.price}</p>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default SuggestedLocations;




