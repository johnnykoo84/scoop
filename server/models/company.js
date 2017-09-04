const mongoose = require('mongoose');
// const bcrypt = require('bcrypt-nodejs');

// const saltRounds = 10;
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    // unique: true, // this gives me an error... duplicate index error
  }
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;
