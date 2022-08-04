// mock out Sequelize
const sequelize = jest.mock('sequelize');
//mock out database model
const db = require('../../app/models');
db.users = {};

const app = require('../../server.js');
const request = require('supertest');

describe('auth controller', () => {

  var testUser = {
    username: "vijay",
    password: "$2a$08$vi3HWtNgaAFuSSPUIZBlU.G7IGnwQQDdsWJM/pA6sXI1403iKDcPS",
    role: "user"
  };

  describe('login user', () => {
    it('calls findOne with query', async () => {
      db.users.findOne = jest.fn().mockResolvedValue(Promise.resolve(testUser));
      await request(app)
        .post('/api/auth/login')
        .send({username: "vijay", password:"vijay"})
        .expect(200)
        .then((response) => {
            // console.log(response)
          expect(db.users.findOne).toHaveBeenCalledWith({
            where: {
                username: testUser.username
              }
          });
        });
    });
    it('calls findOne with wrong credentials', async () => {
      db.users.findOne = jest.fn().mockResolvedValue(Promise.resolve(testUser));
      await request(app)
        .post('/api/auth/login')
        .send({username: "vijay", password:"vijayhas"})
        .expect(401)
        .then((response) => {
          expect(response.body.message).toBe('Invalid Password!');
        });
    });
    it('calls findOne with invalid user', async () => {
      db.users.findOne = jest.fn().mockResolvedValue(Promise.resolve());
      await request(app)
        .post('/api/auth/login')
        .send({username: "vijayhas", password:"vijayhas"})
        .expect(404)
        .then((response) => {
          expect(response.body.message).toBe('User Not found.');
        });
    });
  });
});
