import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import axios from 'axios';
import { doc, getDoc, collection } from 'firebase/firestore';
import { firestore } from '../../pages/firebase';



const SuggestedLocations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDoc = await getDoc(doc(collection(firestore, 'users'), 'userId'));
        const accommodationDoc = await getDoc(doc(collection(firestore, 'accommodations'), 'accommodationId'));

        if (userDoc.exists && accommodationDoc.exists) {
          const userData = userDoc.data();
          const accommodationData = accommodationDoc.data();

          

          // Fetch data from the Foursquare API based on the recommendations
          const foursquareData = await fetchFoursquareData();

          setLocations(foursquareData);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error getting document:', error);
      }
    };

    fetchData();
  }, []);

  async function fetchFoursquareData(recommendations) {
    const foursquareData = [];

    for (let recommendation of recommendations) {
      const response = await axios.get(`https://api.foursquare.com/v2/venues/search?near=${recommendation}&client_id=QUY2SAEFR32V2JI0WZWBLKEKOFHOX3S0YU5PMIAZQWO3AE13&client_secret=GAFIS00C3B4T25EOHCSK23HRWWIVCJNZQXJFS0I4E5ZHB3WJ&v=20230612`);

      foursquareData.push(response.data);
    }

    return foursquareData;
  }

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
