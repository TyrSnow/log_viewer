import * as mocha from 'mocha';
import { expect, assert } from 'chai';
import * as supertest from 'supertest';
import * as mongoose from 'mongoose';

import { getRequest, releaseRequest } from '../app.spec';
import CODE from '../constants/code';
import { Server } from 'http';

const testUserName = 'tianyu';
const testPassword = '123456';
let request;

describe('Test log in', () => {
  before((done) => {
    request = supertest(getRequest());
    request
      .post('/users')
      .send({
        name: testUserName,
        password: testPassword,
      })
      .expect(200)
      .end((err, res) => {
        expect(err).not.exist;
        done(err);
      });
  });

  it('validate params: no all', (done) => {
    request
      .post('/session')
      .expect(400)
      .end((err, res) => {
        expect(err).not.exist;
        done(err);
      });
  });

  it('validate params: no password', (done) => {
    request
      .post('/session')
      .send({
        name: testUserName,
      })
      .expect(400)
      .end((err, res) => {
        expect(err).not.exist;
        done(err);
      });
  });

  it('validate params: no name', (done) => {
    request
      .post('/session')
      .send({
        password: testPassword,
      })
      .expect(400)
      .end((err, res) => {
        expect(err).not.exist;
        done(err);
      });
  });

  it('should login success', (done) => {
    request
      .post('/session')
      .send({
        name: testUserName,
        password: testPassword,
      })
      .expect(200)
      .end((err, res) => {
        expect(err).not.exist;
        expect(res.body.success).to.equal(true);
        done(err);
      });
  });

  it('should response PASSWORD_NOT_MATCH', (done) => {
    request
      .post('/session')
      .send({
        name: testUserName,
        password: '456123',
      })
      .expect(200)
      .end((err, res) => {
        expect(err).not.exist;
        expect(res.body.code).to.equal(CODE.PASSWORD_NOT_MATCH.code);
        done(err);
      });
  });

  after(() => {
    releaseRequest();
  });
});

let token;
describe('Test solve_auth', () => {
  before((done) => {
    request = supertest(getRequest());
    request.post('/session')
      .send({
        name: testUserName,
        password: testPassword,
      })
      .expect(200)
      .end((err, res) => {
        token = `Bearer ${res.body.data}`;
        done(err);
      });
  });

  it('should login success', (done) => {
    request
      .get('/session')
      .expect(400)
      .end((err, res) => {
        expect(res.body.code).to.equal(CODE.NOT_AUTHORIZE.code);
        done(err);
      });
  });

  it('should response user info', (done) => {
    request
      .get('/session')
      .set('authorization', token)
      .expect(200)
      .end((err, res) => {
        expect(err).not.exist;
        expect(res.body.data.id).to.exist;
        done(err);
      });
  });

  after(() => {
    releaseRequest();
  });
});
