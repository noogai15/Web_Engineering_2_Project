const Group = require("./GroupModel"); //get GroupSchema
const User = require("../user/UserModel");

//Get all groups
function getGroups(callback) {
  Group.find(function (err, groups) {
    if (err) {
      console.log("Error while searching for groups");
      return callback(err, null);
    } else {
      console.log("Found groups");
      return callback(null, groups);
    }
  });
}

//Retrieve Group Members
function getGroupMembers(groupID, callback) {
  console.log("GroupService: Find members of Group: " + group);
  var members = null;

  findGroupBy(groupID, function (err, group) {
    if (err) {
      console.log("A problem occured, could not find group");
      callback(err, null);
    } else {
      if (group) {
        console.log("Attempting to add members");
        members = group.members;

        if ((members = null)) {
          console.log("Members was null");
          callback(err, null);
        } else {
          console.log("Found members, adding");
          callback(null, members);
        }
      }
    }
  });
}

function getUsersGroups(userID, callback) {
  console.log("GroupService: Find Groups of User");

  Group.find({ "members.id": Number(userID) }).exec(function (err, groups) {
    if (err) {
      console.log("Could not retrieve Groups of User: " + userID);
      return callback(err, null);
    } else {
      console.log(
        "Found the Groups the User // " + userID + " // is subscribed to"
      );
      return callback(null, groups);
    }
  });
}

function findGroupBy(searchGroupID, callback) {
  console.log("GroupService: find Group with ID: " + searchGroupID);

  if (!searchGroupID) {
    callback("No groupID");
    return;
  } else {
    var query = Group.findOne({ id: searchGroupID });
    query.exec(function (err, group) {
      if (err) {
        console.log("Did not find group for groupID: " + searchGroupID);
        return callback(
          "Did not find group for groupID: " + searchGroupID,
          null
        );
      } else {
        if (group) {
          console.log(`Found groupID: ${searchGroupID}`);
          callback(null, group);
        } else {
          console.log("Could not find group for groupID: " + searchGroupID);
          callback(null, group);
        }
      }
    });
  }
}

module.exports = {
  getGroups,
  findGroupBy,
  getGroupMembers,
  getUsersGroups,
};
