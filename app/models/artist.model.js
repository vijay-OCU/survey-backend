module.exports = (sequelize, Sequelize) => {
    const artist = sequelize.define("artists", {
      
      name: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      }
    });
    return artist;
  };