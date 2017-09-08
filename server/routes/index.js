const express = require('express');

const router = express.Router();

const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const Auth = require('../controllers/auth');
const Space = require('../controllers/space');

// Authentication
router.post('/signin', requireSignin, Auth.signin);
router.post('/signup', Auth.signup);

router.get('/dashboard', requireAuth, (req, res) => {
  res.json('you havae reached dashbaord page');
});

router.route('/space')
  .get(Space.get)
  .post(Space.post)
// .delete(Space.delete);

module.exports = router;
