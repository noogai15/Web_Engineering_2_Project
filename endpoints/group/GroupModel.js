var mongoose = require("mongoose");
const User = require("../user/UserModel");

const GroupSchema = new mongoose.Schema({
  id: { type: Number, uniqe: true },
  groupName: { type: String, unique: true },
  members: { type: Array },
});

const Group = mongoose.model("Group", GroupSchema);
module.exports = Group;
