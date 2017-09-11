const jwt = require('jwt-simple');
const User = require('../models/user');
const Company = require('../models/company');
const config = require('../../config');

function tokenForUser(user) {
  console.log('user token generator called, user', user)
  const timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.id,
    iat: timestamp,
    companyId: user.companyId,
  }, config.secret);
}

exports.signup = (req, res, next) => {
  const { company, email, password } = req.body;
  console.log('req.body', req.body);
  console.log('company', company, 'email', email, 'password', password)
  if (!email || !company || !password) {
    return res.status(422).send({ error: 'email 주소, 비밀번호, 회사 이름을 입력해 주세요' });
  }
  const existingUserCheck = User.findOne({ email });
  const existingCompanyCheck = Company.findOne({ name: company });

  Promise.all([existingUserCheck, existingCompanyCheck])
    .then((result) => {
      if (result[0]) {
        return res.status(422).send({ error: '해당 email 주소는 이미 사용 중입니다.' });
      }
      if (result[1]) {
        return res.status(422).send({ error: '이미 가입되어 있는 회사 이름 입니다. 다른 회사 이름으로 시도하시거나 먼저 등록한 사용자에게 연락해 주세요' });
      }

      const newCompany = new Company({
        name: company,
      });
      const newUser = new User({
        email,
        password,
        admin: true,
      });
      newUser.companyId = newCompany;

      Promise.all([newCompany.save(), newUser.save()])
        .then(() => {
          console.log('new company and new user saved alright')
          res.json({ token: tokenForUser(newUser) });
        });
    })
    .catch(err => res.json(err));
};

// for signin
exports.signin = (req, res, next) => {
  // console.log('req.header', req.header, 'req.headers', req.headers)
  // user has already had their email and passport auth'd
  // we just need to give them a token
  res.send({ token: tokenForUser(req.user) });
};
