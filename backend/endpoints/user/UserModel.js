var mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    userName: { type: String, unique: true },
    email: String,
    password: String,
    isAdministrator: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.methods.whoAmI = function () {
  var output = this.id ? "My name is " + this.userName : "I don't have a name";
  console.log(output);
};

UserSchema.methods.comparePassword = function (candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return next(err);
    } else {
      next(null, isMatch);
    }
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
