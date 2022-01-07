var jwt = require("jsonwebtoken");
var config = require("config");

function isAuthenticated(req, res) {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== undefined) {
    const token = bearerHeader.split(" ")[1];
    const privateKey = config.get("session.tokenKey");
    jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
      if (err) {
        res.status(500).json({ error: "Not authorized" });
        return;
      }
      return true;
    });
  } else {
    res.sendStatus(500).json({ error: "Not authorized" });
    return false;
  }
}

module.exports = {
  isAuthenticated,
};
