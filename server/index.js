
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();

const PORT = 5123;

app.use(cors());

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

app.get('/tempLocations1', (req, res) => {
    res.sendFile(__dirname + '/tempLocations1.json');
});


// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC_SyZezplGnJqMLfuYCjt69y_wiYZXmsU",
  authDomain: "trippin-out-4b976.firebaseapp.com",
  databaseURL: "https://trippin-out-4b976-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "trippin-out-4b976",
  storageBucket: "trippin-out-4b976.appspot.com",
  messagingSenderId: "647184431594",
  appId: "1:647184431594:web:d69a768cadd176075c9a93",
};

// Initialize Firebase Admin SDK
var serviceAccount = require("./trippin-out-4b976-firebase-adminsdk-tikce-71353c614d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://trippin-out-4b976-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();
module.exports = { admin, db };


// app2.post('/submitPreferences', (req, res) => {
//   try {
//     const data = req.body;

//     // Write data to rankingtest.json file
//     fs.readFile('rankingtest.json', 'utf8', (err, fileData) => {
//       if (err) {
//         console.error('Error reading rankingtest.json:', err);
//         res.status(500).send('Error storing preferences');
//         return;
//       }

//       let preferences = [];
//       try {
//         preferences = JSON.parse(fileData);
//       } catch (parseError) {
//         console.error('Error parsing rankingtest.json:', parseError);
//         res.status(500).send('Error storing preferences');
//         return;
//       }

//       preferences.push(data);

//       const preferencesJSON = JSON.stringify(preferences);

//       fs.writeFile('rankingtest.json', preferencesJSON, 'utf8', (writeErr) => {
//         if (writeErr) {
//           console.error('Error writing rankingtest.json:', writeErr);
//           res.status(500).send('Error storing preferences');
//           return;
//         }
//         console.log('Preferences stored in rankingtest.json');
//         res.status(200).send('Preferences stored successfully');
//       });
//     });
//   } catch (error) {
//     console.error('An error occurred during submission:', error);
//     res.status(500).send('Error storing preferences');
//   }
// });

async function readAndWriteData() {
  try {
    // Write data
    // const docRef = db.collection('users').doc('alovelace');
    // await docRef.set({
    //   first: 'Ada',
    //   last: 'Lovelace',
    //   born: 1815
    // });

    // Read data
    const snapshot = await db.collection('users').get();
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  } catch (error) {
    console.error('Error reading or writing data:', error);
  }
}

// --------- UNIT TEST ---------
// test for firebase connection
// readAndWriteData();


