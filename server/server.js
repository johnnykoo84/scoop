/* ===========================
  LOAD THE DEPENDENCIES
=============================*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

/* ===========================
  webpack
=============================*/
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('../config');

/* ===========================
  EXPRESS CONFIGURATION
=============================*/
const app = express();
const port = 3000;
const devPort = 3001;


if(process.env.NODE_ENV == 'dev') {
    console.log('Server is running on development mode');

    const config = require('../webpack.dev.config');
    let compiler = webpack(config);
    let devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log(`webpack-dev-server is listening on port ${devPort}`);
    });
}
app.use('/', express.static(__dirname + '/../public'));

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// print the request log on console
app.use(morgan('dev'));

// set the secret key variable for jwt
app.set('jwt-secret', config.secret);

// index page, just for testing
app.get('/', (req, res) => {
    return res.send('Hello JWT');
});

// configure api router
app.use('/api', require('./routes/api'));

// open the server
const server = app.listen(port, () => {
    console.log(`Express listening on port at ${port}`);
});

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
const mongoClient = require('mongodb').MongoClient;
