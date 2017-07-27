const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: String,
  password: String,
  admin: { type: Boolean, default: false },
});

// user's password is never saved in plain text String
// instead, we 'salt' and 'hash' it
UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password') || this.isNew) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Create method to compare password
UserSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

// create new UserSchema document
UserSchema.statics.create = function(username, password) {
  const user = new this({
    username,
    password
  })

  // return the Promise
  return user.save()
};

// find one user by using username
UserSchema.statics.findOneByUsername = function(username) {
  return this.findOne({
    username
  }).exec();
};

// verify the password of the UserSchema document
UserSchema.methods.verify = function(password) {
  return this.password = password
};

UserSchema.methods.assignAdmin = function() {
  this.admin = true;
  return this.save();
};

module.exports = mongoose.model('User', UserSchema);
