import React from "react";
import "./PastItineraries.css";
import { Button, Alert } from "antd";
import { useNavigate } from "react-router-dom";

const PastItinerary = () => {
  // Assuming you have a variable to store the past itineraries
  const pastItineraries = [];
  const navigate = useNavigate();
  return (
    <div className="past-itinerary-container">
      {pastItineraries.length === 0 ? (
        <div className="empty-message">
          <p>No past itineraries?</p>
          <p>Create an itinerary<Button className="create-button" type="link" onClick={() => navigate("/preferences")}>
              here
            </Button>today!</p>
        </div>
      ) : (
        // Render the past itineraries here
        <div>
          {/* ... */}
        </div>
      )}
    </div>
  );
};

export default PastItinerary;
