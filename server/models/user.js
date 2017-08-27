const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const saltRounds = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

// user's password is never saved in plain text String
// instead, we 'salt' and 'hash' it
UserSchema.pre('save', function save(next) {
  // get access to the user model e.g. user.email, user.password
  const user = this;

  if (!user.isModified('password') || this.isNew) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        return next(err);
      }

      bcrypt.hash(user.password, salt, null, (err, hash) => {
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
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

// create new UserSchema document
UserSchema.statics.create = function (email, password) {
  const user = new this({
    email,
    password
  });

  // return the Promise
  return user.save();
};

// find all users
UserSchema.statics.findAll = function () {
  return this.find({}).exec();
}

// find one user by using username
UserSchema.statics.findOneByEmail = function (email) {
  return this.findOne({
    email
  }).exec();
};

// verify the password of the UserSchema document
UserSchema.methods.verify = function (password) {
  return this.password = password
};

UserSchema.methods.assignAdmin = function () {
  this.admin = true;
  return this.save();
};

module.exports = mongoose.model('User', UserSchema);
