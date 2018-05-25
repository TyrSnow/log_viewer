import * as mocha from 'mocha';
import { expect, assert } from 'chai';

import { randomHex, timingCompair } from './util';

describe('Test randomHex', () => {
  it('should return an hex with expect length', () => {
    expect(randomHex(16).length).to.equal(16);
    expect(randomHex(32).length).to.equal(32);
    expect(randomHex(0).length).to.equal(0);
    expect(randomHex().length).to.equal(32);
  });
});

describe('Test timingCompair', () => {

});
