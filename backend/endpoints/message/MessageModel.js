var mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  receiverName: { type: String },
  senderName: { type: String },
  subject: { type: String },
  messageContent: { type: String },
  dateSent: { type: String },
});

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
