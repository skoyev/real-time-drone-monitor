"use strict";
var path = require('path');
var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var errorhandler = require('errorhandler');
var env = process.env.NODE_ENV || 'development';

var config = require('./config/config')[env];
console.log('Using configuration', config);

var port = config.app.port;
var app = express();

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// cacheService
let cache = require('./services/common/cacheService');
global.cacheService = new cache(config.cache.ttl);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Cache-Control', 'no-cache');

  next();
});

// define routers
var index      = require('./routes/index');

// set up routers
app.use('/api/', index);

let server = app.listen(port, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }
    console.info('==> Real Time Drone Monitor is listening on the port %s. Open up http://localhost:%s/ in your browser.', port, port);
});

// include fron-end streaming module
const DroneStreamData = new
  (require('./services/common/droneStreamDataService'))
      (cacheService, server);

module.exports = server;
