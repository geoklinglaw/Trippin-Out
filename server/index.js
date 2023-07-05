// const express = require('express');
// const mysql = require('mysql2');
// const cors = require("cors");

// const app = express();

// app.use(express.json());
// app.use(cors()); 

// const db = mysql.createConnection({
//     user: "root",
//     host: "localhost",
//     password: "Hello8910@",
//     database: "Login"
// });

// db.connect(function(err) {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }

//     console.log('connected as id ' + db.threadId);
// });

// app.get("/signup", (req, res) => {
//     res.send("Signup page");
// });

// app.post("/signup", (req, res) => { // backend for signup page
//     console.log(req.body); 
//     const email = req.body.email;
//     const password = req.body.password;


//     db.query(
//         "INSERT INTO LoginSystem (email, password) VALUES (?,?)",
//         [email, password],
//         (err, result) => {
//             if (err) {
//                 console.error(err);
//                 res.status(500).send(err);
//                 return;
//             }
            
//             res.send(result);
//         }
//     );
// });

// app.get("/login", (req, res) => {
//     res.send("Login page");
// });

// app.post("/login", (req, res) => { // backend for login page
//     console.log(req.body); 
//     const email = req.body.email;
//     const password = req.body.password;


//     db.query(
//         "SELECT * FROM LoginSystem WHERE email = ? AND password = ?",
//         [email, password],
//         (err, result) => {
//             if (err) {
//                 console.error(err);
//                 res.status(500).send(err);
//                 return;
//             }
//             if (result.length > 0) {
//                 res.send(result);
//             } else {
//                 res.send({ message: "Wrong email/password combination!" });
//             }
            
//         }
//     );
// });
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = 5123;
// const PORT = 7000;
app.use(cors());


app.get('/', (req, res) => {
  res.json({message: 'Server is running'});
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


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
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


