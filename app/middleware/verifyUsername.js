const db = require("../models");
const User = db.users;
checkDuplicateUsername = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }
    next();
  });
};

const verifyUsername = {
  checkDuplicateUsername: checkDuplicateUsername,
};
module.exports = verifyUsername;