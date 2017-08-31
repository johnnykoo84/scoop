const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.id,
    iat: timestamp
  }, config.secret);
}
exports.signin = function signin(req, res, next) {
  // user has already had their email and passport auth'd
  // we just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = function signup(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and pasword' });
  }
  console.log('here')
  // see if a user with the given email exsit
  return User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }

    // if a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // if a user with email does NOT exist, create and save user record
    const user = new User({
      email,
      password
    });

    return user.save((err) => {
      if (err) { return next(err); }
      // respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
      // res.json(user);
    });
  });
};
