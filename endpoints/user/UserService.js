const User = require("./UserModel"); //get UserSchema

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
          if (000 == searchUserID) {
            console.log(
              "Do not have admin account yet. Created with default password"
            );
            const adminUser = new User({
              id: 888,
              password: "123",
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
