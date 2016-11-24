const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', done => {
    const joe = new User({ name: 'Joe' });
    // save is also async, so we need to wait until it is done
    // before making an assertion
    joe.save()
      .then(() => {
        // isNew checks to see if the instance of the user
        // has actually been saved in the database or if it is
        // still sitting in local memory in Node
        // if it is still sitting in local memory, isNew is true
        assert(!joe.isNew);
        done();
      });
  });
});
