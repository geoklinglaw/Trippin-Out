// LandingPage.js
import { Card, Space, Form, message, Button } from 'antd';
import React from 'react';
import Header from '../components/Header.js';
import DropdownButton from '../components/DropdownButton';
import DateSelector from '../components/DateSelector';
import NumberInput from '../components/NumberInput';
import './LandingPage.css';

function LandingPage() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
    message.success('Submit success!');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Submit failed!');
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Space direction="vertical" size={100}>
          <Card
            size={35}
            style={{ border: '2px solid #d9d9d9', height: '24123', width: '1000', justifyContent: 'center' }}
          >
            <h2 class = "Title"> We've Got Your Journey Covered &#128526; </h2>
            <div class='Card'>
              <Form.Item
                name="destination"
                label="Destination"
                rules={[{ required: true, message: 'Please select a destination!' }]}
              >
                <DropdownButton />
              </Form.Item>
              <Form.Item
                name="duration"
                label="Duration"
                rules={[{ required: true, message: 'Please select a duration!' }]}
              >
                <DateSelector />
              </Form.Item>
              <Form.Item
                name="adults"
                label="Number of Guests"
                rules={[
                  { required: true, message: 'Please enter the number of adults!' },
                  { type: 'number', min: 1, message: 'Number of adults must be at least 1!' },
                ]}
              >
                <NumberInput />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
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
