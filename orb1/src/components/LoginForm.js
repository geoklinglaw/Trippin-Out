import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to the login endpoint
      const response = await axios.post("https://trippin-out-ten.vercel.app/login", {
        email,
        password,
      });

      // If the login was successful, store the user data or token
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (err) {
      // If there was an error, update the error state
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
