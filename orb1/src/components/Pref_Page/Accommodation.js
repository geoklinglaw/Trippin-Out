import React, { useState } from "react";
import { Form, Input, Button, Collapse, DatePicker, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { saveAccommodationDetails } from "../../pages/authStore";
import "./Accommodation.css";
import { auth } from "../../firebase";

const { Panel } = Collapse;

function Accommodation(props) {
  const [accommodations, setAccommodations] = useState([
    {
      hotelName: "",
      location: "",
      checkInDateTime: null,
      checkOutDateTime: null,
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
  
  const addAccommodation = () => {
    const newAccommodation = {
      hotelName: "",
      location: "",
      checkInDateTime: null,
      checkOutDateTime: null,
    };
    setAccommodations([...accommodations, newAccommodation]);
  };

  const removeAccommodation = (index) => {
    const updatedAccommodations = [...accommodations];
    updatedAccommodations.splice(index, 1);
    setAccommodations(updatedAccommodations);
  };

  const handleSubmit = async () => {
    try {
      const accommodationDetails = accommodations.map((accommodation) => ({
        hotelName: accommodation.hotelName,
        location: accommodation.location,
        checkInDateTime: accommodation.checkInDateTime,
        checkOutDateTime: accommodation.checkOutDateTime,
      }));
  
      // Save the accommodation details to Firestore
      const userId = auth.currentUser.uid;
      const tripId = Math.random().toString();
  
      await saveAccommodationDetails(userId, tripId, accommodationDetails);
  
      console.log("Accommodation details saved to Firestore");
      setIsSaved(true);
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
                  <span>Accommodation {index + 1}</span>
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => removeAccommodation(index)}
                  />
                </div>
              }
              key={index.toString()}
            >
              <Form name={`accommodation-form-${index}`} initialValues={accommodation}>
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
                  name={`checkInDate-${index}`}
                  label="Check-in Date"
                  rules={[{ required: true, message: "Please select the check-in date!" }]}
                >
                  <DatePicker
                    className="input"
                    style={{ width: '100%' }}
                    onChange={(value) => handleCheckInDateTimeChange(index, value)}
                  />
                </Form.Item>
                <Form.Item
                  name={`checkOutDate-${index}`}
                  label="Check-out Date"
                  rules={[{ required: true, message: "Please select the check-out date!" }]}
                >
                  <DatePicker
                    className="input"
                    style={{ width: '100%' }}
                    onChange={(value) => handleCheckOutDateTimeChange(index, value)}
                  />
                </Form.Item>
              </Form>
            </Panel>
          ))}
        </Collapse>
        <div className="button-wrapper">
          <Button type="dashed" onClick={addAccommodation}>
            Add Accommodation
          </Button>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
        {isSaved && <div className="success-message">Accommodation details saved successfully!</div>}
      </div>
    </div>
  );
}

export default Accommodation;
