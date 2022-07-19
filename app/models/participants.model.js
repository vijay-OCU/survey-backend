module.exports = (sequelize, Sequelize) => {
    const participant = sequelize.define("participants", {
      name: {
        type: Sequelize.STRING,
        unique: {
          args: true,
          msg: 'Name of the participant must be unique!',
        }
      },
      emailId: {
        type: Sequelize.STRING
      }
    }, {
      timestamps: false,
    });
    return participant;
  };