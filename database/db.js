var mongoose = require("mongoose");
const config = require("config");

let _db;

const connectionString = config.get("db.connectionString");

//initialize DB

initDB = (callback) => {
  if (_db) {
    if (callback) {
      callback(null, _db);
    } else {
      _db;
    }
  } else {
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    _db = mongoose.connection;

    _db.on("error", console.error.bind(console, "connection error:"));
    _db.once("open", function () {
      console.log(
        "Connected to database " + connectionString + " in DB.js: " + _db
      );
      callback(null, _db);
    });
  }
};

module.exports = { initDB };
