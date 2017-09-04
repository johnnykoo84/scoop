const assert = require('assert');
const Company = require('../server/models/company');

describe('create test', (done) => {

  it('saves a company', () => {
    const peach = new Company({
      name: 'peach'
    });

    peach.save()
      .then(() => {
        console.log('!isNew', !peach.isNew)
        assert(!peach.isNew);
        done();
      });
  });

  it('saves a company - test 2', () => {
    const peach = new Company({
      name: 'peach'
    });

    peach.save()
      .then(() => {
        console.log('isNew', peach.isNew)
        // assert(peach.isNew);
        assert(true == false);
        done();
      });
  });
});
