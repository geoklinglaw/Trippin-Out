const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const app = express();
app.use(express.json());
const locationsAPI = require("./routes/locationsAPI");
const foodOptionsAPI = require("./routes/foodAPI");
const distanceAPI = require("./distanceAPI");

const PORT = 5123;
app.use(cors());

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
var serviceAccount = require("./trippin-out-4b976-firebase-adminsdk-tikce-71353c614d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://trippin-out-4b976-default-rtdb.asia-southeast1.firebasedatabase.app",
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
  const generateLocations = await locationsAPI.processPreferences(preferences);
  res.json({
    message: "Preferences received successfully",
    data: generateLocations,
  });
});

app.get("/food-options", async (req, res) => {
  const dest = req.query.destination;
  // console.log(dest);
  const generateFood = await foodOptionsAPI.processFood(dest);
  res.json({
    message: "Food options received successfully",
    data: generateFood,
  });
});

app.get("/itinerary", async (req, res) => {
  const locations = req.query.locations;
  const food = req.query.food;
  const accoms = req.query.accoms;

  console.log(locations);
  console.log(food);
  // console.log(accoms);
  // const generateFood = await foodOptionsAPI.processFood(dest);
  // res.json({message: 'Food options received successfully', data: generateFood});
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
