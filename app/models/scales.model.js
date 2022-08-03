module.exports = (sequelize, Sequelize) => {
    const scale = sequelize.define("scales", {
      min: {
        type: Sequelize.STRING
      },
      max: {
        type: Sequelize.STRING
      }
    }, {
      timestamps: false,
    });
    return scale;
  };