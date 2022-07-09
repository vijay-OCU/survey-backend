const db = require("../models");
const survey = db.surveys;
const Op = db.Sequelize.Op;

// Create and Save a new survey
exports.create = (req, res) => {
  
  // Validate request
  if (!req.body.surveyname) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a survey
  const survey = {
    userId: req.params.userId,
    surveyname: req.body.surveyname,
    view: req.body.view,
    report: req.body.report,
    //published: req.body.published ? req.body.published : false
  };

  // Save survey in the database
  survey.create(survey)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the survey."
      });
    });
};

// Retrieve all Surveys from the database.
exports.findAll = (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  var condition = userId ? {userId: {[Op.like]: `%${userId}%`}} : null;
  survey.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving surveys."
      });
    });
};

// Find a single survey with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  survey.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find survey with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving survey with id=" + id
      });
    });
};

// Update a survey by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  survey.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "survey was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update survey with id=${id}. Maybe survey was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating survey with id=" + id
      });
    });
};

// Delete a survey with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  survey.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "survey was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete survey with id=${id}. Maybe survey was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete survey with id=" + id
      });
    });
};

// Delete all Surveys from the database.
exports.deleteAll = (req, res) => {
  survey.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Surveys were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all surveys."
      });
    });
};

/*// Find all published Surveys
exports.findAllPublished = (req, res) => {
  const trackId = req.query.trackId;

  survey.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving surveys."
      });
    });
};*/