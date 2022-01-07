var express = require("express");
var router = express.Router();

var messageService = require("./MessageService");
var mongoose = require("mongoose");
const Message = require("./MessageModel");
var groupService = require("../group/GroupService");
const Group = require("../group/GroupModel");
const { isAuthenticated } = require("../authentication/AuthenticationService");

//CREATE AND SAVE MESSAGE
router.post("/send", function (req, res) {
  const message = new Message({
    receiverName: req.body.receiverName,
    senderName: req.body.senderName,
    subject: req.body.subject,
    messageContent: req.body.messageContent,
    dateSent: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
  });
  message
    .save()
    .then((result) => {
      console.log("Message sent");
      console.log("Message Content: " + result.messageContent);
      res.status(201).json({
        message: "MESSAGE SENT",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    });
});

//DELETE MESSAGE
router.delete("/:id", function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    return res.send("No valid ObjectId was given");
  }
  Message.deleteOne({ _id: req.params.id })
    .then((doc) => {
      console.log(doc);
      if (!doc) return res.status(404).end();
      if (doc.deletedCount == 0) {
        res.status(404);
        return res.send("No Message found for this ObjectId");
      }
      return res.send("MESSAGE DELETED");
    })
    .catch((err) => next(err));
});

//GET SINGLE MESSAGE
router.get("/:id", function (req, res, next) {
  Message.findById(req.params.id)
    .then((doc) => {
      if (!doc) {
        return res.status(404).end();
      }
      res.send({
        Sender: doc.senderName,
        Receiver: doc.receiverName,
        Subject: doc.subject,
        Content: doc.messageContent,
        DateSent: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
      });
    })
    .catch((err) => next(err));
});

//GET ALL MESSAGES
router.get("/", function (req, res) {
  Message.find(function (err, messages) {
    if (err) {
      console.log("Error while looking for messages");
      res.send("An error occured");
    } else {
      console.log("Found Message");
      res.send(Object.values(messages));
    }
  });
});

//UPDATE MESSAGE
router.put("/:id", (req, res) => {
  console.log("Searching for Message to be updated");
  var conditions = { _id: req.params.id };
  Message.updateOne(conditions, req.body).then((doc) => {
    if (doc) {
      console.log("Found message and updated");
      res.status(200);
      return res.send("UPDATED MESSAGE");
    }
    console.log("Couldn't find Message");
    res.status(404);
    return res.send("A problem occured");
  });
});

//INBOX FOR USER
router.get("/inbox/:userName", (req, res) => {
  console.log("Getting the inbox of " + req.params.userName);
  messageService.findMessageBy(
    req.params.userName,
    true,
    function (err, message) {
      if (message) {
        res.status(201);
        res.send(JSON.stringify(message));
      } else {
        console.log("A problem occured while getting the inbox");
        res.status(404);
        res.send("A problem occured while getting the inbox");
      }
    }
  );
});

//INBOX FOR GROUP
router.get("/groupInbox/:userName", (req, res) => {
  console.log("Getting all Group inboxes for User: " + req.params.userName);
  groupService.getUsersGroups(req.params.userName, (err, groups) => {
    if (err) {
      console.log(
        "Problem occured while getting " + req.params.userName + "'s Groups"
      );
      res.status(500);
      res.send("A problem occured");
      return;
    }
    console.log("Found Groups for User: " + req.params.userName);

    const groupNames = groups.map((group) => group.groupName);
    Message.find({
      receiverName: { $in: groupNames },
    }).exec((error, groupMessages) => {
      if (error) {
        console.log("Error getting this Groups Messages");
        res.status(404);
        res.send("Could not get this Groups Messages");
      }
      res.send(JSON.stringify(groupMessages));
    });
  });
});

//SENT MESSAGES FOR USER
router.get("/sent/:userName", (req, res) => {
  console.log("Getting the inbox of " + req.params.userName);
  messageService.findMessageBy(
    req.params.userName,
    false,
    function (err, messages) {
      if (messages) {
        res.status(201);
        res.send(JSON.stringify(messages));
      } else {
        console.log("A problem occured while getting the sent messages");
        return res.status(404);
      }
    }
  );
});

module.exports = router;
