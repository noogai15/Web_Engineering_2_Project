var mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  receiverID: { type: Number },
  senderID: { type: Number },
  messageContent: { type: String },
});

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
