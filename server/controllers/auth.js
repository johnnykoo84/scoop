const jwt = require('jwt-simple');
const User = require('../models/user');
const Company = require('../models/company');
const config = require('../../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.id,
    iat: timestamp,
  }, config.secret);
}

exports.signup = (req, res, next) => {
  const { company, email, password } = req.body;
  console.log('req.body', req.body);
  console.log('company', company, 'email', email, 'password', password)
  if (!email || !company || !password) {
    return res.status(422).send({ error: 'email 주소, 비밀번호, 회사 이름을 입력해 주세요' });
  }

  User.findOne({ email })
    .then((user) => {
      console.log('user found', user);
      if (user) {
        return res.status(422).send({ error: '해당 email 주소는 이미 사용 중입니다.' });
      }
    })
    .then(() => {
      Company.findOne({ name: company })
        .then((company) => {
          console.log('company found', company);
          if (company) {
            return res.status(422).send({ error: '이미 가입되어 있는 회사 이름 입니다. 다른 회사 이름으로 시도하시거나 먼저 등록한 사용자에게 연락해 주세요' });
          }
        });
    })
    .then(() => {
      const newCompany = new Company({
        name: company,
      });

      return newCompany.save();
    })
    .then(() => {
      const newUser = new User({
        email,
        password,
        admin: true,
      });

      return newUser.save();
    })
    .then((newUser) => {
      res.json({ token: tokenForUser(newUser) });
    })
    .catch(err => res.json(err));
};

// for signin
exports.signin = (req, res, next) => {
  // user has already had their email and passport auth'd
  // we just need to give them a token
  res.send({ token: tokenForUser(req.user) });
};
