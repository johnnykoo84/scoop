const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  const TEST_URI = 'mongodb://localhost:21043/test';

  mongoose.connection.openUri(TEST_URI);
  mongoose.connection
    .once('open', () => {
      console.log('let\'s do this!!')
      done();
    })
    .on('error', error => console.log('Error connection to MongoDB', error));
});

beforeEach((done) => {
  const { companies, users } = mongoose.connection.collections;
  companies.drop(() => {
    users.drop(() => {
      done();
    });
  });
});

// wait for node version update to higher than v7
// const Company = require('../server/models/company');
// beforeAll(async () => {
//   await Company.remove({})
// });

// I don't know if below code is correct
// afterEach((done) => {
//   mongoose.connection.collections.companies.drop(() => {
//     // ready to go to next test!!
//     done();
//   });
// });
