const assert = require('assert');
const Company = require('../server/models/company');

xdescribe('create test', () => {

  it('saves a company', (done) => {
    const peach = new Company({
      name: 'peach'
    });

    peach.save()
      .then(() => {
        assert(!peach.isNew);
        done();
      });
  });
});
