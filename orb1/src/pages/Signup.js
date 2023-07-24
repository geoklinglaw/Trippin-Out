import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button, Alert } from "antd";
import "./Signup.css";
// import HelicopterAnimation from "../components/Helicopter";
import logo from "../images/logo.png";

import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { db, auth } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";



const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Create a new user with email and password
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

       // Send email verification
       await sendEmailVerification(user);

      // Store user details in Cloud Firestore
      await setDoc(doc(collection(db, "users"), user.uid), {
        email: user.email,
        username: username,
        // Add any other desired user details here
      });

      localStorage.setItem("username", username);

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setUsername("");
      setError(null);

      // Handle the signup response if needed
      console.log(user);
      navigate("/login");
    } catch (err) {
      // If there was an error, update the error state
      setError(err.message);
    }
  };

  return (
    
    <div className="Signup" >
      
      <div className="Signup-logo">
        <img src={logo} alt="Logo" className="Signup-logo-image" />
      </div>
      
      <Card className="Signup-card">
        {error && <Alert type="error" message={error} />}
        <h2>Register here!</h2>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: 20 }}
          required
        />
        <Input.Password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: 20 }}
          required
        />
        <Input.Password
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ marginBottom: 20 }}
          required
        />
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: 20 }}
          required
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#5186CD", color: "white" }}
            onClick={handleSubmit}
          >
            Sign up
          </Button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
          <p>
            Already have an account?{" "}
            <Button type="link" onClick={() => navigate("/login")}>
              Log in
            </Button>
          </p>
        </div>
      </Card>
      {/* <HelicopterAnimation/> */}
    </div>
    
  );
};

export default SignUp;
