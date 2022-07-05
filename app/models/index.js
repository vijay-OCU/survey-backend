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
db.users = require("./users.model.js")(sequelize, Sequelize);
db.surveys = require("./surveys.model.js")(sequelize, Sequelize);
db.questions = require("./questions.model.js")(sequelize, Sequelize);
db.responses = require("./responses.model.js")(sequelize, Sequelize);
db.participants = require("./participants.model.js")(sequelize, Sequelize);

db.users.hasMany(db.surveys, {
  as: 'surveys',
  //onDelete: 'CASCADE',
});
db.surveys.belongsTo(db.users, {
  foreignKey: 'userId', as: 'users',
});

db.surveys.hasMany(db.questions, {
  as: 'questions',
  //onDelete: 'CASCADE',
});
db.questions.belongsTo(db.surveys, {
  foreignKey: 'surveyId', as: 'surveys',
});

db.questions.hasMany(db.responses, {
  as: 'responses',
  //onDelete: 'CASCADE',
});
db.responses.belongsTo(db.questions, {
  foreignKey: 'questionId', as: 'questions',
});

db.participants.hasMany(db.responses, {
  as: 'responses',
  //onDelete: 'CASCADE',
});
db.responses.belongsTo(db.questions, {
  foreignKey: 'participantId', as: 'participants',
});

module.exports = db;