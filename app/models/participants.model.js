module.exports = (sequelize, Sequelize) => {
    const participant = sequelize.define("participants", {
      name: {
        type: Sequelize.STRING,
      },
      emailId: {
        type: Sequelize.STRING
      }
    }, {
      timestamps: false,
    });
    return participant;
  };