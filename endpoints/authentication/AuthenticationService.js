var userService = require("../user/UserService");
var jwt = require("jsonwebtoken");
var config = require("config");

//CREATE TOKEN
//props is header
function createSessionToken(props, callback) {
  console.log("AuthenticationService: Create Token");

  if (!props) {
    console.log("Error: HEADER MISSING!");
    callback("No Header");
    return;
  }

  const base64Credentials = props.authorization.split(" ")[1];
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

function isAuthenticated(req, res, next) {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== undefined) {
    const token = bearerHeader.split(" ")[1];
    const privateKey = config.get("session.tokenKey");
    jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
      if (err) {
        res.status(500).json({ error: "Not authorized" });
        return;
      }
      return next();
    });
  } else {
    res.sendStatus(500).json({ error: "Not authorized" });
    return;
  }
}

module.exports = {
  createSessionToken,
  isAuthenticated,
};
