const expect = require('chai').expect;
const Company = require('../server/models/company');

describe('reading test', () => {
  let wework, peachtree, fastfive, myworkspace;

  beforeEach((done) => {
    wework = new Company({ name: 'wework' });
    peachtree = new Company({ name: 'peachtree' });
    fastfive = new Company({ name: 'fastfive' });
    myworkspace = new Company({ name: 'myworkspace' });

    Promise.all([wework.save(), peachtree.save(), fastfive.save(), myworkspace.save()])
      .then(() => {
        done();
      });
  });

  it('can skip and limit the result set for pagination', (done) => {
    Company.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((result) => {
        expect(result[0].name).to.equal('myworkspace');
        expect(result[1].name).to.equal('peachtree');
        done();
      });
  });
});
