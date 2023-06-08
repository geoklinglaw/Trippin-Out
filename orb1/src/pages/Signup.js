// import React, { useState } from "react";
// import Axios from "axios";
// import { Card, Space } from "antd";

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Make a request to the login endpoint
//       const response = await Axios.post("http://localhost:3029/signup", {
//         email: email,
//         password: password,
//       }).then((response) => {
//         console.log(response);
//       });

//       // If the login was successful, store the user data or token
//       //   localStorage.setItem("user", JSON.stringify(response.data));
//     } catch (err) {
//       // If there was an error, update the error state
//       setError(err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Space direction="vertical" size={16}>
//         <Card style={{ width: 500, height: 300, justifyContent: "center" }}>
//           {error && <p>{error}</p>}
//           <label>
//             Email:
//             <input
//               type="email"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </label>
//           <label>
//             Password:
//             <input
//               type="password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </label>
//           <button onClick={handleSubmit} type="submit">
//             Sign up
//           </button>
//         </Card>
//       </Space>
//     </form>
//   );
// };

// export default SignUp;


// import React, { useState } from "react";
// import "./Signup.css";
// import Axios from "axios";
// import { Card, Space, Input, Button, Alert } from "antd";

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Make a request to the signup endpoint
//       const response = await Axios.post("http://localhost:3029/signup", {
//         email: email,
//         password: password,
//       });

//       // If the signup was successful, handle the response
//       console.log(response);

//       // Clear the form fields after successful signup
//       setEmail("");
//       setPassword("");
//     } catch (err) {
//       // If there was an error, update the error state
//       setError(err.message);
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: "#DCD5DC",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//       }}
//     >
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           textAlign: "center",
//           marginTop: "10%",
//         }}
//       >
//         <h2
//           style={{
//             fontSize: "62px",
//             color: "#E8AA9B",
//             textShadow:
//               "2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -1px 1px 0px #000",
//           }}
//         >
//           Trippin out
//         </h2>
//       </div>
//       <Card
//         style={{
//           width: 500,
//           padding: 20,
//           backgroundColor: "transparent",
//           border: "1px solid #1A385A",
//         }}
//       >
//         {error && <Alert type="error" message={error} />}
//         <Input
//           placeholder="Email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={{ marginBottom: 20 }}
//           required
//         />
//         <Input.Password
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={{ marginBottom: 20 }}
//           required
//         />
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <Button
//             type="primary"
//             htmlType="submit"
//             style={{ backgroundColor: "#5186CD", color: "white" }}
//             onClick={handleSubmit}
//           >
//             Sign up
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default SignUp;


import React, { useState } from "react";
import Axios from "axios";
import { Card, Input, Button, Alert } from "antd";
import "./Signup.css";
import logo from "../images/logo.png";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Make a request to the signup endpoint
      const response = await Axios.post("http://localhost:3029/signup", {
        email: email,
        password: password,
      });

      // If the signup was successful, handle the response
      console.log(response);

      // Clear the form fields after successful signup
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError(null);
    } catch (err) {
      // If there was an error, update the error state
      setError(err.message);
    }
  };

  return (
    <div className="Signup">
      <div className="Signup-logo">
        <img src={logo} alt="Logo" className="Signup-logo-image" />
      </div>
      <div className="Signup-heading">
        <h2>Trippin out</h2>
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
          <p>Already have an account? <a href="/login">Log in</a></p>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
