const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const Surveys = db.surveys;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//Create new user
exports.createuser = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    role : req.body.role
  })
    .then(user => {
      res.send({ message: "User was registered successfully!" });
      /*if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }*/
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

//Get all users
exports.findAllUsers = (req, res) => {
  const role = "user";
  var condition = role ? { role: { [Op.like]: `%${role}%` } } : null;
  User.findAll({ where: condition})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      });
    });
};

//Get all surveys
exports.findAllSurveys = (req, res) => {
  Surveys.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving surveys.',
      });
    });
};