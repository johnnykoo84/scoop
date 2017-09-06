const Company = require('../server/models/company');
const User = require('../server/models/user');
const expect = require('chai').expect;
const assert = require('assert');

describe('associations test b/w company and user', () => {
  let peach, snu, ps;

  beforeEach((done) => {
    peach = new Company({ name: 'peach' });
    ps = new User({
      email: 'ps@email.com',
      password: '123',
      admin: true,
    });
    snu = { name: 'snu' };

    peach.spaces.push(snu); // this is a simple object pushed to array
    peach.users.push(ps); // here mongoose automatically only pushs object id
    ps.companyId = peach; // again here mongoose intercepts somehow and just saves object id
    Promise.all([peach.save(), ps.save()])
      .then(() => done());
  });

  it('query associated data', (done) => {
    Company
      .findOne({ name: 'peach' })
      .populate('users')
      .then((company) => {
        console.log(company);
        expect(company.users[0].companyId.toString()).to.equal(peach._id.toString());
        done();
      });
  });

  it.only('double populate', (done) => {
    Company
      .findOne({ name: 'peach' })
      .populate({
        path: 'users',
        populate: {
          path: 'companyId',
          model: 'Company'
        }
      })
      .then((company) => {
        // console.log(company.users[0].companyId.users[0].toString());
        expect(company.users[0].companyId.users[0].toString()).to.equal(ps._id.toString());
        done();
      });
  });
});
