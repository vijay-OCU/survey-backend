module.exports = (sequelize, Sequelize) => {
  const track = sequelize.define("tracks", {
    
    title: {
      type: Sequelize.STRING
    },
    length: {
      type: Sequelize.STRING
    }
    
  });
  return track;
};