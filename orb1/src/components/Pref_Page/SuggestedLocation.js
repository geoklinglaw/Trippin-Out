import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import SuggLocations from "./SuggLocations";
import "./Explore.css";
import axios from 'axios';
// import { doc, getDoc, collection } from 'firebase/firestore';
// import { firestore } from '../../pages/firebase';



// const SuggestedLocations = () => {
//   const [locations, setLocations] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userDoc = await getDoc(doc(collection(firestore, 'users'), 'userId'));
//         const accommodationDoc = await getDoc(doc(collection(firestore, 'accommodations'), 'accommodationId'));

//         if (userDoc.exists && accommodationDoc.exists) {
//           const userData = userDoc.data();
//           const accommodationData = accommodationDoc.data();

          

//           // Fetch data from the Foursquare API based on the recommendations
//           const foursquareData = await fetchFoursquareData();

//           setLocations(foursquareData);
//         } else {
//           console.log('No such document!');
//         }
//       } catch (error) {
//         console.error('Error getting document:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   async function fetchFoursquareData(recommendations) {
//     const foursquareData = [];

//     for (let recommendation of recommendations) {
//       const response = await axios.get(`https://api.foursquare.com/v2/venues/search?near=${recommendation}&client_id=QUY2SAEFR32V2JI0WZWBLKEKOFHOX3S0YU5PMIAZQWO3AE13&client_secret=GAFIS00C3B4T25EOHCSK23HRWWIVCJNZQXJFS0I4E5ZHB3WJ&v=20230612`);

//       foursquareData.push(response.data);
//     }

//     return foursquareData;
//   }

//   return (
//     <div>
//       {locations.map((location, index) => (
//         <Card key={index} title={location.name}>
//           <p>Location: {location.location}</p>
//           <p>Price: {location.price}</p>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default SuggestedLocations;

const SuggestedLocations = () => {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/tempLocations1")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setLocations(data))
      .catch((err) => setError(err.message));
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
                    photo={location.photos ? location.photos[0] : null}
                    name={location.name}
                    formatted_address={
                      location.location ? location.location.formatted_address : ""
                    }
                    price={location.price}
                    rating={location.rating}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuggestedLocations;