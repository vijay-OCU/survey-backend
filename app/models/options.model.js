module.exports = (sequelize, Sequelize) => {
    const option = sequelize.define("options", {
      type: {
        type: Sequelize.STRING
      },
      choice: {
        type: Sequelize.STRING
      }
    }, {
      timestamps: false,
    });
    return option;
  };