import React from 'react';
import { Button, Space } from 'antd';
import {Routes, Route, NavLink, useNavigate} from 'react-router-dom'
import logo from '../images/logo.png';
import './Header.css';
import SignUp from '../pages/Signup';
import Login from '../pages/Login';



const Header = () =>{
    const navigate = useNavigate();

    const navigateToSignUp = () => {
        navigate('/signup');
    };

    const navigateToLogin = () => {
        navigate('/login');
    };

    return(
        <nav>
            <div className='div-header'>
                <div className='div-svg' onClick={() => navigate('/')}>
                    <img src={logo} alt='logo' className='logo'/>
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <Button onClick={navigateToLogin}>Login</Button>
                    <Button onClick={navigateToSignUp}>Create Account</Button>
                    <Routes>
                        <Route path="orb1/src/pages/Login.js" element={<Login />} />
                        <Route path="orb1/src/pages/Signup.js" element={<SignUp />} />
                    </Routes>                   
                </div>
            </div>
        </nav>
    )
}

export default Header;
