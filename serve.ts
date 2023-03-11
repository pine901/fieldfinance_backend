require("dotenv").config();
import express, { Express } from "express";
import cors from "cors";
import ConnectDatabase from "./src/config/database";
import config from "./src/config";
// External Modules
import API from "./src/apis";


// Get router
const router = express.Router();

const app: Express = express();
const port: Number = Number(process.env.HTTP_PORT || 5005);

app.use(
    cors({
        origin: "*",
        methods: ["POST", "GET"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Frontend Load
// app.use(express.static(__dirname + "/build"));
// app.get("/*", function (req: any, res: any) {
//     res.sendFile(__dirname + "/build/index.html", function (err: any) {
//         if (err) {
//             res.status(500).send(err);
//         }
//     });
// });

// import { initializeApp } from "firebase/app";
// var firebase = require('firebase')

// const firebaseConfig = {
//     apiKey: "AIzaSyCx0jZNysUiA8I4oUFBA4ryQ15qJU7OtlU",
//     authDomain: "finance-ddea7.firebaseapp.com",
//     projectId: "finance-ddea7",
//     storageBucket: "finance-ddea7.appspot.com",
//     messagingSenderId: "1064682076127",
//     appId: "1:1064682076127:web:6cfaa7b8ece2ba78a4b66a",
//     measurementId: "G-4FK6VV5P8P"
// };

// // Initialize Firebase

// firebase.initializeApp(firebaseConfig);

// let database = firebase.database()

// var userRef = firebase.database().ref("User");

// userRef.set({
//     John: {
//         number: 1,
//         age: 30
//     },

//     Amanda: {
//         number: 2,
//         age: 20
//     }
// });


ConnectDatabase(config.mongoURI);

// API Router
API(router);
app.use("/api", router);

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
