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
    unique: true,
    trim: true,
    required: true,
  },
  mobile: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
  },
  teamId: {
    type: ObjectId,
    required: true,
  },
  planId: {
    type: ObjectId,
  },
  isBilled: {
    type: Boolean,
    default: false,
  },
  invoiceHistory: [InvoiceSchema],
  isActive: {
    type: Boolean,
    default: false,
    required: true,
  },
  statusHistory: [{
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    reasonChurn: {
      type: String,
    },
  }],
});

module.exports = Member;
