const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create a subdocument', done => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'Post Test Title' }]
    });

    // save joe to database and then fetch him
    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        // assert that the returned document
        // has a post with a title of 'Post Test Title'
        assert(user.posts[0].title === 'Post Test Title');
        done();
      });
  });

  it('can add subdocuments to an existing record', done => {
    const joe = new User({
      name: 'Joe',
      posts: []
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        user.posts = [ ...user.posts, { title: 'New Post Title' }];
        // ES5 // user.posts.push({ title: 'New Post Title' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.posts[0].title === 'New Post Title');
        done();
      });
  });
});
