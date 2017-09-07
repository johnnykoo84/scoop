const mongoose = require('mongoose');
const expect = require('chai').expect;
const Company = require('../server/models/company');
const User = require('../server/models/user');

describe('middleware test', (done) => {
  let peach, ps, snu;

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

  it('clean up the company peach and see if users associated are gone', (done) => {
    peach.remove()
      .then(() => User.count())
      .then((count) => {
        expect(count).to.equal(0);
        done();
      });
  });
});
