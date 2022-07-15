const { authJwt } = require("../middleware");
const controller = require("../controllers/survey.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  //Get all surveys based on user
  app.get(
    "/api/surveys/all",
    [authJwt.verifyToken],
    controller.findAllSurveys
  );
};