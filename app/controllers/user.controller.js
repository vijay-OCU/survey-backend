const db = require('../models');
const Surveys = db.surveys;
const Op = db.Sequelize.Op;

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


//Get all users
exports.findAllUsers = (req, res) => {
  const role = "user";
  var condition = role ? { role: { [Op.like]: `%${role}%` } } : null;
  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      });
    });
};