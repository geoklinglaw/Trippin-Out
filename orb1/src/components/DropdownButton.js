import React from 'react';
import { Button, Dropdown, message } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { Menu } from 'antd';
import { useState } from "react";
import countriesData from '/Users/apple/Desktop/NUS/Orbital/orbital1/orb1/src/json/countries.json';

const DropdownButton = () => {
  const [destination, setDestination] = useState("Select Destination");
  const handleMenuClick = (e) => {
    setDestination(e.key);
    console.log('click', e);
    
  };

  return (
    <Dropdown
      overlay={
        <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
          <Menu onClick={handleMenuClick}>
            {countriesData.countries.map((country) => (
              <Menu.Item key={country.name}>{country.name}</Menu.Item>
            ))}
          </Menu>
        </div>
      }
    >
      <Button>
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