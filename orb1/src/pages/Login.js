// import React, { useState } from "react";

// function Login() {
//   const [value, setValue] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   async function fetchMovies() {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await fetch("https://swapi.py4e.com/api/planets/0/");
//       if (!response.ok) {
//         throw new Error("Something went wrong!");
//       }

//       const data = await response.json();

//         setValue(data.climate);
//         setIsLoading(false);
//     }
//     catch (error) {
//       setError(error.message);
//       setIsLoading(false);
//     }
//     setIsLoading(false);

//   }

//   return (
//     <div>
//       <button onClick={fetchMovies}>Fetch Movies</button>
//       <p> {!isLoading && <p>{value}</p>}
//       {isLoading && <p>Loading...</p>}
//       {!isLoading && error && <p>{error}</p>}
//       </p>
//     </div>
//   );
// }

// export default Login;

// import React, { useState } from "react";
// import Axios from "axios";
// import { Card, Space, Input, Button, Alert } from "antd";
// import LoginImage from "../images/login.png";
// import logo from "../images/logo.png";
// import "./Styles.css";
// import GoogleLogin from "./GoogleLogin"

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [loginStatus, setLoginStatus] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(email, password);
//     alert("You have logged in successfully!");

//     try {
//       // Make a request to the login endpoint
//       const response = await Axios.post("http://localhost:3029/login", {
//         email: email,
//         password: password,
//       });
//       console.log(response);

//       if (response.data.message) {
//         setLoginStatus("Wrong email or password!");
//       }

//       // If the login was successful, store the user data or token
//       //   localStorage.setItem("user", JSON.stringify(response.data));
//     } catch (err) {
//       // If there was an error, update the error state
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="container">
//       <img
//         style={{
//           width: "550px",
//         }}
//         src={LoginImage}
//         alt="login"
//       />
//       <form onSubmit={handleSubmit}>
//         <Space direction="vertical" size={16}>
//           <Card
//             style={{
//               width: 520,
//               height: 460,
//               padding: 20,
//               border: "2px solid #d9d9d9",
//             }}
//           >
//             {error && <p>{error}</p>}
//             {/* <img style= {{
//               width: '150px',
//               padding: '-20px',
//             }}
//             src= {logo} alt="logo"/> */}
//             <h2
//               style={{
//                 fontSize: "35px",
//                 display: "flex",
//                 justifyContent: "center",
//                 color: "#1C395B",
//               }}
//             >
//               {" "}
//               Welcome Back
//             </h2>

//             <label>
//               <Input
//                 placeholder="Email"
//                 style={{ fontSize: "18px", padding: 14 }}
//                 type="email"
//                 name="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </label>
//             <div className="Div"> </div>
//             <label className="Label">
//               <Input
//                 placeholder="Password"
//                 style={{ fontSize: "17px", padding: 14 }}
//                 type="password"
//                 name="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </label>
//             <div className="Div"> </div>
//             <div className="Div"> </div>

//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Button
//                 style={{
//                   fontSize: "18px",
//                   backgroundColor: "#5186CD",
//                   color: "white",
//                   padding: "0px 60px",
//                   height: "40px",
//                 }}
//                 type="primary submit"
//                 onClick={handleSubmit}
//               >
//                 {" "}
//                 Login
//               </Button>
//             </div>
//             <div className="Div"> </div>
//             <label style={{ color: "red" }}> {loginStatus} </label>
//             <GoogleLogin />
//           </Card>
//         </Space>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import Axios from "axios";
import { Card, Input, Button } from "antd";
import LoginImage from "../images/login.png";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loginStatus, setLoginStatus] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    alert("You have logged in successfully!");

    try {
      // Make a request to the login endpoint
      const response = await Axios.post("http://localhost:3029/login", {
        email: email,
        password: password,
      });
      console.log(response);

      if (response.data.message) {
        setLoginStatus("Wrong email or password!");
      }

      // If the login was successful, store the user data or token
      //   localStorage.setItem("user", JSON.stringify(response.data));
    } catch (err) {
      // If there was an error, update the error state
      setError(err.message);
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
