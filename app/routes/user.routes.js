const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  //Get  surveys by Id
  app.get(
    "/api/users/:userId/surveys",
    [authJwt.verifyToken],
    controller.findById
  );

  //Create survey
  app.post(
    "/api/users/createsurvey",
    [ authJwt.verifyToken ],
    controller.createsurvey
  );
};