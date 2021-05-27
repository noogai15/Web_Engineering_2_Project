var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

var userService = require("./UserService");
const User = require("./UserModel");
const { isAuthenticated } = require("../authentication/AuthenticationService");

//TODO: Add Auth check to deletes

//Create and add user to DB
router.post("/register", function (req, res, next) {
  checkIfAdmin(req.headers, (err, user) => {
    if (err) {
      console.log("Authorization error");
      res.status(503);
      return res.send("Authorization error");
    }
    bcrypt.hash(req.body.password, 5, (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: err,
        });
      } else {
        const user = new User({
          id: req.body.id,
          userName: req.body.userName,
          email: req.body.email,
          password: hash,
          isAdministrator: req.body.isAdministrator,
        });
        user
          .save()
          .then((result) => {
            res.status(201).json({
              message: "USER CREATED",
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500);
          });
      }
    });
  });
});

function checkIfAdmin(header, callback) {
  let userID = jwt.decode(header.authorization.split(" ")[1]).user;
  let query = User.findOne({ id: userID });
  query.exec(function (err, result) {
    if (err) {
      console.log("UserRoute: Could not get User from header");
      return callback(err, null);
    }
    if (result.isAdministrator == false) {
      console.log("UserRoute: User is not authorized for this action");
      err = "Not authorized"; //Making err != null so that err check when calling this function can be both if(err) or if(!result)
      return callback(err, null);
    }
    console.log("Found User: " + result);
    return callback(null, result);
  });
}

//Get users
router.get("/", isAuthenticated, function (req, res, next) {
  userService.getUsers(function (err, result) {
    console.log("Result: " + result);
    if (result) {
      res.json(
        result.map((user) => "ID: " + user.id + "; Username: " + user.userName)
      );
    } else {
      res.send("Problem occured");
    }
  });
});

//Delete all users
router.delete("/deleteAllWithID:id", isAuthenticated, function (req, res) {
  checkIfAdmin(req.headers, (err, user) => {
    if (err) {
      console.log("Authorization error");
      res.status(503);
      return res.send("Authorization error");
    }
    User.deleteMany(
      {
        id: {
          $in: [req.params.id],
        },
      },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  });
});

//Delete
router.delete("/:id", isAuthenticated, function (req, res) {
  checkIfAdmin(req.headers, (err, user) => {
    if (err) {
      console.log("Authorization error");
      res.status(503);
      return res.send("Authorization error");
    }
    User.findByIdAndDelete(req.params.id)
      .then((doc) => {
        if (!doc) {
          return res.status(404).end();
        }

        return res.send(doc + "\n\nDELETED USER");
      })
      .catch((err) => next(err));
    console.log("USER DELETED");
  });
});

//Find user
router.get("/:id", isAuthenticated, (req, res) => {
  User.find({ id: req.params.id })
    .then((doc) => {
      if (!doc) {
        return res.status(404).end();
      }
      return res.json(
        doc.map((user) => "ID: " + user.id + "; Username: " + user.userName)
      );
    })
    .catch((err) => next(err));
});

//UPDATE USER
router.put("/:id", (req, res) => {
  console.log("Searching for User to be updated");
  var conditions = { id: req.params.id };
  User.updateOne(conditions, req.body).then((doc) => {
    if (doc) {
      console.log("Found User and updated");
      res.status(200);
      return res.send("UPDATED USER");
    }
    console.log("Couldn't find User");
    res.status(404);
    return res.send("A problem occured");
  });
});

module.exports = router;
