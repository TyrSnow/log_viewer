/**
 * 提供request实例
 */
import * as mocha from 'mocha';
import { expect, assert } from 'chai';
import * as supertest from 'supertest';
import * as mongoose from 'mongoose';
import app from './app';
import { Server } from 'http';

let server: Server;
let request;

let instanceCount = 0;
let allFinished = false;

before((done) => {
  allFinished = false;
  server = app.listen(3000, () => {
    request = supertest.agent(server);
    done();
  });
});

after((done) => {
  allFinished = true;
  if (instanceCount === 0) {
    destroy(done);
  }
});

function destroy(done?) {
  setTimeout(
    () => {
      server.close(() => {
        mongoose.disconnect();
      });
    },
    10000,
  );
  if (done) {
    done();
  }
}

export function getRequest() {
  instanceCount += 1;

  return server;
}

export function  releaseRequest() {
  instanceCount -= 1;
  if (instanceCount === 0) {
    destroy();
  }
}
