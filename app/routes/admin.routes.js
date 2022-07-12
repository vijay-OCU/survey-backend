const { authJwt } = require("../middleware");
const { verifyUsername } = require("../middleware");
const controller = require("../controllers/admin.controller");
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
    controller.createuser
  );
  
  //Get all users
  app.get(
    "/api/users/all",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAllUsers
  );

  //Get all surveys
  app.get(
    "/api/surveys/all",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAllSurveys
  );
};