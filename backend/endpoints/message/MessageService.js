const Message = require("./MessageModel");

//FIND MESSAGE BY A USER ID.
//isReceiver = true -> look for receiverID in Message
//isReceiver = false -> look for senderID in Message
function findMessageBy(userID, isReceiver, callback) {
  if (isReceiver) {
    //If looking for receiver
    console.log("Looking for RECEIVER with ID: " + userID);

    if (!userID) {
      callback("No receiverID");
      return;
    } else {
      var query = Message.find({ receiverID: userID });
      query.exec(function (err, message) {
        if (err) {
          return callback(
            "Did not find message for receiverID: " + userID,
            null
          );
        } else {
          if (message.length == 0) {
            console.log("Could not find message for receiverID: " + userID);
            callback(err, null);
          } else {
            console.log(`Found receiverID: ${userID}`);
            callback(null, message);
          }
        }
      });
    }
  } else {
    //If looking for sender
    console.log("Looking for SENDER with ID: " + userID);

    if (!userID) {
      callback("No receiverID");
      return;
    } else {
      var query = Message.find({ senderID: userID });
      query.exec(function (err, message) {
        if (err) {
          return callback("Did not find message for senderID: " + userID, null);
        } else {
          if (message) {
            console.log(`Found senderID: ${userID}`);
            callback(null, message);
          } else {
            console.log("Could not find message for senderID: " + userID);
            callback(null, message);
          }
        }
      });
    }
  }
}

module.exports = {
  findMessageBy,
};
