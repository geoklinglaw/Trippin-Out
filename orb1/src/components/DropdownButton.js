import React, { useState } from "react";
import { Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import countriesData from "../json/countries.json";

const DropdownButton = ({ onChange }) => {
  const [destination, setDestination] = useState("Select Destination");

  const handleMenuClick = (e) => {
    setDestination(e.key);
    if (onChange) {
      onChange(e);
    }
  };

  const displayedCountries = countriesData.countries;

  const menu = (
    <Menu
      onClick={handleMenuClick}
      style={{ maxHeight: 300, overflow: "auto" }}
    >
      {displayedCountries.map((country) => (
        <Menu.Item key={country.name}>{country.name}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button size="large">
        {destination} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default DropdownButton;

// import React from 'react';
// import { Button, Dropdown, Tooltip, message } from 'antd';
// import { DownOutlined, UserOutlined } from '@ant-design/icons';
// import { Space } from 'antd';
// import { Menu } from 'antd';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// const handleButtonClick = (e) => {
//     message.info('Click on left button.');
//     console.log('click left button', e);
//   };
//   const handleMenuClick = (e) => {
//     message.info('Click on menu item.');
//     console.log('click', e);
//   };
//   const items = [
//     {
//       label: '1st menu item',
//       key: '1',
//       icon: <UserOutlined />,
//     },
//     {
//       label: '2nd menu item',
//       key: '2',
//       icon: <UserOutlined />,
//     },
//     {
//       label: '3rd menu item',
//       key: '3',
//       icon: <UserOutlined />,
//       danger: true,
//     },
//     {
//       label: '4rd menu item',
//       key: '4',
//       icon: <UserOutlined />,
//       danger: true,
//       disabled: true,
//     },
//   ];

//   const menuProps = {
//     items,
//     onClick: handleMenuClick,
//   };

//   const DropdownButton = () => (
//     <Space wrap>

//       <Dropdown menu={menuProps}>
//         <Button>
//           <Space>
//             Button
//             <DownOutlined />
//           </Space>
//         </Button>
//       </Dropdown>

//     </Space>
//   );

// export default DropdownButton;
