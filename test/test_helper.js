const mongoose = require('mongoose');



// before running the tests, run this function to make sure
// the connection is ready, only executes once
before(done => {
  mongoose.connect('mongodb://mjuice:datpiff123@ds151068.mlab.com:51068/mongo-class');
  mongoose.connection
    .once('open', () => done())
    .on('error', error => console.warn('Warning: ', error));
});

// this beforeEach function runs before each test
beforeEach(done => {
  // before each test, delete all User documents
  // the drop function is ansync, so mocha needs to wait until drop
  // is finished before running each test
  // this is possible by passing drop a callback function called done
  mongoose.connection.collections.users.drop(() => {
    // Ready to run the next test!
    done();
  });
});
