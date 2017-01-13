const assert = require('assert');
const User = require('../src/user');

describe('Updates', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 })
    joe.save()
      .then(() => done());
  });

  it('a user can increment their likes by 10', done => {
    User.update({ name: 'Joe' }, { $inc: { likes: 10 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.likes === 10);
        done();
      });
  });
});
