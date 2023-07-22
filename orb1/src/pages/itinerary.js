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



    useEffect(() => {
        const filename = 'location_list_20230627T205236778Z.json';
        fetch(`http://localhost:5123/files/${filename}`)
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
        <Calendar props={locations}/>
        
        
        
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