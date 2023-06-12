import React, { useState, useEffect } from 'react';
import { Segmented } from 'antd';
import './FoodOptions.css';
import Breakfast from './Meals/Breakfast';
import Lunch from './Meals/Lunch';
import Dinner from './Meals/Dinner';
import Dessert from './Meals/Dessert';

function FoodOptions() {
  const [restaurants, setRestaurants] = useState([]);
  const [value, setValue] = useState('breakfast');

  useEffect(() => {
    const fetchRestaurants = async (mealType) => {
      const url = 'https://yelpapiserg-osipchukv1.p.rapidapi.com/getBusinesses';
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': '08356776bfmshd283e4ab5b00be9p14eaf1jsn487adaa5949b',
          'X-RapidAPI-Host': 'YelpAPIserg-osipchukV1.p.rapidapi.com'
        },
        body: new URLSearchParams({
          text: mealType, // Using the mealType as search term
          accessToken: '<REQUIRED>' // Replace with the actual access token if required
        })
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setRestaurants(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurants(value);
  }, [value]);

  const handleOptionChange = newValue => {
    setValue(newValue);
  };

  const options = [
    { label: 'Breakfast', value: 'breakfast', component: <Breakfast restaurants={restaurants}/> },
    { label: 'Lunch', value: 'lunch', component: <Lunch restaurants={restaurants}/> },
    { label: 'Dinner', value: 'dinner', component: <Dinner restaurants={restaurants}/> },
    { label: 'Dessert', value: 'dessert', component: <Dessert restaurants={restaurants}/> },
  ];

  const selectedOption = options.find(option => option.value === value);

  return (
    <div>
      <h1>{value.charAt(0).toUpperCase() + value.slice(1)}</h1>
      <Segmented
        options={options.map(option => option.value)}
        value={value}
        onChange={handleOptionChange}
      />
      <div>
        {selectedOption?.component}
      </div>
    </div>
  );
}

export default FoodOptions;
