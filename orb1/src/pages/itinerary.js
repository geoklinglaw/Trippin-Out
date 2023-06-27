import React, { useEffect, useState } from 'react';
import { Card,  Button, Space } from 'antd';

const Itinerary = () => {
    const [locations, setLocations] = useState(null);

    useEffect(() => {
        const filename = 'sorted_routes.json';
        fetch(`http://localhost:5000/files/${filename}`)
              .then(response => response.json())
              .then(data => {
                  console.log(data);
                  setLocations(data);
              })
              .catch(error => console.error('Error fetching data:', error));
        }, []);

    // Check if the locations have been set, if not, display loading
    if (!locations) {
        return <div>Loading...</div>
    }

    return (
        <div style={{ display: 'flex', overflowX: 'auto' }}>
            {locations.results.map((day, index) => (
                <div key={index} style={{ margin: '20px', border: '1px solid black', padding: '10px', minWidth: '200px' }}>
                    <h3>Day {day.vehicle + 1}</h3>
                    <p>Total Travelling Time: {day.time} minutes</p>
                    <ul>
                        {day.attraction.map((attraction, attractionIndex) => (
                            <li key={attractionIndex}>
                                <h4>{attraction.name}</h4>
                                <p>{attraction.location.formatted_address}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Itinerary;
