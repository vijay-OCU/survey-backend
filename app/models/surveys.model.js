module.exports = (sequelize, Sequelize) => {
  const survey = sequelize.define("surveys", {
    name: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false,
  });
  return survey;
};