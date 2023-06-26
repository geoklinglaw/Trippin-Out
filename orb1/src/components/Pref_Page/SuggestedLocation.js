import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import SuggLocations from "./SuggLocations";
import axios from 'axios';

const SuggestedLocations = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState({});
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState(null);

  const toggleSelected = (locationId) => {
    setSelectedLocations((prevSelected) => ({
      ...prevSelected,
      [locationId]: !prevSelected[locationId]
    }));
  };

  const submitData = () => {
    const options = {
      method: 'GET',
      url: 'https://api.foursquare.com/v3/places/search',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3qCGoblyIuPq8VtotDLf6IE9Ez0wVz7WK2nuS4xZXyAk='
      }
    };

    axios
      .request(options)
      .then(function (response) {
        setApiData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8000/tempLocations1")
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




// import React, { useEffect, useState } from 'react';
// import { Card,  Button, Space } from 'antd';
// import SuggLocations from "./SuggLocations";
// import "./Explore.css";
// import {firestore} from "../.././pages/firebase";
// import {firebase} from "../.././pages/firebase";
// import {db} from "../.././pages/firebase";

// import axios from 'axios';
// import { UserContext } from '../../userContext';


// const SuggestedLocations = () => {
//   // const { userID, setUserID } = useContext(UserContext);
//   const [locations, setLocations] = useState([]);
//   const [selectedLocations, setSelectedLocations] = useState({}); // keep track of selected locations
//   const [error, setError] = useState(null);

//   const toggleSelected = (locationId) => {
//     setSelectedLocations(prevSelected => ({
//       ...prevSelected,
//       [locationId]: !prevSelected[locationId]
//     }));
//   };

//   const submitData = () => {
//     const selectedData = locations.filter((location, index) => selectedLocations[index]);

//     const db = firestore;
//     const userID =  'pVOrWYawmnkMvUu3IFtn';
//     const tripID = 'V1NBZp7HSK7hnEkKT0Aw';
//     const userRef = db.collection('users').doc(userID); // pVOrWYawmnkMvUu3IFtn
//     const tripsRef = userRef.collection('trips'); //V1NBZp7HSK7hnEkKT0Aw 
//     const tripRef = tripsRef.doc(tripID);
//     const locationsRef = tripRef.collection('locations');
    
//     db.collection('locations').add({
//       locations: selectedData,
//       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//     })
//     .then(() => console.log('Data successfully written!'))
//     .catch((error) => console.error('Error writing document: ', error));

//     // Save as JSON file (server-side handling is recommended)
//     // const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(selectedData));
//     // const downloadAnchorNode = document.createElement('a');
//     // downloadAnchorNode.setAttribute("href", dataStr);
//     // downloadAnchorNode.setAttribute("download", "locations.json");
//     // document.body.appendChild(downloadAnchorNode);
//     // downloadAnchorNode.click();
//     // downloadAnchorNode.remove();
//   };

//   useEffect(() => {
//     fetch("http://localhost:7000/tempLocations1")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => setLocations(data))
//       .catch((err) => setError(err.message));
//   }, []);

//   return (
//     <>
//       <div style={{ display: "flex" }}>
//         {/* ... */}
//       </div>
//       <div>
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <div style={{ margin: "30px" }}>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 flexWrap: "wrap",
//                 gap: "20px",
//               }}
//             >
//               {error ? (
//                 <div>Error fetching locations: {error}</div>
//               ) : (
//                 locations.map((location, index) => (
//                   <SuggLocations
//                     key={index}
//                     locationId={index}
//                     selected={!!selectedLocations[index]}
//                     toggleSelected={toggleSelected}
//                     photo={location.photos ? location.photos[0] : null}
//                     name={location.name}
//                     formatted_address={
//                       location.location ? location.location.formatted_address : ""
//                     }
//                     price={location.price}
//                   />
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div style={{justifyContent: 'end'}}>
//             <Button type="primary" onClick={submitData}> Submit </Button>
//       </div>
//     </>
//   );
// };

// export default SuggestedLocations;


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
