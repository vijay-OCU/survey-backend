const { authJwt } = require("../middleware");
const userController = require("../controllers/user.controller");
const surveyController = require("../controllers/survey.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //Create survey
    app.post(
        "/api/surveys/create",
        [authJwt.verifyToken],
        surveyController.createsurvey
    );

    //Create survey
    app.post(
        "/api/surveys/:surveyId/questions/create",
        [authJwt.verifyToken],
        surveyController.addQuestions
    );

    //Create survey
    app.post(
        "/api/surveys/:surveyId/submit",
        [authJwt.verifyToken],
        surveyController.submitResponse
    );

    //get Survey by SurveyId
    app.get(
        "/api/surveys/id/:surveyId",
        [authJwt.verifyToken],
        surveyController.findBySurveyId
    );

    //get Survey by surveyName
    app.get(
        "/api/surveys/name/:surveyName",
        [authJwt.verifyToken],
        surveyController.findBySurveyName
    );

    //get Survey by participantId
    app.get(
        "/api/surveys/participant/:participantId",
        [authJwt.verifyToken],
        surveyController.findSurveyByParticipant
    );

    //update Survey by surveyName
    app.post(
        "/api/surveys/id/:surveyId",
        [authJwt.verifyToken],
        surveyController.update
    );

    //get Survey by surveyId
    app.delete(
        "/api/surveys/id/:surveyId",
        [authJwt.verifyToken],
        surveyController.delete
    );

    //delete Survey by surveyName
    app.delete(
        "/api/surveys/name/:surveyName",
        [authJwt.verifyToken],
        surveyController.deleteByName
    );
}