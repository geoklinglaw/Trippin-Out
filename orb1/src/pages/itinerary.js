
    // async function fetchfromFirebase() {
    //     const userID = "pVOrWYawmnkMvUu3IFtn"; //"dBLCC8TXlrYkYQXDZ7f5eFyvex92" 
    //     const tripID = "V1NBZp7HSK7hnEkKT0Aw"; //"sdIccla3xbdTQLpCjn7Y" 
    
    //     // References to food and locations subcollections
    //     const foodRef = collection(db, "users", userID, "trips", tripID, "food");
    //     const locationsRef = collection(db, "users", userID, "trips", tripID, "locations");
    //     const destinationRef = doc(db, "users", userID, "trips", tripID);
    
    //     const foodSnap = await getDocs(foodRef);
    //     const locationSnap = await getDocs(locationsRef);
    //     const destinationSnap = await getDoc(destinationRef);
    
    //     if (destinationSnap.exists()) {
    //         const accommodation = destinationSnap.data().latlong;
    //         console.log(accommodation);
    
    //         // Fetch data from food and locations collections
    //         const foodData = foodSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //         console.log(foodData);
    //         const locationData = locationSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //         console.log(locationData);
    
    //         // Return your data accordingly
    //         return { accommodation, foodData, locationData };
    //     } else {
    //         console.error("No such document exists!");
    //     }
    // };

    // async function fetchDataWithParams(locations, food, accoms) {
    //     const endpoint = "http://localhost:5000/itinerary";
    //     try {
    //       const response = await axios.get(endpoint, {
    //         params: { 
    //             locations: locations,
    //             food: food,
    //             accoms: accoms
    //         },
    //       });
    //       console.log("response: ", response.data.data);
    //       return response.data.data; 
    //     } catch (error) {
    //       console.error("Error retrieving data: ", error);
    //     }
    // };

    // useEffect(() => {

    //     (async () => {
    //     const { locations, food, accoms } = await fetchfromFirebase();


    //     const allData = await fetchDataWithParams(locations, food, accoms);
    //     // setLocations(allData);
    //     })();
    // }, []);




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

const Itinerary = () => {
    const [locations, setLocations] = useState(null);
    const route = {'day1': [0, 5, 1, 6, 7, 0], 'day2': [0, 6, 3, 2, 0]};

z
    useEffect(() => {
        const filename = 'location_list_20230627T205236778Z.json';
        fetch(`http://localhost:5000/files/${filename}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setLocations(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (!locations) {
        return <div>Loading...</div>
    }

    return (
        <>
        <Calendar propsLoc={locations} propsRoute={route}/>

        
        
        <div style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto' }}>
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
        </div>

        </>
    );
}

export default Itinerary;