// App.js
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;