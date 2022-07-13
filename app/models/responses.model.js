module.exports = (sequelize, Sequelize) => {
    const response = sequelize.define("responses", {   
      response: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      } 
    });
    return response;
  };