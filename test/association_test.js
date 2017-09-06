const Company = require('../server/models/company');
const User = require('../server/models/user');

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
        console.log('company', company);
        done();
      });

    // old code
    // User.findOne({ email: 'ps@email.com' })
    //   .then((user) => {
    //     console.log('user found', user);
    //     return user;
    //   })
    //   .then((user) => {
    //     Company.findOne({ _id: user.companyId })
    //       .then((company) => {
    //         console.log('company found', company);
    //         done();
    //       });
    //   });
  });
});
