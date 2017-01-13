const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  // lowercase declarations indicate an instance of the model, not the model itself
  let joe, blogPost, comment;
  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
    comment = new Comment({ content: 'Congrats on your big post' });

    // associate the blogPost with joe
    // even though in user.js blogPosts is of the type 'Schema.Types.ObjectId'
    // mongoose knows how to make the association if the whole instance of blogPost is pushed
    // same on blogPost and its comments and comment's user prop
    joe.blogPosts.push(blogPost);
    // add comment to blogPost
    blogPost.comment.push(comment);
    // add user to comment
    comment.user = joe;

    // save all three instances, then call done()
    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it('saves a relation between a user and a blogpost', done => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then(user => {
        assert(user.blogPosts[0].title === 'JS is Great');
        done();
      });
  });
});
