const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
var protobuf = require("protobufjs");
const path = require("path");
const axios = require("axios");
const app = express();
app.use(express.json());
app.use(cors());
const { exec } = require('node:child_process');
const locationsAPI = require("./routes/locationsAPI");
const foodOptionsAPI = require("./routes/foodAPI");
const distanceAPI = require("./routes/distanceAPI");
// const genItinerary = require("./routes/tspAPI");

const { spawn } = require('child_process');

const PORT = 5123;


// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC_SyZezplGnJqMLfuYCjt69y_wiYZXmsU",
  authDomain: "trippin-out-4b976.firebaseapp.com",
  databaseURL:
    "https://trippin-out-4b976-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "trippin-out-4b976",
  storageBucket: "trippin-out-4b976.appspot.com",
  messagingSenderId: "647184431594",
  appId: "1:647184431594:web:d69a768cadd176075c9a93",
};

// Initialize Firebase Admin SDK
var serviceAccount = require("./trippin-out-4b976-firebase-adminsdk-tikce-c9df623474.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://trippin-out-4b976-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();
module.exports = { db };

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.get('/files/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, filename);
  res.sendFile(filepath, (err) => {
      if (err) {
          console.error('Error sending file:', err);
          res.status(404).json({error: 'File not found'});
      }
  });
});



app.post("/Preferences", async (req, res) => {
  const preferences = req.body.preferences;
  const accommodation = req.body.accommodation;
  const duration = req.body.duration;
  console.log(accommodation)

  const generateLocations = await locationsAPI.processPreferences(preferences, accommodation, duration);
  res.json({
    message: "Preferences received successfully",
    data: generateLocations,
  });
});

app.get("/food-options", async (req, res) => {
  const dest = req.query.destination;
  console.log(dest);
  const generateFood = await foodOptionsAPI.processFood(dest);
  res.json({
    message: "Food options received successfully",
    data: generateFood,
  });
});

app.get("/distanceMatrix", async (req, res) => {
  const accoms = req.query.accommodation;
  const locations = req.query.locations;

  const distanceMatrix = await distanceAPI.getDistanceMatrix(accoms, locations);
  res.json({
    message: "Distance matrix received successfully",
    data: distanceMatrix,
  });
});


app.post("/itinerary", async (req, res) => {
  // const locations = req.body.locations;
  // const accoms = req.body.accommodation;
  const distMat = req.body.distMat;
  const days = req.body.days;

  const python = spawn('/opt/homebrew/bin/python3', ['routes/tspAPI.py', '--distMat', JSON.stringify(distMat), '--days', days]);


  let pythonData = '';
  python.stdout.on('data', (data) => {
    pythonData += data;
    console.log(`stdout: ${data}`);
  });

  python.on('error', (error) => {
    console.error(`Error spawning Python script: ${error}`);
  });

  python.on('close', (code) => {
      console.log(`Python script exited with code ${code}`);
      if (code !== 0) {
          return res.status(500).json({ error: 'Error in Python script' });
      }
      console.log("final output")
      console.log(pythonData)
      console.log(JSON.parse(pythonData))
      res.json({ data: JSON.parse(pythonData) });
  });
});





app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
