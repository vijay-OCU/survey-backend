module.exports = (sequelize, Sequelize) => {
  const album = sequelize.define("albums", {
    title: {
      type: Sequelize.STRING
    },
    language: {
      type: Sequelize.STRING
    },
    genre: {
      type: Sequelize.STRING
    }
  });
  return album;
};