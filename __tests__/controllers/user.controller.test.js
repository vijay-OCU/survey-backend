// mock out Sequelize
const sequelize = jest.mock('sequelize');
//mock out database model
const db = require('../../app/models');
db.users = {};
db.surveys = {};
db.options = {};
db.questions = {};
db.responses = {};
db.scales = {};
db.participants = {};
const Question = db.questions;
const Option = db.options;
const Scale = db.scales;
const Response = db.responses;
const Participant = db.participants;

const config = require("../../app/config/auth.config");
var jwt = require("jsonwebtoken");
const Op = db.Sequelize.Op;

const app = require('../../server.js');
const request = require('supertest');

describe('user controller', () => {

  var testUser = {
    username: "vijay",
    password: "$2a$08$vi3HWtNgaAFuSSPUIZBlU.G7IGnwQQDdsWJM/pA6sXI1403iKDcPS",
    role: "user",
    id: "1"
  };

  var testSurvey = {
    id: "1",
    name: "Survey",
    userId: "1"
  }

  var testToken = jwt.sign({ id: testUser.id }, config.secret, {
    expiresIn: 86400 // 24 hours
  });

  describe('get survey by user id', () => {
    it('calls findOne with query', async () => {
      db.surveys.findAll = jest.fn().mockResolvedValue(Promise.resolve([testSurvey]));
      await request(app)
        .get("/api/users/1/surveys")
        .set({ 'x-access-token': testToken })
        .expect(200)
        .then((response) => {
          expect(db.surveys.findAll).toHaveBeenCalledWith({
            where: { userId: { [Op.like]: testUser.id } },
            include: [{
              model: Question, as: 'questions',
              include: [
                { model: Option, as: 'options', },
                { model: Scale, as: 'scales', },
                { model: Response, as: 'responses', }]
            },
            { model: Participant, as: 'participants' }]
          });
        });
    });
    
    it('calls findOne without access token', async () => {
      db.surveys.findAll = jest.fn().mockResolvedValue(Promise.resolve([testSurvey]));
      await request(app)
        .get("/api/users/1/surveys")
        .expect(403)
        .then((response) => {
          expect(response.body.message).toBe('No token provided!')
        });
    });
  });
});
