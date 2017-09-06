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
  mongoose.connection.collections.companies.drop(() => {
    // ready to go to next test!!
    done();
  });
});

// afterEach((done) => {
//   mongoose.connection.collections.companies.drop(() => {
//     // ready to go to next test!!
//     done();
//   });
// });
