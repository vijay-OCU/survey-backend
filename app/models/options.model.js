module.exports = (sequelize, Sequelize) => {
    const options = sequelize.define("options", {
      type: {
        type: Sequelize.STRING
      },
      Ch1: {
        type: Sequelize.STRING
      },
      Ch2: {
        type: Sequelize.STRING
      },
      Ch3: {
        type: Sequelize.STRING
      },
      Ch4: {
        type: Sequelize.STRING
      }
    });
    return options;
  };