const assert = require('assert');
const Company = require('../server/models/company');

describe('query company', (done) => {
  let peach;

  beforeEach((done) => {
    peach = new Company({ name: 'peach' });
    peach.save()
      .then(() => done());
  });

  it('find all companies witn the name as peach', () => {
    Company.findOne({ name: peach })
      .then((companies) => {
        console.log(companies);
        done();
      })
  });
});
