const express = require('express');

const router = express.Router();

const Auth = require('../controllers/auth');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.get('/', requireAuth, (req, res) => {
  res.send({ message: 'You have reached the default route / ' });
});

router.post('/signin', requireSignin, Auth.signin);

router.post('/signup', Auth.signup);

module.exports = router;
