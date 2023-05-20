import React, { useState } from "react";
import Axios from "axios";
import { Card, Space } from "antd";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to the login endpoint
      const response = await Axios.post("http://localhost:3029/signup", {
        email: email,
        password: password,
      }).then((response) => {
        console.log(response);
      });

      // If the login was successful, store the user data or token
      //   localStorage.setItem("user", JSON.stringify(response.data));
    } catch (err) {
      // If there was an error, update the error state
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Space direction="vertical" size={16}>
        <Card style={{ width: 500, height: 300, justifyContent: "center" }}>
          {error && <p>{error}</p>}
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button onClick={handleSubmit} type="submit">
            Sign up
          </button>
        </Card>
      </Space>
    </form>
  );
};

export default SignUp;
