module.exports = (sequelize, Sequelize) => {
    const response = sequelize.define("responses", {   
      response: {
        type: Sequelize.STRING
      }
    }, {
      timestamps: false,
    });
    return response;
  };