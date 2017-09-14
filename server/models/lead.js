const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Lead = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    required: true,
  },
  mobile: {
    type: String,
    trim: true,
    required: true,
  },
  via: {
    type: String,
    enum: ['facebook', 'homepage', 'friend', 'etc'],
    required: true,
  },
});

module.exports = Lead;
