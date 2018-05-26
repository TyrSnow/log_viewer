import * as mocha from 'mocha';
import { expect, assert } from 'chai';
import * as supertest from 'supertest';
import * as mongoose from 'mongoose';

// import app from './app';

describe('Test env ready', () => {
  it('should pass', () => {
    expect(1).to.equal(1);
  });
});

// describe('Test app can be init', () => {
//   it('should with no error', () => {
//     expect(supertest(app)).to.be.exist;
//   });

  // after(() => {
  //   mongoose.disconnect();
  // });
// });
