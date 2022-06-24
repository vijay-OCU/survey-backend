const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.albums = require("./album.model.js")(sequelize, Sequelize);
db.tracks = require("./track.model.js")(sequelize, Sequelize);
db.artists = require("./artist.model.js")(sequelize, Sequelize);

db.albums.hasMany(db.tracks, {
  as: 'tracks',
  onDelete: 'CASCADE',
});
db.tracks.belongsTo(db.albums, {
  foreignKey: 'albumId', as: 'albums',
});

db.artists.hasMany(db.albums, {
  as: 'albums',
  onDelete: 'CASCADE',
});
db.albums.belongsTo(db.artists, {
  foreignKey: 'artistId', as: 'artists',
});

module.exports = db;