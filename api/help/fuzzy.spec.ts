import fuzzy from './fuzzy';
import * as mocha from 'mocha';
import { expect, assert } from 'chai';

describe('Test fuzzy', () => {
  it('should return an RegExp as expect in english', () => {
    const result = fuzzy('test word');
    expect('test word'.match(result)).to.exist;
    expect('test'.match(result)).to.exist;
    expect('word'.match(result)).to.exist;
    expect('wordwild'.match(result)).to.exist;
    expect('this is a small test.'.match(result)).to.exist;
    expect('this is nothing'.match(result)).not.exist;
  });

  it('should return an RegExp as expect in chinese', () => {
    const result = fuzzy('你 好');
    expect('你好'.match(result)).to.exist;
    expect('你'.match(result)).to.exist;
    expect('好'.match(result)).to.exist;
    expect('你好啊'.match(result)).to.exist;
    expect('这样真的好吗'.match(result)).to.exist;
    expect('呵呵哒'.match(result)).not.exist;
  });

  it('should return an RegExp as expect when multi space in key', () => {
    const result = fuzzy('test   word');
    expect('test word'.match(result)).to.exist;
    expect('test'.match(result)).to.exist;
    expect('word'.match(result)).to.exist;
    expect('wordwild'.match(result)).to.exist;
    expect('this is a small test.'.match(result)).to.exist;
    expect('this is nothing'.match(result)).not.exist;
  });
});
