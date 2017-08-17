'use strict';

const mongoose = require('mongoose');

// this is our schema to represent our dashboard
const postSchema = mongoose.Schema({
  header: {type: String, required: true},
  url: {type: String, required: true},
  week: {type: Number, required: true},
  description: {type: String, required: true},
  // date_created: 0,
  // week: String,
  // archive: Boolean,
});

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

// this is an *instance method* which will be available on all instances
// of the model. This method will be used to return an object that only
// exposes *some* of the fields we want from the underlying data
postSchema.methods.apiRepr = function() {
  return {
    id: this.id,
    header: this.header,
    url: this.url,
    week: this.week,
    description: this.description,
    // date_created: this.date_created,
    // week: this.week,
    // archive: this.archive
  };
};

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


// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema);
module.exports = {Post, User};
