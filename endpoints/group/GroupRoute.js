const express = require("express");
var router = express.Router();

var groupService = require("./GroupService");
var userService = require("../user/UserService");
const Group = require("./GroupModel");
const User = require("../user/UserModel");

//Create Group
router.post("/createGroup", function (req, res) {
  const group = new Group({
    id: req.body.id,
    groupName: req.body.groupName,
    members: [],
  });
  group
    .save()
    .then((result) => {
      res.status(201).json({
        message: "GROUP CREATED",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    });
});

//Create Group
router.put("/:id", (req, res) => {
  console.log("Searching for Group to be updated");
  var conditions = { id: req.params.id };
  Group.updateOne(conditions, req.body).then((doc) => {
    if (doc) {
      console.log("Found Group and updated");
      res.status(200);
      return res.send("UPDATED GROUP");
    }
    console.log("Couldn't find Group");
    res.status(404);
    return res.send("A problem occured");
  });
});

//Delete Group
router.delete("/:id", function (req, res) {
  Group.findByIdAndDelete(req.params.id)
    .then((doc) => {
      if (!doc) {
        return res.status(404).end();
      }
      console.log("GROUP DELETED");
      return res.send(doc + "\n\nGROUP DELETED");
    })
    .catch((err) => next(err));
});

//Remove last added Member from Group
router.put("/removeLast/:groupID", function (req, res) {
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
  });
});

//Subscribe User to Group
router.put("/subscribeUser/:groupID/:id", function (req, res) {
  var user = null;
  var group = null;

  userService.findUserBy(req.params.id, function (error, foundUser) {
    if (foundUser) {
      console.log("Found user");
      user = foundUser;

      groupService.findGroupBy(
        req.params.groupID,
        function (error, foundGroup) {
          if (foundGroup) {
            console.log("Found Group, attepting to add User");
            group = foundGroup;

            group.members.push(user);
            group.save();
            res.send({ Members: group.members });
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
      res.json(
        result.map(
          (group) =>
            "ID: " +
            group.id +
            " /// Group Name: " +
            group.groupName +
            " /// Members:" +
            group.members.map((member) => " " + member.userName)
        )
      );
    } else {
      res.send("Problem occured");
    }
  });
});

//Get Groups the User is subscribed to
router.get("/groupsOf/:id", function (req, res) {
  groupService.getUsersGroups(Number(req.params.id), function (err, groups) {
    if (groups) {
      res.status(201);
      res.json(groups.map((group) => "Group Name: " + group.groupName));
    } else {
      res.status(404);
      res.send("Problem occured");
    }
  });
});

module.exports = router;
