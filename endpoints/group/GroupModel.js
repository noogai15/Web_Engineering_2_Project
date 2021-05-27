var mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  id: { type: Number },
  groupName: { type: String, unique: true },
  members: { type: Array }, //TODO: Maybe make String Array only
});

const Group = mongoose.model("Group", GroupSchema);
module.exports = Group;
