import React from "react";
import './Sidebar.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import AddHomeIcon from '@mui/icons-material/AddHome';
import BallotIcon from '@mui/icons-material/Ballot';
import MapIcon from '@mui/icons-material/Map';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Link } from 'react-router-dom';
import { Steps, Layout, Menu, theme, Divider  } from 'antd';
import { useState } from 'react';
import img from '../images/Asset 1.png';

const { Step } = Steps;




    

function Sidebar({setHeader}) {
    const [current, setCurrent] = useState(0);
    const arr = ["Explore", "Accomodation","Preferences",  "Locations", "Food Options"]
    const onChange = (value) => {
      console.log('onChange:', value);
      setHeader(value)
      setCurrent(value);
    };
    const description = 'This is a description.';

    return (
        <>
        {/* <div className='sidebar-container'> 
            <ul>
                {SidebarData.map((item, key) => {
                    return (
                        <Link to={item.link} key={key}>
                            <li>
                                <div>{item.icon}</div> {" "}
                                <div>{item.title}</div>
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </div> */}
        <div className='sidebar-container'>
            <div className="sidebar-user">
                <img src={img} alt='logo' className='sidebar-user img'/>
                <span className="username">Law Geok Ling</span>
            </div>
            <div className='sidebar-content'>
            <Steps
                className="sidebar-list"
                current={current}
                onChange={onChange}
                direction="vertical"
            >
                <Step title="Explore"/>
                <Step title="Accomodation" />
                <Step title="Preferences" />
                <Step title="Locations" />
                <Step title="Food Options" />
            </Steps>

            </div>
        </div>
      </>
    );
}

export default Sidebar;


// const SidebarData = [
//     {
//         title: 'Explore',
//         link: '../pages/LandingPage.js',
//         // icon: <TravelExploreIcon/>,
//     },
//     {
//         title: 'Accomodation',
//         // icon: <AddHomeIcon/>,
//         link: '../pages/LandingPage.js',
//     },
//     {
//         title: 'Preferences',
//         // icon: <BallotIcon/>,
//         link: '../pages/Preferences.js',
//     },
//     {
//         title: 'Locations',
//         // icon: <MapIcon/>,
//         link: '../pages/LandingPage.js',
//     },
//     {
//         title: 'Food Options',
//         // icon: <FastfoodIcon/>,
//         link: '../pages/LandingPage.js',
//     },
// ];