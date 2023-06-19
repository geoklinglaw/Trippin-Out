import axios from 'axios';
import {Client} from "@googlemaps/google-maps-services-js";
const {Client} = require("@googlemaps/google-maps-services-js");

const client = new Client({});

client
  .elevation({
    params: {
      locations: [{ lat: 45, lng: -110 }],
      key: "asdf",
    },
    timeout: 1000, // milliseconds
  })
  .then((r) => {
    console.log(r.data.results[0].elevation);
  })
  .catch((e) => {
    console.log(e.response.data.error_message);
  });


const axios = require('axios');
const fs = require('fs');

// Load locations from a JSON file
const locations = require('./locations.json');

// Function to fetch distance matrix
async function fetchDistanceMatrix(origins, destinations) {
  var originsParameter = origins.join('|');
  var destinationsParameter = destinations.join('|');

  var config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originsParameter}&destinations=${destinationsParameter}&units=imperial&key=AIzaSyBcWBdZDoCbrwwzekb964YE65Y-Yp3i044`,
    headers: { },
  };

  return axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Prepare an empty object to hold results
const distances = {};

// Function to calculate distances between each pair of locations
async function calculateDistances() {
  for (let i = 0; i < locations.length - 1; i++) {
    const origin = locations[i];
    const destination = locations[i + 1];

    const result = await fetchDistanceMatrix([origin], [destination]);
    const distance = result.rows[0].elements[0].distance.text;
    const time = result.rows[0].elements[0].duration.text;

    distances[`${origin} to ${destination}`] = {
      distance,
      time,
    };
  }

  // Save results to a new JSON file
  fs.writeFile('./distances.json', JSON.stringify(distances, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
    }
  });
}

calculateDistances();
