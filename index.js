const express = require("express");
const app = express();
const db = require("mongoose");
const bcrypt = require("bcrypt");

const fs = require("fs");
const key = fs.readFileSync("certificates/key.pem");
const cert = fs.readFileSync("certificates/cert.pem");
const https = require("https");

const database = require("./database/db");
const usersRoutes = require("./endpoints/user/UserRoute");
const authenticationRouter = require("./endpoints/authentication/AuthenticationRoute");
const groupsRouter = require("./endpoints/group/GroupRoute");
const messagesRouter = require("./endpoints/message/MessageRoute");

app.use(express.json());

//Use the routes in the folders
app.use("/user", usersRoutes); // URL has to have with /user/
app.use("/authenticate", authenticationRouter); // URL has to have with /authenticate/
app.use("/group", groupsRouter);
app.use("/message", messagesRouter);

//Initalize the DB
database.initDB(function (err, db) {
  if (db) {
    console.log("Connected to DB");
  } else {
    console.log("Couldn't connect to DB");
  }
});

//Start server
//HTTPS as communication protocol
const server = https.createServer({ key: key, cert: cert }, app);

app.get("/", (req, res) => {
  res.send("This is an insecure server");
});

app.listen(8080, () => {
  console.log("Server started on Port 8080");
});
