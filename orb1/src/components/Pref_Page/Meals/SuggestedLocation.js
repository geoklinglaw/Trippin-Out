import React from 'react';
import { Card } from 'antd';

const SuggestedLocations = () => {
  const locations = [
    { name: 'N Seoul Tower', location: 'Yongsan-gu, Seoul', price: '$$$' },
    { name: 'Seodaemun Prison Museum', location: 'Seodaemun-gu, Seoul', price: '$' },
    { name: 'Hwaseong Fortress', location: 'Suwon, Gyeonggi-do', price: '$' },
    // Add more locations as needed
  ];

  return (
    <div>
      {locations.map((location, index) => (
        <Card key={index} title={location.name}>
          <p>Location: {location.location}</p>
          <p>Price: {location.price}</p>
        </Card>
      ))}
    </div>
  );
};

export default SuggestedLocations;
