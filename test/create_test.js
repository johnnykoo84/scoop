const assert = require('assert');
const Company = require('../server/models/company');

describe('create test', () => {

  it('saves a company', (done) => {
    const peach = new Company({
      name: 'peach'
    });

    peach.save()
      .then(() => {
        console.log('save save save')
        assert(!peach.isNew);
        done();
      });
  });
});
