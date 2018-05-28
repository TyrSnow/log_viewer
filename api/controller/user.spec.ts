import * as mocha from 'mocha';
import { expect, assert } from 'chai';
import * as supertest from 'supertest';
import * as mongoose from 'mongoose';

import { getRequest, releaseRequest } from '../app.spec';
import CODE from '../constants/code';
import { Server } from 'http';

let testUserName;

describe('Test regist', () => {
  let server;
  before(() => {
    server = getRequest();
    testUserName = `unitTest${Date.now()}`;
  });

  it('should regist success', (done) => {
    supertest(server)
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
    supertest(server)
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

  after(() => {
    releaseRequest();
  });
});

describe('Test valid name', () => {
  let server;
  before(() => {
    server = getRequest();
    testUserName = `unitTest${Date.now()}`;
  });

  it('status should be 400', (done) => {
    supertest(server)
      .get('/users/names')
      .expect(400)
      .end((err, res) => {
        expect(err).not.exist;
        done(err);
      });
  });

  it('should return true when test unexist name', (done) => {
    supertest(server)
      .get('/users/names?name=logViewer2018')
      .expect(200)
      .end((err, res) => {
        expect(err).not.exist;
        // tslint:disable-next-line:chai-vague-errors
        expect(res.body.data).to.true;
        done(err);
      });
  });

  it('should return false when test exist name', (done) => {
    supertest(server)
      .get('/users/names?name=tianyu')
      .expect(200)
      .end((err, res) => {
        expect(err).not.exist;
        // tslint:disable-next-line:chai-vague-errors
        expect(res.body.data).to.false;
        done(err);
      });
  });

  after(() => {
    releaseRequest();
  });
});
