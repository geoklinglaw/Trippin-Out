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

const app = express();
const PORT = 7000;
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

// Call the async function to read and write data
readAndWriteData();


