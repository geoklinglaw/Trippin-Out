import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import PastItineraries from "./pages/PastItineraries";
import Preferences from "./pages/Preferences";
import Itinerary from "./pages/itinerary";
import Explore from "./components/Pref_Page/Explore";
import SuggestedLocations from "./components/Pref_Page/SuggestedLocation";
import FoodOptions from "./components/Pref_Page/FoodOptions";
import { useEffect } from "react";


function App() {

  
  const saveUserDataHandler = (enteredUserData) => {
    const landingData = {
      ...enteredUserData,
      id: Math.random().toString(),
    };
    console.log(landingData);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LandingPage onSaveUserData={saveUserDataHandler} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pastitineraries" element={<PastItineraries />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/Pref_Page/SuggestedLocation" element={<SuggestedLocations />} />
        <Route path="/food-options/*" element={<FoodOptions />} />
        <Route path="/itinerary/*" element={<Itinerary />} />


  
      </Routes>
    </Router>
  );
}

export default App;
