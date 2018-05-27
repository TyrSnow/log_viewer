import * as mocha from 'mocha';
import { expect, assert } from 'chai';
import * as supertest from 'supertest';
import * as mongoose from 'mongoose';

import app from '../app';
import CODE from '../constants/code';
import { Server } from 'http';

let testUserName;
let server: Server;
let request;

describe('Test regist', () => {
  before((done) => {
    server = app.listen(3000, () => {
      request = supertest.agent(server);
      testUserName = `unitTest${Date.now()}`;
      done();
    });
  });

  it('should regist success', (done) => {
    request
      .post('/users')
      .send({
        name: testUserName,
        password: '123456',
      })
      .expect(200)
      .end((err, res) => {
        expect(err).not.exist;
        done(err);
      });
  });

  it('test regist twice', (done) => {
    request
      .post('/users')
      .send({
        name: testUserName,
        password: '123456',
      })
      .end((err, res) => {
        expect(err).not.exist;
        expect(res.body.code).to.equal(CODE.DUMPLICATE_NAME.code);
        done(err);
      });
  });

  after((done) => {
    server.close(() => {
      mongoose.disconnect(() => {
        done();
      });
    });
  });
});
