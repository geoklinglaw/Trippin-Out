import React, { useState } from "react";
import { Form, Input, Button, Collapse } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import DateTimePicker from "../../components/DateTimePicker";
import { firebase } from "../../pages/firebase";
import "./Accommodation.css";
import {firestore} from "../.././pages/firebase";
const { Panel } = Collapse;
console.log(firestore);

function Accommodation({
  onHotelNameChange,
  onLocationChange,
  onCheckInDateTimeChange,
  onCheckOutDateTimeChange,
}) {
  const [checkInDate, setCheckInDate] = useState(null);
  const [accommodations, setAccommodations] = useState([
    {
      hotelName: "",
      location: "",
      checkInDateTime: null,
      checkOutDateTime: null,
    },
  ]);
  const [expandedKey, setExpandedKey] = useState("0");

  const handleCheckInDateTimeChange = (value) => {
    setCheckInDate(value);
    onCheckInDateTimeChange(value);
  };

  const addAccommodation = () => {
    const newAccommodation = {
      hotelName: "",
      location: "",
      checkInDateTime: null,
      checkOutDateTime: null,
    };
    setAccommodations([...accommodations, newAccommodation]);
    setExpandedKey(accommodations.length.toString());
  };

  const removeAccommodation = (index) => {
    const updatedAccommodations = [...accommodations];
    updatedAccommodations.splice(index, 1);
    setAccommodations(updatedAccommodations);
  };

  const handleSubmit = async () => {
    try {
      const db = firebase.firestore();
      // Store accommodations in Firestore
      accommodations.forEach(async (accommodation) => {
        await db.collection("accommodations").add(accommodation);
      });
      console.log("Accommodations stored in Firestore");
    } catch (error) {
      console.error("Error storing accommodations:", error);
    }
  };

  return (
    <div className="container">
      <Collapse activeKey={expandedKey} onChange={setExpandedKey}>
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
            forceRender={true}
          >
            <div className="form-wrapper">
              <Form.Item
                name={`hotelName-${index}`}
                label="Hotel Name"
                rules={[{ required: true, message: "Please enter the hotel name!" }]}
              >
                <Input
                  placeholder="Hotel Name"
                  className="input"
                  onChange={onHotelNameChange}
                  value={accommodation.hotelName}
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
                  onChange={onLocationChange}
                  value={accommodation.location}
                />
              </Form.Item>
              <Form.Item
                name={`checkInDateTime-${index}`}
                label="Check-in Date"
                rules={[
                  { required: true, message: "Please select the check-in date and time!" },
                ]}
              >
                <DateTimePicker
                  placeholder="Select Check-in Date"
                  className="input-coci"
                  onChange={handleCheckInDateTimeChange}
                  pickerType="checkin"
                  value={accommodation.checkInDateTime}
                />
              </Form.Item>
              <Form.Item
                name={`checkOutDateTime-${index}`}
                label="Check-out Date"
                rules={[
                  { required: true, message: "Please select the check-out date and time!" },
                ]}
              >
                <DateTimePicker
                  placeholder="Select Check-out Date"
                  className="input-coci"
                  checkInDate={checkInDate}
                  onChange={onCheckOutDateTimeChange}
                  pickerType="checkout"
                  value={accommodation.checkOutDateTime}
                />
              </Form.Item>
            </div>
          </Panel>
        ))}
      </Collapse>
      <div className="add-button-wrapper">
        <Button onClick={addAccommodation}>+ Add</Button>
      </div>
      <div className="submit-button-wrapper">
        <Button type="primary" onClick={handleSubmit} className="submit-button">
          Submit Accommodations
        </Button>
      </div>
    </div>
  );
}

export default Accommodation;
