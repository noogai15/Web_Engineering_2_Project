var express = require("express");
var router = express.Router();

var authenticationService = require("./AuthenticationService");

router.post("/login", function (req, res, next) {
  console.log("CREATING SESSION TOKEN");

  authenticationService.createSessionToken(
    req.headers,
    function (err, token, user) {
      if (token) {
        res.header("Autherization", "Bearer: " + token);

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
    }
  );
});

module.exports = router;
