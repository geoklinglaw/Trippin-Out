import { Card, Space, Form, message, Button, Modal } from "antd";
import React, { useState } from "react";
import Header from "../components/Header.js";
import DropdownButton from "../components/DropdownButton";
import DateSelector from "../components/DateSelector";
import NumberInput from "../components/NumberInput";
import "./LandingPage.css";
import { db, auth } from "../firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
// import { useAuthStore } from "./authStore";
import  useStore  from './authStore';
import Wave from "react-wavify";
import { useNavigate } from "react-router-dom";
import moment from "moment";


function LandingPage() {
  const [form] = Form.useForm();
  const [error, setError] = useState(null);
  const { email } = useStore();
  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState("");
  // const [accommodations, setAccommodations] = useState([
  //   {
  //     hotelName: "",
  //     location: "",
  //     checkInDateTime: null,
  //     checkOutDateTime: null,
  //     latLong: "",
  //   },
  // ]);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const setTripId = useStore((state) => state.setTripId);

  const peopleChangeHandler = (value) => {
    setGuests(value);
  };

  

  const onFinish = async (values) => {
    // Check if the user is authenticated
    const user = auth.currentUser;
    if (!user) {
      showModal(); // If not authenticated, show the modal
      return;
    }
  
    try {
      const userId = auth.currentUser.uid;
      const tripId = Math.random().toString();
      setTripId(tripId);
      console.log(userId, tripId);
   
      const duration = values.duration[1].diff(values.duration[0], "days");
      
  
      // Check if the duration is greater than 3 days
      if (duration > 3) {
        message.error("Duration cannot exceed 3 days!");
        return;
      }
  
      await setDoc(doc(db, "users", userId, "trips", tripId), {
        email: email,
        destination: destination,
      
        duration: parseInt(duration),
        guests: parseInt(values.guests),
      });
  
      message.success("Submit success!");
      form.resetFields();
  
      // Save the accommodation details using the saveAccommodationDetails function
      // await saveAccommodationDetails(userId, tripId, accommodations);
  
      // setAccommodation(accommodations); // Update the state in the store with accommodation details
  
      navigate(`/preferences?tripId=${tripId}`, {
        state: { tripId },
        duration: parseInt(duration),
      });
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
            flexDirection: "column",
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
                We've Got Your Journey Covered 😆
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
                <Form.Item style={{ textAlign: "center" }}>
                  <Space>
                    <Button
                    className="Button"
                      style={{ backgroundColor: "#5186CD", color: "white" }}
                      type="primary"
                      htmlType="submit"
                      onClick={onFinish}
                    >
                      Submit
                    </Button>
                  </Space>
                </Form.Item>
              </div>
            </Card>
          </Space>
        </div>
        <div style={{ position: "relative" }}>
          <Wave
            fill="#769ABE"
            paused={false}
            options={{
              amplitude: 100,
              speed: 0.15,
              points: 3,
            }}
          />
        </div>
      </Form>

      <Modal
        title="Sign up/Login Required"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Please sign up or log in to continue!</p>
      </Modal>
    </>
  );
}

export default LandingPage;