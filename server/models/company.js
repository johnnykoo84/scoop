const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SpaceSchema = require('./space');
const ObjectId = Schema.Objectid;

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

module.exports = mongoose.model('Company', Company);
