const User = require("./UserModel"); //get UserSchema
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

//Get users from DB
function getUsers(callback) {
  User.find(function (err, users) {
    if (err) {
      console.log("Error while searching " + err);
      return callback(err, null);
    } else {
      console.log("Found user");
      return callback(null, users);
    }
  });
}

function findUserBy(searchUserID, callback) {
  console.log("UserService: find User with ID: " + searchUserID);

  if (!searchUserID) {
    callback("No userID");
    return;
  } else {
    var query = User.findOne({ id: searchUserID });
    query.exec(function (err, user) {
      if (err) {
        console.log("Did not find user for userID: " + searchUserID);
        return callback("Did not find user for userID: " + searchUserID, null);
      } else {
        if (user) {
          console.log(`Found userID: ${searchUserID}`);
          callback(null, user);
        } else {
          if (999 == searchUserID) {
            console.log(
              "Do not have admin account yet. Created with default password"
            );
            bcrypt.hash("12345", 5, (err, hash) => {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  error: err,
                });
              }

              const adminUser = new User({
                id: 999,
                password: hash,
                email: "admin@gmail.com",
                userName: "Default Administrator Account",
                isAdministrator: true,
              });

              adminUser.save(function (err) {
                if (err) {
                  console.log(
                    "Was not able to create Admin account. Error: " + err
                  );
                  callback(
                    "Was not able to log into Admin account. Error: ",
                    null
                  );
                } else {
                  callback(null, adminUser);
                }
              });
            });
          } else {
            console.log("Could not find user for userID: " + searchUserID);
            callback(null, user);
          }
        }
      }
    });
  }
}

module.exports = {
  getUsers,
  findUserBy,
};
