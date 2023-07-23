import React, { useEffect, useState } from 'react';
import Calendar from './Calender';
import { Card,  Button, Space } from 'antd';
import { getDoc, db, firebase } from "../firebase";
import {
  collection,
  query,
  getDocs,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import axios from "axios";
import  useStore  from './authStore';
import { auth } from "../firebase";

const Itinerary = () => {
    const [locations, setLocations] = useState(null);
    const [route, setRoute] = useState(null);
    const [matrix, setMatrix] = useState(null);
    const accommodation = useStore((state) => state.accommodation);
    const tripID = useStore((state) => state.tripId);

    async function fetchfromFirebase() {
        const userID = auth.currentUser.uid;
        console.log("userID: " + userID);
        console.log("tripID: " + tripID);

        const locationsRef = collection(db, "users", userID, "trips", tripID, "locations");
        const locationSnapshot = await getDocs(locationsRef);
        const locations = locationSnapshot.docs.map(doc => doc.data());
        console.log("locations: ", locations);
        const locationsJson = JSON.stringify(locations);

        return locationsJson;
    }
    

    async function callDistanceMatrixAPI(accoms, locationsJSON) {
        const endpoint = "http://localhost:5123/distanceMatrix";
        try {
          const response = await axios.get(endpoint, {
            params: {
                accommodation: accoms,
                locations: locationsJSON,
             },
          });
          console.log("distance matrix results: ", response.data.data);
          return response.data.data; 
        } catch (error) {
          console.error("Error retrieving data: ", error);
        }
      }

      async function generateItinerary(distanceMatrix) {
        const endpoint = "http://localhost:5123/itinerary";
        try {
          const response = await axios.post(endpoint, {
                // accommodation: accoms,
                // locations: locationsJSON,
                distMat: distanceMatrix
          });
          console.log("Itinerary: ", response.data.data);
          return response.data.data; 
        } catch (error) {
          console.error("Error retrieving data: ", error);
        }
      }
    

      useEffect(() => {
        (async () => {
            const locationsJSON = await fetchfromFirebase()
            setLocations(JSON.parse(locationsJSON));
            console.log("locationsJSON: ", locationsJSON);
            console.log("accommodation in itinerary: ", accommodation);
            const results = await callDistanceMatrixAPI(accommodation, locationsJSON);
            const itinerary = await generateItinerary(results);
            console.log("itinerary line 80: ", itinerary);
            setRoute(itinerary);
            setMatrix(results);
        })(); 
    }, []);
    


    if (!route) {
        return <div>Loading...</div>
    }

    return (
    <>
        <Calendar propsLoc={locations} propsRoute={route} propsMatrix={matrix}/>
        
        {/* <div style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto' }}>
            {Object.entries(route).map(([day, routeIndexes], dayIndex) => (
                <div key={dayIndex} style={{ margin: '20px', border: '1px solid black', padding: '10px', minWidth: '200px' }}>
                    <h3>{day}</h3>
                    <ul>
                        {routeIndexes.map((locationIndex, index) => {
                            const location = locations[locationIndex];

                            return (
                                <li key={index}>
                                    <h4>{location.name}</h4>
                                    <p>{location.location.formatted_address}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            ))}
        </div> */}

    </>

    );
}

export default Itinerary;