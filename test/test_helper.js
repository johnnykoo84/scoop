const mongoose = require('mongoose');


before((done) => {
  const TEST_URI = 'mongodb://localhost/company_test';

  mongoose.connection.openUri(TEST_URI);
  mongoose.Promise = global.Promise;
  mongoose.connection
    .once('open', () => {
      done();
      console.log('connected to MongoDB instance')
    })
    .on('error', error => console.log('Error connection to MongoDB', error));
});

beforeEach((done) => {
  mongoose.connection.collections.companies.drop(() => {
    // ready to go to next test!!
    done();
  });
});
