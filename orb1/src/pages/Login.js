

import React, { useState } from "react";
import Axios from "axios";
import { Card, Input, Button } from "antd";
import LoginImage from "../images/login.png";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { doc, setDoc } from "firebase/firestore"; 
import { auth, firestore } from "./firebase";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loginStatus, setLoginStatus] = useState("");

  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(email, password);
  //   alert("You have logged in successfully!");

  //   try {
  //     // Make a request to the login endpoint
  //     const response = await Axios.post("http://localhost:3029/login", {
  //       email: email,
  //       password: password,
  //     });
  //     console.log(response);

  //     if (response.data.message) {
  //       setLoginStatus("Wrong email or password!");
  //     }

  //     // If the login was successful, store the user data or token
  //     //   localStorage.setItem("user", JSON.stringify(response.data));
  //   } catch (err) {
  //     // If there was an error, update the error state
  //     setError(err.message);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const auth = getAuth();
    try {
      // Sign in existing user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Save user to Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        email: user.email,
        // any other details you want to save, for example:
        // name: user.displayName,
        // photoURL: user.photoURL,
      });
  
      alert("You have logged in successfully!");
      console.log(user);
    } catch (error) {
      console.error("Error signing in with password and email", error);
      setError(error.message);
    }
  };
  

  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // Perform any necessary actions after successful Google login
        console.log("Google login successful", result.user);
        navigate("/GoogleLogin");
      })
      .catch((error) => {
        // Handle any errors that occur during Google login
        console.error("Google login error", error);
      });
  };

  return (
    <div className="container">
      <img className="login-image" src={LoginImage} alt="login" />
      <form onSubmit={handleSubmit}>
        <Card className="form-container">
          {error && <p className="error-label">{error}</p>}
          {/* <img className="logo-image" src={logo} alt="logo"/> */}
          <h2 className="login-title">Welcome Back</h2>

          <label>
            <Input
              className="form-input"
              placeholder="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <div className="line"></div>
            <Button className="google-button" onClick={handleGoogleLogin}>
              <Link to="/google-login">Login with Google</Link>
            </Button>
          </div>
          <label className="login-status">{loginStatus}</label>
        </Card>
      </form>
    </div>
  );
};

export default Login;
