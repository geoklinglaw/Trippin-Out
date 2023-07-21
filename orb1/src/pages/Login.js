

import React, { useState } from "react";
import { Card, Input, Button } from "antd";
import LoginImage from "../images/login.png";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import useAuthStore from "./authStore";
import { doc, setDoc } from "firebase/firestore"; 
import { auth, firestore } from "../firebase";


const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState(null);
  // const [loginStatus, setLoginStatus] = useState("");
  const store = useAuthStore();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const auth = getAuth();
    try {
      const {email, password} = store;
      // Sign in existing user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      store.setLoginStatus("you have successfully login");
      
      console.log(user);
      navigate('/')
    } catch (error) {
      console.error("Error signing in with password and email", error);
      store.setError(error.message);
    }
  };
  

 

  return (
    <div className="container">
      <img className="login-image" src={LoginImage} alt="login" />
      <form onSubmit={handleSubmit}>
        <Card className="form-container">
          {store.error && <p className="error-label">{store.error}</p>}
          {/* <img className="logo-image" src={logo} alt="logo"/> */}
          <h2 className="login-title">Welcome Back</h2>

          <label>
            <Input
              className="form-input"
              placeholder="Email"
              type="email"
              name="email"
              value={store.email}
              onChange={(e) => store.setEmail(e.target.value)}
              required
            />
          </label>
          <label className="div-spacer"></label>
          <label className="Label">
            <Input
              className="form-input"
              placeholder="Password"
              type="password"
              name="password"
              value={store.password}
              onChange={(e) => store.setPassword(e.target.value)}
              required
            />
          </label>
          <label className="div-spacer"></label>
          <label className="div-spacer"></label>

          <div className="form-buttons">
            <Button
              className="login-button"
              type="primary submit"
              onClick={handleSubmit}
            >
              Login
            </Button>
           
          
          </div>
          <label className="login-status">{store.loginStatus}</label>
        </Card>
      </form>
    </div>
  );
};

export default Login;
