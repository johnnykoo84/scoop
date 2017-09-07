const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SpaceSchema = require('./space');

const Company = new Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true, // this gives me an error... duplicate index error
    required: true,
  },
  spaces: [SpaceSchema],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
});

Company.pre('remove', function(next) {
  const User = mongoose.model('User');
  User.remove({ _id: { $in: this.users }})
    // .then(() => {
    //   User.find({})
    //     .then((users) => {
    //       next();
    //     })
    // })
    .then(() => next());
});

module.exports = mongoose.model('Company', Company);
