module.exports = (sequelize, Sequelize) => {
  const question = sequelize.define("questions", {
    question: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    }  
  });
  return question;
};