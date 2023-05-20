// LandingPage.js
import { Card, Space, Form, message, Button } from "antd";
import React from "react";
import Header from "../components/Header.js";
import DropdownButton from "../components/DropdownButton";
import DateSelector from "../components/DateSelector";
import NumberInput from "../components/NumberInput";
import "./LandingPage.css";
import LoginPopUp from "../components/LoginPopUp";
import { useState, useEffect } from "react";

function LandingPage(props) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Submit success!");
    const landingData = {
      destination: values.destination,
      duration: values.duration,
      guests: values.guests,
    };
    props.onSaveUserData(landingData);
    setButtonPopup(true);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Submit failed!");
  };

  const [destination, setDestination] = useState("");
  const destinationChangeHandler = (e) => {
    setDestination(e.key);
    console.log(e.key);
  };

  const [duration, setDuration] = useState("");
  const dateChangeHandler = (value, dateString) => {
    setDuration(dateString);
    console.log(dateString);
  };

  const [guests, setGuests] = useState("");
  const peopleChangeHandler = (e) => {
    setGuests(e.key);
    console.log(e.key);
  };

  const [buttonPopup, setButtonPopup] = useState(false);

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
                {" "}
                We've Got Your Journey Covered &#128526;{" "}
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
                  onChange={peopleChangeHandler}
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
                    <LoginPopUp
                      trigger={buttonPopup}
                      setTrigger={setButtonPopup}
                    >
                      <h1> Login Popup </h1>
                    </LoginPopUp>
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
