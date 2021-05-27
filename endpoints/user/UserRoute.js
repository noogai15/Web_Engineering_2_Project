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
  userService.getUserFromHeader(req.headers, (err, user) => {
    if (err) {
      console.log("Problem, couldn't get User from header");
      res.status(503);
      return res.send("Problem, couldn't get User from header");
    }
    if (user.isAdministrator == false) {
      res.status(403);
      return res.send("Not authorized for this action");
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
            console.log(result);
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

//Get users
router.get("/", isAuthenticated, function (req, res, next) {
  userService.getUsers(function (err, result) {
    console.log("Result: " + result);
    if (result) {
      res.send(Object.values(result));
    } else {
      res.send("Problem occured");
    }
  });
});

//Delete all users
router.delete("/deleteAllWithID:id", isAuthenticated, function (req, res) {
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

//Delete
router.delete("/:id", isAuthenticated, function (req, res) {
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

//Find user
router.get("/:id", isAuthenticated, (req, res) => {
  User.find({ id: req.params.id })
    .then((doc) => {
      if (!doc) {
        return res.status(404).end();
      }
      return res.status(200).json(doc);
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
