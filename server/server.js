/* ===========================
  LOAD THE DEPENDENCIES
=============================*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('../config');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
// const models = require('./models');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

/* ===========================
  webpack
=============================*/
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

/* ===========================
  EXPRESS CONFIGURATION
=============================*/
const app = express();
const port = 3000;
const devPort = 3001;

// server code starts here

// for development, use webpack
if (process.env.NODE_ENV === 'dev') {
    console.log('Server is running on development mode');

    const config = require('../webpack.dev.config');
    let compiler = webpack(config);
    let devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log(`webpack-dev-server is listening on port ${devPort}`);
    });
}


/* ===========================
  CONNECT TO MONGODB SERVER
=============================*/
const MONGO_URI = config.mongodbUri;
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
// mongoose.connect(MONGO_URI); // this gives deprected warning
mongoose.connection.openUri(MONGO_URI); // use this openUri() instead
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));
// const mongoClient = require('mongodb').MongoClient;

app.use('/', express.static(__dirname + '/../public'));

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// print the request log on console
app.use(morgan('dev'));

// set the secret key variable for jwt
// app.set('jwt-secret', config.secret);

// Initialize passport for use
app.use(passport.initialize());


// Bring in passport strategy we defined
require('./middlewares/passport')(passport);

// Create API group routes
const apiRoutes = express.Router();

// register new users -> this has to be adopted for graphql
apiRoutes.post('/register', function(req, res) {
  console.log('hi are you there')
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter an email and password to register'});
  } else {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
    });

    // Atempt to save the new user
    newUser.save(function(err) {
      if (err) {
        return res.json({ success: false, message: 'That email address already exists' });
      }
      res.json({ success: true, message: 'Successfully created new user.' });
    });
  }
});

// Authenticate the user and get a JWT
apiRoutes.post('/Authenticate', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      // Check if the password matches
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          // Create the token
          const token = jwt.sign(user, config.secret, {
            expiresIn: 10080 // in seconds
          });
          res.json({ success: true, token: 'JWT ' + token });
        } else {
          res.send({ success: false, message: 'Authentication failed. Password did not match' });
        }
      });
    }
  });
});

// Protect dashboard route with JWT
apiRoutes.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {
  res.send('It worked! User id is: ' + req.user._id + '.');
});

// Set url for API group routes
app.use('/api', apiRoutes);

// graphql part
// app.use('/graphql', expressGraphQL({
//   schema,
//   graphiql: true
// }));


// index page, just for testing
// app.get('/', (req, res) => {
//     return res.send('Hello JWT');
// });

// configure api router
// app.use('/api', require('./routes/api'));

// open the server
const server = app.listen(port, () => {
    console.log(`Express listening on port at ${port}`);
});
