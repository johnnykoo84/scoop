const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const InvoiceSchema = require('./invoice');

const Member = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    // unique: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
  },
  mobile: {
    type: String,
    trim: true,
    required: true,
  },
  teamId: {
    type: ObjectId,
    required: true,
  },
  planId: {
    type: ObjectId,
    required: true,
  },
  isBilled: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
    required: true,
  },
  invoiceHistory: [InvoiceSchema],
});

module.exports = Member;
