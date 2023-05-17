import React from "react";
import { Steps, Layout, Menu, theme  } from 'antd';
import Sidebar from "../components/Sidebar";
import two from '../images/2.png';


const description = 'This is a description.';
const App = () => (
    <>
    <Sidebar/>
    <div style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '70px',
        marginLeft: '450px',
    }}> 
        <img style={{width: '40px', height: '40px'}} src = {two}/>
        <h1 style={{marginLeft: '15px', fontSize: '40px', color: '#1C395B'}}> Preferences </h1>
    </div>
    </>
);
export default App;


