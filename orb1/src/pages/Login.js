import React, { useState } from "react";

function Login() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMovies() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.py4e.com/api/planets/0/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      
      const data = await response.json();

        setValue(data.climate);
        setIsLoading(false);
    }
    catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
    setIsLoading(false);

  }

  return (
    <div>
      <button onClick={fetchMovies}>Fetch Movies</button>
      <p> {!isLoading && <p>{value}</p>} 
      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p>{error}</p>}
      </p>
    </div>
  );
}

export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import { Card, Space } from 'antd';


// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Make a request to the login endpoint
//       const response = await axios.post("http://localhost:3001/login", {
//         email,
//         password,
//       });

//       // If the login was successful, store the user data or token
//       localStorage.setItem("user", JSON.stringify(response.data));
//     } catch (err) {
//       // If there was an error, update the error state
//       setError(err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Space direction="vertical" size={16}>
//         <Card 
//             style={{ width: 500,
//                     height: 300,
//                     justifyContent: 'center'}}>
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
//           <button type="submit">Login</button>
//         </Card>
//       </Space>
//     </form>
//   );
// };

// export default Login;
