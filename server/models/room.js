const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number, // hourly rate in KRW as default, but take care of other currency in client side
  },
  isOccupied: {
    type: Boolean,
  },
  occupiedBy: {
    type: Date,
  },
});

module.exports = RoomSchema;
