import React, { useState } from "react";
import { Form, Input, Button, Collapse, DatePicker, message } from "antd";
import { saveAccommodationDetails } from "../../pages/authStore";
import "./Accommodation.css";
import { auth, db } from "../../firebase";
import Preference from "./Preference";
import { doc, updateDoc, getDoc, collection } from "firebase/firestore";
import  useStore  from '../../pages/authStore';
import { arrayUnion } from "firebase/firestore";



// import { useNavigate } from "react-router-dom";
const { Panel } = Collapse;


function Accommodation(props) {
  // const { tripId } = props;
  const tripId = useStore((state) => state.tripId);
  const setAccommodation = useStore((state) => state.setAccommodation);
  
  console.log(tripId);
//   const navigate = useNavigate();

  const [accommodations, setAccommodations] = useState([
    {
      hotelName: "",
      location: "",
      checkInDateTime: null,
      checkOutDateTime: null,
      latLong: "",
    },
  ]);
  const [isSaved, setIsSaved] = useState(false);

  const handleHotelNameChange = (index, value) => {
    const updatedAccommodations = [...accommodations];
    updatedAccommodations[index] = {
      ...updatedAccommodations[index],
      hotelName: value,
    };
    setAccommodations(updatedAccommodations);
  };

  const handleLocationChange = (index, value) => {
    const updatedAccommodations = [...accommodations];
    updatedAccommodations[index] = {
      ...updatedAccommodations[index],
      location: value,
    };
    setAccommodations(updatedAccommodations);
  };

  const handleCheckInDateTimeChange = (index, value) => {
    const updatedAccommodations = [...accommodations];
    updatedAccommodations[index] = {
      ...updatedAccommodations[index],
      checkInDateTime: value ? value.toDate() : null,
    };
    setAccommodations(updatedAccommodations);
  };

  const handleCheckOutDateTimeChange = (index, value) => {
    const updatedAccommodations = [...accommodations];
    updatedAccommodations[index] = {
      ...updatedAccommodations[index],
      checkOutDateTime: value ? value.toDate() : null,
    };
    setAccommodations(updatedAccommodations);
  };

  const handleLatLongChange = (index, value) => {
    const updatedAccommodations = [...accommodations];
    updatedAccommodations[index] = {
      ...updatedAccommodations[index],
      latLong: value,
    };
    setAccommodations(updatedAccommodations);
  };



  // const handleSubmit = async () => {
  //   try {
  //     const accommodationDetails = accommodations.map((accommodation) => ({
  //       hotelName: accommodation.hotelName,
  //       location: accommodation.location,
  //       checkInDateTime: accommodation.checkInDateTime,
  //       checkOutDateTime: accommodation.checkOutDateTime,
  //       latLong: accommodation.latLong,
  //     }));

  //     // Save the accommodation details to Firestore
  //     const userId = auth.currentUser.uid;
      
  //     const userRef = doc(db, "users", userId, "trips", tripId);
      
  //     const userDoc = await getDoc(userRef);
  //     //const userDoc = await getDoc(collection(db, "users", userId,"trips", tripId));
  //     // Get the existing data from the document
  //     const userData = userDoc.data();
  //     console.log("userData", userData);
      
  //     console.log("trip id", tripId);
  //      // Fetch the existing user document from Firestore
     
  //     const tripRef = doc(db, "users", userId, "trips", tripId);
  //     // const tripId = Math.random().toString();
  //     // setTripId(tripId);
  //     setAccommodation(accommodationDetails);


  //   const updatedTrips = {
  //     ...userData?.trips,
  //     [tripId]: {
  //       ...userData?.trips?.[tripId],
  //       accommodations: accommodationDetails,
  //     },
  //   };
  //   // Update the user document with the new data
  //   await updateDoc(tripRef, {
  //     currentTripId: tripId,
  //     trips: updatedTrips,
  //   });

  //     console.log("Accommodation details saved to Firestore");
  //     setIsSaved(true);
  //     props.onAccommodationSubmitted(true);
  //     message.success("Accommodation details saved successfully!");
      
  //   } catch (error) {
  //     console.error("Error saving accommodation details:", error);
  //     message.error("Error saving accommodation details");
  //   }
  // };
  const handleSubmit = async () => {
  try {
    const accommodationDetails = accommodations.map((accommodation) => ({
      hotelName: accommodation.hotelName,
      location: accommodation.location,
      checkInDateTime: accommodation.checkInDateTime,
      checkOutDateTime: accommodation.checkOutDateTime,
      latLong: accommodation.latLong,
    }));

    // Save the accommodation details to Firestore
    const userId = auth.currentUser.uid;
    const tripRef = doc(db, "users", userId, "trips", tripId);

    // Update the accommodations array in the trip document
    // Firebase will ensure each accommodation detail is unique in the array
    await updateDoc(tripRef, {
      accommodation: accommodationDetails,
    });
    setAccommodation(accommodationDetails);

    console.log("Accommodation details saved to Firestore");
    setIsSaved(true);
    props.onAccommodationSubmitted(true);
    message.success("Accommodation details saved successfully!");
    
  } catch (error) {
    console.error("Error saving accommodation details:", error);
    message.error("Error saving accommodation details");
  }
};

  
  return (
    <div className="container">
      <div className="form-wrapper">
        <Collapse activeKey={accommodations.length > 0 ? String(accommodations.length - 1) : ""}>
          {accommodations.map((accommodation, index) => (
            <Panel
              header={
                <div className="panel-header">
                  <span>Accommodation Details</span>
                  <Button
                    type="text"
              
                  />
                </div>
              }
              key={index.toString()}
            >
              <Form
              style={{ maxWidth: 20000000 }}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
               name={`accommodation-form-${index}`} initialValues={accommodation}>
                <Form.Item
                  name={`hotelName-${index}`}
                  label="Hotel Name"
                  rules={[{ required: true, message: "Please enter the hotel name!" }]}
                >
                  <Input
                    placeholder="Hotel Name"
                    className="input"
                    onChange={(e) => handleHotelNameChange(index, e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name={`location-${index}`}
                  label="Location"
                  rules={[{ required: true, message: "Please enter the location!" }]}
                >
                  <Input
                    placeholder="Location"
                    className="input"
                    onChange={(e) => handleLocationChange(index, e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name={`latLong-${index}`}
                  label="Lat-Long"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the latitude and longitude!",
                    },
                    {
                      pattern: /^\s*-?\d{1,2}(?:\.\d{1,2})?,\s*-?\d{1,3}(?:\.\d{1,2})?\s*$/,
                      message: "Please enter the latitude and longitude in the format: 37.51,127.09",
                    },
                  ]}
                >
                  <div className="input-container">
                  <Input
                    placeholder="Latitude-Longitude"
                    className="input"
                    onChange={(e) => handleLatLongChange(index, e.target.value)}
                  />
                </div>
                </Form.Item>
                <Form.Item
                  name={`checkInDate-${index}`}
                  label="Check-in"
                  rules={[{ required: true, message: "Please select the check-in date!" }]}
                >
                  <DatePicker
                    className="input"
                    style={{ width: "100%" }}
                    onChange={(value) => handleCheckInDateTimeChange(index, value)}
                  />
                </Form.Item>
                <Form.Item
                  name={`checkOutDate-${index}`}
                  label="Check-out "
                  rules={[{ required: true, message: "Please select the check-out date!" }]}
                >
                  <DatePicker
                    className="input"
                    style={{ width: "100%" }}
                    onChange={(value) => handleCheckOutDateTimeChange(index, value)}
                  />
                </Form.Item>
              </Form>
            </Panel>
          ))}
        </Collapse>
        
        <div className="button-wrapper">
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
       
        {isSaved && <div className="success-message"></div>}
      </div>
    </div>
  );
}

export default Accommodation;
