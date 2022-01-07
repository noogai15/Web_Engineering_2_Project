const express = require("express");
var router = express.Router();

var groupService = require("./GroupService");
var userService = require("../user/UserService");
const Group = require("./GroupModel");
const User = require("../user/UserModel");
const { log } = require("console");
const Math = require("mathjs");
const { isAuthenticated } = require("../authentication/AuthenticationService");

//Create Group
router.post("/createGroup", function (req, res) {
  console.log("Creating Group");

  const group = new Group({
    id: Math.round(Math.random(100000, 900000)),
    groupName: req.body.groupName,
    members: req.body.members,
  });
  group
    .save()
    .then((result) => {
      res.status(201);
      res.send(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    });
});

//Update Group
router.put("/", (req, res) => {
  log("Searching for Group to be updated");
  const change = {
    $set: {
      groupName: req.body.newGroupName,
    },
  };

  var conditions = { groupName: req.body.oldGroupName };
  Group.updateOne(conditions, change).then(
    (doc) => {
      if (doc.n !== 0) {
        log(doc.n);
        log(JSON.stringify({ newGroupName: req.body.newGroupName }));
        res.status(200);
        log("Found Group and updated");
        return res.send({ newGroupName: req.body.newGroupName });
      }
      log("Couldn't find Group");
      res.status(404);
      return res.send("A problem occured");
    },
    (error) => {
      console.warn("Error updating Group");
      res.status(404);
      return res.send("Error updating Group");
    }
  );
});

//Delete Group
router.delete("/", function (req, res, next) {
  Group.deleteOne({ groupName: req.body.groupName })
    .then((doc) => {
      if (!doc) {
        return res.status(404).end();
      }

      console.log("GROUP DELETED");
      return res.send(JSON.stringify(doc));
    })
    .catch((err) => next(err));
});

//Remove last added Member from Group
router.put("/", function (req, res) {
  var group = null;

  groupService.findGroupBy(req.params.groupID, function (error, foundGroup) {
    if (foundGroup) {
      console.log("Found Group, now removing User");
      group = foundGroup;

      group.members.pop();
      group.save();
      res.send({ Members: group.members });
    } else {
      console.log("Could not find Group");
      return res.status(404);
    }
    if (error) {
      console.warn("Error removing last member of  Group");
      return res.status(404);
    }
  });
});

//Subscribe User to Group
router.put("/subscribeUser", function (req, res) {
  var user = null;
  var group = null;

  userService.findUserBy(req.body.userName, function (error, foundUser) {
    if (error) {
      console.log("Error looking for user");
      return res.status(404);
    }
    if (foundUser) {
      console.log("Found user");
      user = foundUser;

      groupService.findGroupBy(
        req.body.groupName,
        function (error, foundGroup) {
          if (foundGroup) {
            console.log("Found Group, attepting to add User");
            group = foundGroup;

            group.members.push(user);
            group.save();
            res.status(201);
            res.send(JSON.stringify(foundGroup));
          } else {
            console.log("Could not find Group");
            return res.status(404);
          }
        }
      );
    } else {
      console.log("Could not find User");
      return res.status(404);
    }
  });
});

//Get Groups
router.get("/", function (req, res, next) {
  groupService.getGroups(function (err, result) {
    console.log("Success");
    if (result) {
      res.send(JSON.stringify(result));
    } else {
      res.send("Problem occured");
    }
  });
});

//Get Groups the User is subscribed to
router.get("/groupsOf/:id", function (req, res) {
  var userQuery = User.findOne({ id: req.params.id });
  userQuery.exec((err, user) => {
    if (err) {
      console.log("Did not find User to find Groups with");
      res.status(404);
      res.send("Did not find User");
    }
    groupService.getUsersGroups(user.userName, function (err, groups) {
      if (groups) {
        res.status(201);
        res.send(JSON.stringify(groups));
      } else {
        res.status(404);
        res.send("Problem occured");
      }
    });
  });
});

module.exports = router;
