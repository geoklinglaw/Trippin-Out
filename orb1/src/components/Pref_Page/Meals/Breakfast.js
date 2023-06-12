import React from "react";

function Breakfast({ restaurants }) {
    // Note: Replace `name` and `restaurants` with actual property names returned from API.
    const breakfastRestaurants = restaurants.filter((restaurant) => restaurant.servesBreakfast);
  
    return (
      <div>
        <h1>Breakfast</h1>
        {breakfastRestaurants.map((restaurant) => (
          <div key={restaurant.id}>
            <h2>{restaurant.name}</h2>
            {/* Other restaurant information... */}
          </div>
        ))}
      </div>
    );
  }
  
  export default Breakfast;
  

