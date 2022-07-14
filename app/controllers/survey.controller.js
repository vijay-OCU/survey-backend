const db = require('../models');
const Survey = db.surveys;
const Question = db.questions;
const Option = db.options;
const Scale = db.scales;
const Response = db.responses;
const Participant = db.participants;
const Op = db.Sequelize.Op;

//Find surveys by user Id
exports.findById = (req, res) => {
    const userId = req.params.userId;
    Survey.findAll({ where: { userId: { [Op.like]: userId } } })
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
        userId: req.body.userId,
    })
        .then(survey => {
            res.send({ message: `Survey was added successfully! with id=${survey.id}` });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

//Create survey
exports.addQuestions = (req, res) => {
    const surveyId = req.params.surveyId;
    Survey.findAll({
        where: { id: { [Op.like]: surveyId } },
    })
        .then((data) => {
            if (data.length == 1) {
                req.body.forEach(que => {
                    console.log('data received',data);
                    Question.create({
                        question: que.question,
                        type: que.type,
                        surveyId: surveyId,
                    }).then((savedQue) => {
                        if (que.type == 'SINGLE_CHOICE' || que.type == 'MULTI_CHOICE' || que.type == 'BOOLEAN') {
                            que.options.forEach(opt => {
                                Option.create({
                                    type: que.type,
                                    choice: opt,
                                    questionId: savedQue.id,
                                });
                            });
                        } else if (que.type == 'SCALE') {
                            Scale.create({
                                min: que.scale.min,
                                max: que.scale.max,
                                questionId: savedQue.id,
                            });
                        }
                    });
                });
                res.send({ message: `${req.body.length} Questions were added to the Survey #${surveyId} successfully!` });

            } else {
                res.send({
                    message: `Cannot add Questions to the Survey with id=${surveyId}. Maybe Survey was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not create Survey with id=' + surveyId,
            });
        });
};

//Get all surveys
exports.findAllSurveys = (req, res) => {
    Survey.findAll({
        include: [{
            model: Question, as: 'questions',
            include: [
                { model: Option, as: 'options', },
                { model: Scale, as: 'scales', },
                { model: Response, as: 'responses', }]
        },
        { model: Participant, as: 'participants' }]
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

//Find surveys by surveyId
exports.findBySurveyId = (req, res) => {
    const surveyId = req.params.surveyId;
    Survey.findAll({
        where: { id: { [Op.like]: surveyId } },
        include: [{
            model: Question, as: 'questions',
            include: [
                { model: Option, as: 'options', },
                { model: Scale, as: 'scales', },
                { model: Response, as: 'responses', }]
        },
        { model: Participant, as: 'participants' }]
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


//Find surveys by surveyId
exports.findBySurveyName = (req, res) => {
    const surveyName = req.params.surveyName;
    Survey.findAll({
        where: { name: { [Op.like]: surveyName } },
        include: [{
            model: Question, as: 'questions',
            include: [
                { model: Option, as: 'options', },
                { model: Scale, as: 'scales', },
                { model: Response, as: 'responses', }]
        },
        { model: Participant, as: 'participants' }]
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

// Update a Survey by the id in the request
exports.update = (req, res) => {
    const id = req.params.surveyId;
    Survey.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Survey was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update Survey with id=${id}. Maybe Survey was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Survey with id=' + id,
            });
        });
};


// Delete a Survey with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.surveyId;
    Survey.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Survey was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Survey with id=${id}. Maybe Survey was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Survey with id=' + id,
            });
        });
};


// Delete a Survey with the specified surveyName in the request
exports.deleteByName = (req, res) => {
    const surveyName = req.params.surveyName;
    Survey.destroy({
        where: { name: surveyName },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Survey was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Survey with id=${id}. Maybe Survey was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Survey with id=' + id,
            });
        });
};

