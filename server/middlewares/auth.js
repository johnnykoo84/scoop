const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

function signup({ email, password, req }) {
  const user = new User({ email, password });
  if (!email || !password) {
    throw new Error('You must provide an email and password');
  }
  return User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        throw new Error('Email already taken');
      }
      return user.save();
    })
    .then((user) => {
      return new Promise((resolve, reject) => {
        req.logIn(user, (err) => {
          if (err) {
            reject(err);
          }
          resolve(user);
        });
      });
    });
}

function login({ email, password, req }) {
  return new Promise((resolve, reject) => {

  })
}

const authMiddleware = (req, res, next) => {
  // read the token from header or url
  const token = req.headers['x-access-token'] || req.query.token;

  // token does not exist
  if (!token) {
    return res.status(403).json({
      sucess: false,
      message: 'notlogged in',
    });
  }

  // create a promise that decodes the token
  const p = new Promise(
    (resolve, reject) => {
      jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    }
  );

  // if it has failed to verify, it will return an arror or message
  const onError = error => res.status(403).json({
    success: false,
    message: error.meessage,
  });

  // process the promise
  p.then((decoded) => {
    req.decoded = decoded;
    next();
  }).catch(onError);
};

module.exports = authMiddleware;
