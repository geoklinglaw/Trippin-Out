// App.js
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import Preferences from './pages/Preferences';
import Explore from './components/Pref Page/Explore';

function App() {

  const saveUserDataHandler = (enteredUserData) => {
    const landingData = {
      ...enteredUserData,
      id: Math.random().toString()
    };
    console.log(landingData);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage onSaveUserData={saveUserDataHandler}/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/preferences" element={<Preferences />} />
      </Routes>
    </Router>
  );
}

export default App;