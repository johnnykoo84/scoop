const expect = require('chai').expect;
const Company = require('../server/models/company');

xdescribe('query company', () => {
  let peach;

  beforeEach((done) => {
    peach = new Company({
      name: 'peach',
    });
    peach.save(done)
  });


  it('find all companies witn the name as peach', (done) => {
    Company.find({ name: 'peach' })
      .then((companies) => {
        expect(companies[0]._id.toString()).to.equal(peach._id.toString());
        done();
      });
  });

  it('model instance remove method', (done) => {
    peach.remove()
      .then(() => Company.findOne({ name: 'peach' }))
      .then((company) => {
        expect(company).to.equal(null);
        done();
      });
  });
});
