var express = require("express");
var router = express.Router();

var messageService = require("./MessageService");
const Message = require("./MessageModel");
var groupService = require("../group/GroupService");
const Group = require("../group/GroupModel");
const { isAuthenticated } = require("../authentication/AuthenticationService");

//CREATE AND SAVE MESSAGE
router.post("/send", function (req, res) {
  const message = new Message({
    receiverID: req.body.receiverID,
    senderID: req.body.senderID,
    messageContent: req.body.messageContent,
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
//TODO: Should check if authenticated Users ID is the same as senderID
router.delete("/:id", function (req, res) {
  Message.findByIdAndDelete(req.params.id)
    .then((doc) => {
      if (!doc) {
        return res.status(404).end();
      }
      console.log("MESSAGE DELETED");
      return res.send(doc + "\n\nDELETED MESSAGE");
    })
    .catch((err) => next(err));
});

module.exports = router;

//GET SINGLE MESSAGE
router.get("/:id", function (req, res) {
  Message.findById(req.params.id)
    .then((doc) => {
      if (!doc) {
        return res.status(404).end();
      }
      res.send({
        Sender: doc.senderID,
        Receiver: doc.receiverID,
        Content: doc.messageContent,
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
router.get("/inbox/:id", (req, res) => {
  console.log("Getting the inbox of " + req.params.id);
  messageService.findMessageBy(req.params.id, true, function (err, message) {
    if (message) {
      res.status(201);
      res.json(
        message.map(
          (message) =>
            "From: " + message.senderID + ": '" + message.messageContent + "'"
        )
      );
    } else {
      console.log("A problem occured while getting the inbox");
      res.status(404);
      res.send("A problem occured while getting the inbox");
    }
  });
});

//INBOX FOR GROUP
router.get("/groupInbox/:id", (req, res) => {
  console.log("Getting all Group inboxes for User: " + req.params.id);
  groupService.getUsersGroups(req.params.id, (err, groups) => {
    if (err) {
      console.log(
        "Problem occured while getting " + req.params.id + "'s Groups"
      );
      res.status(500);
      res.send("A problem occured");
      return;
    }
    console.log("Found Groups for User: " + req.params.id);

    const groupIds = groups.map((group) => group.id);
    Message.find({
      receiverID: { $in: groupIds },
    }).exec((error, groupMessages) => {
      if (error) {
        console.log("Error getting this Groups Messages");
        res.status(404);
        res.send("Could not get this Groups Messages");
      }
      res.json(
        groupMessages.map(
          (message) =>
            "Sent in Group: " +
            message.receiverID +
            "; From: " +
            message.senderID +
            ": '" +
            message.messageContent +
            "'"
        )
      );
    });
  });
});

//SENT MESSAGES FOR USER
router.get("/sent/:id", (req, res) => {
  console.log("Getting the inbox of " + req.params.id);
  messageService.findMessageBy(req.params.id, false, function (err, message) {
    if (message) {
      res.status(201);
      res.json(
        message.map(
          (message) =>
            "Sent to: " +
            message.receiverID +
            ": '" +
            message.messageContent +
            "'"
        )
      );
    } else {
      console.log("A problem occured while getting the sent messages");
      return res.status(404);
    }
  });
});

module.exports = router;
