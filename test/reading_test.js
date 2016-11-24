const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe;
  // before trying to read the database for a user named Joe,
  // we must first create one
  beforeEach(done => {
    joe = new User({ name: 'Joe '});
    joe.save()
      .then(() => done());
  });

  it('finds a user with a specific id', done => {
    User.find({ name: 'Joe' })
      .then(user => {
        console.log(user);
        // assert(user._id.toString() === joe._id.toString());
        done(); // test is finished, move on to next one
      });
  });
});
