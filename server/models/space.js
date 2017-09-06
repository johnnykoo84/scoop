const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Member = require('./member');
const Room = require('./room');
const Plan = require('./plan');

const SpaceSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true,
    trin: true,
    required: true,
  },
  rooms: [Room],
  members: [Member],
  plans: [Plan],
});

module.exports = SpaceSchema;
