import React from 'react';
import { Button, Space } from 'antd';
import {NavLink, useNavigate} from 'react-router-dom'
import logo from '../images/logo.png';
import './Header.css';

const Header = ({isLogged}) =>{
    const navigate = useNavigate();

    const handleClick=() =>{
        navigate('/');
        isLogged(false)
    }

    return(
        <nav>
            <div className='div-header'>
                <div className='div-svg' onClick={() => navigate('/')}>
                    <img src={logo} alt='logo' className='logo'/>
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <Button onClick={handleClick}>Login</Button>
                    <Button onClick={handleClick}>Create Account</Button>
                </div>
            </div>
        </nav>
    )
}

export default Header;
