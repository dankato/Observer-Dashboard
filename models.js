'use strict';

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  header: {type: String, required: true},
  url: {type: String, required: true},
  week: {type: Number, required: true},
  description: {type: String, required: true},
  createdAt: Date
});

postSchema.methods.apiRepr = function() {
  return {
    id: this.id,
    header: this.header,
    url: this.url,
    week: this.week,
    description: this.description,
  };
};

// for auth, ignore for now
const userSchema = mongoose.Schema({
  // firstName: {type: String, required: true},
  // lastName: {type: String, required: true},
  // username: {type: String, required: true},
  // password: {type: String, required: true},
  // slack: {type: String, required: true},
  // email: {type: String, required: true},
  // github: {type: String, required: true},
  // cohort: {type: Number, required: true}
});

userSchema.methods.apiRepr = function() {
  return {
    // firstName: this.firstName,
    // lastName: this.lastName,
    // username: this.username,
    // slack: this.slack,
    // email: this.email,
    // github: this.github,
    // cohort: this.cohort
  };
};

const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema);
module.exports = {Post, User};
