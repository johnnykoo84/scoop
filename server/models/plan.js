const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlanSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    required: true,
  },
  isDaily: {
    type: Boolean,
    required: true,
  },
  period: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = PlanSchema;
