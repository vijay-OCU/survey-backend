const { authJwt } = require("../middleware");
const { verifyUsername } = require("../middleware");
const adminController = require("../controllers/admin.controller");
const userController = require("../controllers/user.controller");
const surveyController = require("../controllers/survey.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  //Create user
  app.post(
    "/api/auth/createuser",
    [ authJwt.verifyToken, 
      authJwt.isAdmin,
      verifyUsername.checkDuplicateUsername
    ],
    adminController.createuser
  );
  
  //Get all users
  app.get(
    "/api/users/all",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.findAllUsers
  );

  //Get all surveys
  app.get(
    "/api/surveys/all",
    [authJwt.verifyToken, authJwt.isAdmin],
    surveyController.findAllSurveys
  );

  //Get user by Id
  app.get(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findUserbyId
  );

  //Edit user
  app.put(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );

  //Delete user
  app.delete(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );
};