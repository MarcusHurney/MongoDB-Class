const mongoose = require('mongoose');
// import PostSchema
const PostSchema = require('./post-schema');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than two characters'
    },
    required: true
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

// virtual properties are added as separate declarations
UserSchema.virtual('postCount').get(function() {
  // 'this' will refer to the instance of the model
  // from which postCount is called
  return this.posts.length;
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
