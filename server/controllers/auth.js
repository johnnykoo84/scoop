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

// for signin
exports.signin = (req, res, next) => {
  // user has already had their email and passport auth'd
  // we just need to give them a token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = (req, res, next) => {
  const { email, company, password } = req.body;
  console.log('req.body', req.body)
  if (!email || !company || !password) {
    return res.status(422).send({ error: 'email 주소, 비밀번호, 회사 이름을 입력해 주세요' });
  }

  User.findOne({ email })
    .then((err, user) => {
      if (err) { console.log('error during user findone');return next(err); }
      console.log('user found', user);
      if (user) {
        return res.status(422).send({ error: '해당 email 주소는 이미 사용 중입니다.' });
      }
    });

  Company.findOne({ name: company })
    .then((err, company) => {
      if (err) { console.log('error during cmpany findone');return next(err); }
      console.log('company found', company);
      if (company) {
        return res.status(422).send({ error: '이미 가입되어 있는 회사 이름 입니다. 다른 회사 이름으로 시도하시거나 먼저 등록한 사용자에게 연락해 주세요' });
      }
    });

  const newCompany = new Company({
    name: company,
  });
  const newUser = new User({
    email,
    password,
    admin: true,
  });

  newCompany.save()
    .then((err) => {
      if (err) { console.log('error during company.save');return next(err); }
      newUser.save()
        .then((err) => {
          if (err) { console.log('error during user.save');return next(err); }
          res.json({ token: tokenForUser(newUser) });
        });
    });
};

// // for signup
// exports.signup = (req, res, next) => {
//   // const email = req.body.email;
//   // const password = req.body.password;
//   const { email, company, password } = req.body;
//   if (!email || !company || !password) {
//     return res.status(422).send({ error: 'email 주소와 비밀번호를 입력해 주세요' });
//   }
//   // see if a user with the given email exsit
//   return User.findOne({ email }, (err, existingUser) => {
//     if (err) { return next(err); }
//
//     // if a user with email does exist, return an error
//     if (existingUser) {
//       return res.status(422).send({ error: '해당 email 주소는 이미 사용 중입니다' });
//     }
//
//     return User.findOne({ company }, (err, existingCompany) => {
//       if (err) { return next(err); }
//
//       if (existingCompany) {
//         return res.status(422).send({ error: '해당 회사 이름이 이미 사용 중입니다' });
//       }
//
//       // if a user with email&company do NOT exist, create and save user record
//       const user = new User({
//         email,
//         company,
//         password,
//         admin: true,
//       });
//
//       return user.save((err) => {
//         if (err) { return next(err); }
//         // respond to request indicating the user was created
//         res.json({ token: tokenForUser(user) });
//         // res.json(user);
//       });
//     });
//   });
// };
