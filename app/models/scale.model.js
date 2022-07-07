module.exports = (sequelize, Sequelize) => {
    const scale = sequelize.define("scale", {
      min: {
        type: Sequelize.STRING
      },
      max: {
        type: Sequelize.STRING
      }
    });
    return scale;
  };