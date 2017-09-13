const express = require('express');

const router = express.Router();

const passportService = require('../services/passport'); // do not remove
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const Auth = require('../controllers/auth');
const Space = require('../controllers/space');
const Dashboard = require('../controllers/dashboard');

// Authentication
router.post('/signin', requireSignin, Auth.signin);
router.post('/signup', Auth.signup);

router.route('/selectspace', requireAuth)
.get(Space.get);

router.get('/dashboard', requireAuth, Dashboard.get);


module.exports = router;
