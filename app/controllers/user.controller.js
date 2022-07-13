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

//Create survey
exports.createsurvey = (req, res) => {
  // Save survey  to Database
  Surveys.create({
    name: req.body.name,
    userId : req.userId
  })
    .then(user => {
      res.send({ message: "Survey was added successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};