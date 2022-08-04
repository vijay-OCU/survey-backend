// mock out Sequelize
const sequelize = jest.mock('sequelize');
//mock out database model
const db = require('../../app/models');
db.users = {};

const config = require("../../app/config/auth.config");
var jwt = require("jsonwebtoken");
const Op = db.Sequelize.Op;

const app = require('../../server.js');
const request = require('supertest');

describe('admin controller', () => {

  var testUser = {
    username: "vijay",
    password: "$2a$08$vi3HWtNgaAFuSSPUIZBlU.G7IGnwQQDdsWJM/pA6sXI1403iKDcPS",
    role: "user",
    id: "2"
  };
  
  var testAdmin = {
    username: "admin",
    password: "$2a$08$7JptHsuTBlSw4fSiCIskKugaa2e4rfmySQdjiAqSpmZ9fIhVqt3ju",
    role: "admin",
    id: "1"
  }

  var testToken = jwt.sign({ id: testAdmin.id }, config.secret, {
    expiresIn: 86400 // 24 hours
  });

  describe('get all users', () => {
    it("gets all the users", async () => {
      db.users.findAll = jest.fn().mockResolvedValue(Promise.resolve([testUser,testAdmin]));
      db.users.findByPk = jest.fn().mockResolvedValue(Promise.resolve(testAdmin));
      
      await request(app)
        .get('/api/users/all')
        .set({ 'x-access-token': testToken })
        .expect(200)
        .then((response) => {
          expect(db.users.findAll).toHaveBeenCalled();
        });
    });
    it("gets all the users without access token", async () => {
        db.users.findAll = jest.fn().mockResolvedValue(Promise.resolve([testUser,testAdmin]));
        db.users.findByPk = jest.fn().mockResolvedValue(Promise.resolve(testAdmin));
        
        await request(app)
          .get('/api/users/all')
          .expect(403)
          .then((response) => {
            expect(response.body.message).toBe('No token provided!')
        });
      });
  });
});
