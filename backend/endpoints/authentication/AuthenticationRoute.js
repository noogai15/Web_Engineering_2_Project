var express = require("express");
var router = express.Router();
var userService = require("../user/UserService");

var jwt = require("jsonwebtoken");
var config = require("config");

var authenticationService = require("./AuthenticationService");

router.post("/login", function (req, res, next) {
  console.log("CREATING SESSION TOKEN");

  createSessionToken(req.headers, function (err, token, user) {
    if (token) {
      res.header("Authorization", "Bearer " + token);

      if (user) {
        const { id, userName, ...partialObject } = user;
        const subset = { id, userName };
        console.log(JSON.stringify(subset));
        res.send(subset);
      } else {
        console.log("Token was created but user was null. Error:  " + err);
        res.send("Token was created but user was null");
      }
    } else {
      console.log("Token has not been created, Error: " + err);
      res.send("Could not create Token");
    }
  });
});

//CREATE TOKEN
function createSessionToken(header, callback) {
  console.log("AuthenticationService: Create Token");

  if (!header) {
    console.log("Error: HEADER MISSING!");
    callback("No Header");
    return;
  }

  const base64Credentials = header.authorization.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [userID, password] = credentials.split(":");

  userService.findUserBy(userID, function (error, user) {
    if (user) {
      user.comparePassword(password, function (err, isMatch) {
        //Now check if password is correct
        if (err) {
          //If password is wrong
          console.log("Invalid password");
          callback(err, null);
        } else {
          //If password is correct
          if (isMatch) {
            console.log("Password is correct. Create Token!");
            //Making a Token
            var issuedAt = new Date().getTime();
            var expirationTime = config.get("session.timeout");
            var expiresAt = issuedAt + expirationTime * 1000;
            privateKey = config.get("session.tokenKey");
            let token = jwt.sign({ user: user.id }, privateKey, {
              expiresIn: expiresAt,
              algorithm: "HS256",
            });
            console.log("TOKEN CREATED: " + token);
            callback(null, token, user);
          } else {
            //If password is wrong 2
            console.log("Error: Incorrect Password " + password);
            callback(err, null);
          }
        }
      });
    } else {
      //If no user was found
      console.log("User Services: Did not find user for userID: " + userID);
      callback("User was not found", null);
    }
  });
}

module.exports = router;
