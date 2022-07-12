const db = require('../models');
const Surveys = db.surveys;
const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

//Find surveys by user Id
exports.findById = (req, res) => {
  const userId = req.params.userId;
  Surveys.findAll({ where: { userId: { [Op.like]: userId } }})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving surveys.',
      });
    });
};