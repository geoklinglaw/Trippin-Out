import React, { useState, useEffect } from 'react';
import { Segmented, Button } from 'antd';
import SuggLocations from "./SuggLocations";
import './FoodOptions.css';
import { getFirestore } from 'firebase/firestore';
import { firestore, firebase } from '../../firebase';
import { collection, query, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import itinerary from './../../pages/itinerary';

const FoodOptions = () => {
  // const { userID, setUserID } = useContext(UserContext);
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState({}); // keep track of selected locations
  const [error, setError] = useState(null);
  const navigate = useNavigate();



  const toggleSelected = (props) => {
    const { locationId, photo, name, formatted_address, price } = props;
  
    setSelectedLocations(prevSelected => ({
      ...prevSelected,
      [locationId]: prevSelected[locationId]
        ? undefined 
        : { name, locationId, photo, formatted_address, price } 
    }));
  };

  const handleClick = (e) => {
    submitData();
    generateItinerary();
  
  }

  const generateItinerary = () => {
    console.log("generateItinerary");
    navigate("/itinerary");
    <Route path="orb1/src/pages/itinerary" element={<itinerary />} />
  };

  useEffect(() => {
    const filename = 'food_options_20230627T123722044Z.json';
    fetch(`http://localhost:5123/files/${filename}`)
          .then(response => response.json())
          .then(data => {
              console.log(data);
              setLocations(data); 
          })
          .catch(error => console.error('Error fetching data:', error));
  }, []);

  const submitData = async () => {
    const selectedData = Object.values(selectedLocations).filter(location => location);

    const userID = 'pVOrWYawmnkMvUu3IFtn';
    const tripID = 'V1NBZp7HSK7hnEkKT0Aw';

    // Reference to the locations collection
    const locationsRef = collection(firestore, 'users', userID, 'trips', tripID, 'food');

    // Loop through each selected location and save it to Firestore
    for (const location of selectedData) {
        try {
            console.log("id: " + location.locationId);
            console.log("name: " + location.name);
            console.log("add: " + location.formatted_address);
            console.log("photo: " + location.photo);

            // You might want to use addDoc if you don't have a specific ID in mind
            // It automatically generates a document ID for the new location document
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
      <div style={{justifyContent: 'end'}}>
            <Button type="primary" onClick={handleClick}> Submit </Button>
      </div>
    </>
  );
};

export default FoodOptions;



// function FoodOptions() {
//   const [restaurants, setRestaurants] = useState([]);
//   const [value, setValue] = useState('breakfast');

//   useEffect(() => {
//     const fetchRestaurants = async (mealType) => {
//       const url = 'https://yelpapiserg-osipchukv1.p.rapidapi.com/getBusinesses';
//       const options = {
//         method: 'POST',
//         headers: {
//           'content-type': 'application/x-www-form-urlencoded',
//           'X-RapidAPI-Key': '08356776bfmshd283e4ab5b00be9p14eaf1jsn487adaa5949b',
//           'X-RapidAPI-Host': 'YelpAPIserg-osipchukV1.p.rapidapi.com'
//         },
//         body: new URLSearchParams({
//           text: mealType, // Using the mealType as search term
//           accessToken: '<REQUIRED>' // Replace with the actual access token if required
//         })
//       };

//       try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         setRestaurants(result);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchRestaurants(value);
//   }, [value]);

//   const handleOptionChange = newValue => {
//     setValue(newValue);
//   };

//   const options = [
//     { label: 'Breakfast', value: 'breakfast', component: <Breakfast restaurants={restaurants}/> },
//     { label: 'Lunch', value: 'lunch', component: <Lunch restaurants={restaurants}/> },
//     { label: 'Dinner', value: 'dinner', component: <Dinner restaurants={restaurants}/> },
//     { label: 'Dessert', value: 'dessert', component: <Dessert restaurants={restaurants}/> },
//   ];

//   const selectedOption = options.find(option => option.value === value);

//   return (
//     <div>
//       <h1>{value.charAt(0).toUpperCase() + value.slice(1)}</h1>
//       <Segmented
//         options={options.map(option => option.value)}
//         value={value}
//         onChange={handleOptionChange}
//       />
//       <div>
//         {selectedOption?.component}
//       </div>
//     </div>
//   );
// }

// export default FoodOptions;

