var express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    jwt = require('jwt-simple'),
    morgan = require('morgan');

var User = require('../app/models/user.server.model');

module.exports = function() {

	var app = express();

  // HTTP request logger
  app.use(morgan('dev'));

  // Use middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(express.static(process.cwd() + '/public'));

  app.use(session(
    {
      secret: 'IHopeNobodyCanGuessThisSecret',
      saveUninitialized: false,
      resave: false
    }
  ));
  app.use(passport.initialize());
  app.use(passport.session());

  // Include passport config
  require('./passport')(app, passport, jwt);

  // Include all routes
  require('../app/routes/users.server.routes')(app, passport);
  require('../app/routes/emails.server.routes')(app);

  return app;
}