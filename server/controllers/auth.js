const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.id,
    iat: timestamp,
  }, config.secret);
}

exports.signin = (req, res, next) => {
  // user has already had their email and passport auth'd
  // we just need to give them a token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = (req, res, next) => {
  // const email = req.body.email;
  // const password = req.body.password;
  const { email, company, password } = req.body;
  if (!email || !company || !password) {
    return res.status(422).send({ error: 'email 주소와 비밀번호를 입력해 주세요' });
  }
  // see if a user with the given email exsit
  return User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }

    // if a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: '해당 email 주소는 이미 사용 중입니다' });
    }

    return User.findOne({ company }, (err, existingCompany) => {
      if (err) { return next(err); }

      if (existingCompany) {
        return res.status(422).send({ error: '해당 회사 이름이 이미 사용 중입니다' });
      }

      // if a user with email&company do NOT exist, create and save user record
      const user = new User({
        email,
        company,
        password,
        admin: true,
      });

      return user.save((err) => {
        if (err) { return next(err); }
        // respond to request indicating the user was created
        res.json({ token: tokenForUser(user) });
        // res.json(user);
      });
    });
  });
};
