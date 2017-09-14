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
});

module.exports = Lead;
