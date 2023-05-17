import React from 'react';
import './LoginPopUp.css';
import { Tag } from 'antd';


function LoginPopUp(props) {
    return (props.trigger) ? (
        <div className='Popup'> 
            <div className='Popup-inner'>
                <Tag className='close-btn' onClick={() => props.setTrigger(false)}> x </Tag>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default LoginPopUp;