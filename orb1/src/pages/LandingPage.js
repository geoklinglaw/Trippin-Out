
import { Card, Space, Form, message, Button } from "antd";
import React, { useState } from "react";
import Header from "../components/Header.js";
import DropdownButton from "../components/DropdownButton";
import DateSelector from "../components/DateSelector";
import NumberInput from "../components/NumberInput";
import "./LandingPage.css";
import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import useAuthStore from "./authStore";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import Accommodation from ".././components/Pref_Page/Accommodation"; // Import the Accommodation component



function LandingPage() {
  const [form] = Form.useForm();
  const [error, setError] = useState(null);
  const { email } = useAuthStore();
  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState("");
  const navigate = useNavigate();
  const [tripId, setTripId] = useState(""); // State for tripId
  const authStore = useAuthStore();

  const peopleChangeHandler = (value) => {
    setGuests(value);
  };

  const onFinish = async (values) => {
    try {

      const userId = auth.currentUser.uid;
      const tripId = Math.random().toString();
      authStore.setTripId(tripId); // Update the tripId in the authStore
      const tripRef = doc(db, "users", userId, "trips", tripId);

      const duration = moment(values.duration); // Convert to moment object
      const formattedDuration = duration.format("YYYY-MM-DD HH:mm"); // Format the duration
      
      await setDoc(tripRef, {
        email: email,
        destination: destination,
        duration: formattedDuration,
        guests: parseInt(values.guests),
      });

      message.success("Submit success!");
      form.resetFields();
      setTripId(tripId); // Set the generated tripId in state
      navigate("/preferences?tripId=" + tripId);


    } catch (error) {
      console.error("Error storing data:", error);
      setError("Submit failed!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setError("Submit failed!");
  };

  
  
const destinationChangeHandler = (e) => {
  setDestination(e.key); // Update destination state with the selected value
};


  const dateChangeHandler = (_, dateString) => {
    console.log(dateString);
  };

  
  return (
    <>
      <Header />
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <Space direction="vertical" size={100}>
            <Card
              size={35}
              style={{
                border: "2px solid #d9d9d9",
                height: "24123",
                width: "1000",
                justifyContent: "center",
              }}
            >
              <h2
                className="Title"
                style={{ textAlign: "center", marginTop: "50px" }}
              >
                We've Got Your Journey Covered &#128526;
              </h2>
              <div className="Card">
                <Form.Item
                  name="destination"
                  label="Destination"
                  rules={[
                    { required: true, message: "Please select a destination!" },
                  ]}
                >
                  <DropdownButton onChange={destinationChangeHandler} />
                </Form.Item>
                <Form.Item
                  name="duration"
                  label="Duration"
                  rules={[
                    { required: true, message: "Please select a duration!" },
                  ]}
                >
                  <DateSelector onChange={dateChangeHandler} />
                </Form.Item>
                <Form.Item
                  name="guests"
                  label="Number of Guests"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the number of guests!",
                    },
                    {
                      type: "number",
                      min: 1,
                      message: "Number of guests must be at least 1!",
                    },
                  ]}
                >
                  <NumberInput onChange={peopleChangeHandler} />
                </Form.Item>
                <Form.Item>
                  <Space>
                    <Button
                      style={{ backgroundColor: "#5186CD", color: "white" }}
                      type="primary"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  </Space>
                </Form.Item>
              </div>
            </Card>
          </Space>
        </div>
      </Form>
     
      
    </>
  );
}

export default LandingPage;