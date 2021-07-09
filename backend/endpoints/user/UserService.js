const User = require("./UserModel"); //get UserSchema
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var userRoute = require("./UserRoute");
const Math = require("mathjs");

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

function findUserBy(searchUserName, callback) {
  console.log("UserService: find User with userName: " + searchUserName);

  if (!searchUserName) {
    callback("No userID");
    return;
  } else {
    var query = User.findOne({ userName: searchUserName });
    query.exec(function (err, user) {
      if (err) {
        console.log("Did not find user for userName: " + searchUserName);
        return callback(
          "Did not find user for userName: " + searchUserName,
          null
        );
      } else {
        if (user) {
          console.log(`Found userName: ${searchUserName}`);
          callback(null, user);
        } else {
          if ("admin" == searchUserName) {
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
                id: Math.round(Math.random(100000, 900000)),
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
            console.log("Could not find user for userID: " + searchUserName);
            callback(null, user);
          }
        }
      }
    });
  }
}

async function findUserFromArray(userArray, callback) {
  console.log("Finding users from user array " + userArray);
  let members = [];

  if (!userArray) {
    callback("No users given");
    return;
  } else {
    userArray.forEach((user) => {
      var query = User.findOne({ userName: user.userName });
      query.exec(function (err, user) {
        if (err) {
          console.log("Did not find user for userName: " + user.userName);
          return callback(
            "Did not find user for userName: " + user.userName,
            null
          );
        } else {
          if (user) {
            console.log(`Found userName: ${user.userName}`);
            members.push(user);
          }
        }
      });
    });
    callback(null, members);
  }
}

module.exports = {
  getUsers,
  findUserBy,
  findUserFromArray,
};
