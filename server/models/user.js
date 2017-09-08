const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;
const saltRounds = 10;

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  isAdmin: {
    type: Boolean, // admin user true, staff user false
    default: false,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
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
UserSchema.statics.create = function create(email, company, password) {
  const user = new this({
    email,
    company,
    password,
  });

  // return the Promise
  return user.save();
};

// find all users
UserSchema.statics.findAll = function findAll() {
  return this.find({}).exec();
};

// find one user by using username
UserSchema.statics.findOneByEmail = function findOneByEmail(email) {
  return this.findOne({
    email
  }).exec();
};

// verify the password of the User document
UserSchema.methods.verify = function verify(password) {
  return this.password = password
};

// assign user as adimn user
UserSchema.methods.assignAdmin = function assignAdmin() {
  this.isAdmin = true;
  return this.save();
};

module.exports = mongoose.model('User', UserSchema);
