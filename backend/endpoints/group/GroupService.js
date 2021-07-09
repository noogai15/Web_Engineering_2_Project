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
function getGroupMembers(groupName, callback) {
  console.log("GroupService: Find members of Group: " + group);
  var members = null;

  findGroupBy(groupName, function (err, group) {
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

function getUsersGroups(userName, callback) {
  console.log("GroupService: Find Groups of User");

  Group.find({ members: String(userName) }).exec(function (err, groups) {
    if (err) {
      console.log("Could not retrieve Groups of User: " + userName);
      return callback(err, null);
    } else {
      console.log(
        "Found the Groups the User // " + userName + " // is subscribed to"
      );
      return callback(null, groups);
    }
  });
}

function findGroupBy(searchGroupName, callback) {
  console.log("GroupService: find Group with groupName: " + searchGroupName);

  if (!searchGroupName) {
    callback("No groupName");
    return;
  } else {
    var query = Group.findOne({ groupName: searchGroupName });
    query.exec(function (err, group) {
      if (err) {
        console.log("Did not find group for groupName: " + searchGroupName);
        return callback(
          "Did not find group for groupName: " + searchGroupName,
          null
        );
      } else {
        if (group) {
          console.log(`Found groupName: ${searchGroupName}`);
          callback(null, group);
        } else {
          console.log("Could not find group for groupName: " + searchGroupName);
          callback(group, null);
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
