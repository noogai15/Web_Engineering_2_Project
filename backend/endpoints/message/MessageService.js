const Message = require("./MessageModel");

//FIND MESSAGE BY A USER ID.
//isReceiver = true -> look for receiverName in Message
//isReceiver = false -> look for senderName in Message
function findMessageBy(userName, isReceiver, callback) {
  if (isReceiver) {
    //If looking for receiver
    console.log("Looking for RECEIVER with USERNAME: " + userName);

    if (!userName) {
      callback("No receiverName");
      return;
    } else {
      var query = Message.find({ receiverName: userName });
      query.exec(function (err, message) {
        if (err) {
          return callback(
            "Did not find message for receiverName: " + userName,
            null
          );
        } else {
          if (message.length == 0) {
            console.log("Could not find message for receiverName: " + userName);
            callback(err, null);
          } else {
            console.log(`Found receiverName: ${userName}`);
            callback(null, message);
          }
        }
      });
    }
  } else {
    //If looking for sender
    console.log("Looking for SENDER with ID: " + userName);

    if (!userName) {
      callback("No receiverName");
      return;
    } else {
      var query = Message.find({ senderName: userName });
      query.exec(function (err, message) {
        if (err) {
          return callback(
            "Did not find message for senderName: " + userName,
            null
          );
        } else {
          if (message) {
            console.log(`Found senderName: ${userName}`);
            callback(null, message);
          } else {
            console.log("Could not find message for senderName: " + userName);
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
