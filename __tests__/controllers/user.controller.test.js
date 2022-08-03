// mock out Sequelize
const sequelize = jest.mock('sequelize');
//mock out database model
const db = require('../../app/models');
db.surveys = {};
db.users = {};
db.questions = {};
db.options = {};
db.scales = {};
db.responses = {};
db.participants = {};

const app = require('../../server.js');
const request = require('supertest');

describe('users controller', () => {

  var testTutorial = {
    title: "Automated Testing Tutorial",
    description: "This tutorial shows an example test suite of a NodeJS backend",
    published: false
  };

  describe('get tutorials list', () => {
    it('calls findAll without query', async () => {
      db.tutorials.findAll = jest.fn().mockResolvedValue(Promise.resolve([]));
      await request(app)
        .get('/api/tutorials')
        .expect(200)
        .then((response) => {
          expect(db.tutorials.findAll).toHaveBeenCalled();
        });
    });
  });
});