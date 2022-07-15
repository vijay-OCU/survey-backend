const { condition } = require("sequelize");
const db = require("../models");
const User = db.users;
const Surveys = db.surveys;
const Op = db.Sequelize.Op;

//Get all surveys
exports.findAllSurveys = (req, res) => {
    User.findByPk(req.userId)
        .then((user)=> {
            var condition;
            if(user.role=="admin"){
                userId = "";
            }else{
                var userId = req.userId;
            }            
            Surveys.findAll({ where: { userId: { [Op.like]: userId } }})
                .then((data) => {
                    res.send(data);
                })
                .catch((err) => {
                    res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving surveys.',
                    });
                })
        })
    }