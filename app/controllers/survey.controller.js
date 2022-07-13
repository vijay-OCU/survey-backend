const db = require('../models');
const Survey = db.surveys;
const Question = db.questions;
const Option = db.options;
const Scale = db.scales;
const Op = db.Sequelize.Op;

//Find surveys by user Id
exports.findById = (req, res) => {
  const userId = req.params.userId;
  Survey.findAll({ where: { userId: { [Op.like]: userId } }})
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
  Survey.create({
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

//Get all surveys
exports.findAllSurveys = (req, res) => {
    Survey.findAll({
      include: [{
        model: Question, as: 'questions',
        include: [
          { model: Option, as: 'options', },
          { model: Scale, as: 'scales', }]
      }]
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving surveys.',
        });
      });
  };