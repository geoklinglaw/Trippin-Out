import logo from './images/logo.png';
import './App.css';
import { Card, Space, Form, message, Button } from 'antd';
import React from 'react';
import DropdownButton from './components/DropdownButton';
import DateSelector from './components/DateSelector';
import NumberInput from './components/NumberInput';

function App() {
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
            title={<img src={logo} className="App-logo" alt="logo" />}
            size={35}
            style={{ border: '2px solid #d9d9d9', height: '24123', width: '1000', justifyContent: 'center' }}
          >
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
              label="Number of adults"
              rules={[
                { required: true, message: 'Please enter the number of adults!' },
                { type: 'number', min: 1, message: 'Number of adults must be at least 1!' },
              ]}
            >
              <NumberInput />
            </Form.Item>

            <Form.Item
              name="children"
              label="Number of children"
              rules={[
                { required: true, message: 'Please enter the number of children!' },
                { type: 'number', min: 0, message: 'Number of children must be at least 0!' },
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

          </Card>
        </Space>
      </div>
    </Form>
  );
}

export default App;

// import logo from './images/logo.png';
// import './App.css';
// import { Card, Space, Form, message } from 'antd';
// import React from 'react';
// import DropdownButton from './components/DropdownButton';
// import DateSelector from './components/DateSelector';
// import NumberInput from './components/NumberInput';




// function App() {

//   const [form] = Form.useForm();
//     const onFinish = () => {
//       message.success('Submit success!');
//     };
//     const onFinishFailed = () => {
//       message.error('Submit failed!');
//     };
//     const onFill = () => {
//       form.setFieldsValue({
//         url: 'https://taobao.com/',
//       });
//     };

//   return (
    
//   <Form
//     form={form}
//     layout="vertical"
//     onFinish={onFinish}
//     onFinishFailed={onFinishFailed}
//     autoComplete="off"
//   >
    

//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//       <Space direction="vertical" size={100} >
//         <Card title={<img src={logo} className="App-logo" alt="logo" />} size= {35} style={{ border: '2px solid #d9d9d9', height: '24123', width: '1000', justifyContent: 'center' }}>
          



//           <p class = "Destination"> Destination </p> <DropdownButton />
//           <p class = "Date">
//             <span> Duration </span>
//             <DateSelector />
//           </p>

//           <p class = "Guests">No. of guests</p>
//           <span class = "Guests"> Adults <NumberInput /> </span>
//           <span class = "Guests"> Children <NumberInput /> </span>

//         </Card>
//       </Space>
//     </div>
//     </Form>
//   );
// }



// export default App;
