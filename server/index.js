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
const app = express();
const PORT = 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// // The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
// const {logger} = require("firebase-functions");
// const {onRequest} = require("firebase-functions/v2/https");
// const {onDocumentCreated} = require("firebase-functions/v2/firestore");

// // The Firebase Admin SDK to access Firestore.
// const {initializeApp} = require("firebase-admin/app");
// const {getFirestore} = require("firebase-admin/firestore");

// initializeApp();index.js

app.get('/locations', (req, res) => {
    res.sendFile(__dirname + '/locations.json');
});
