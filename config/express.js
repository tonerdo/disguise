var express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport');

var User = require('../app/models/user.server.model');

module.exports = function() {

	var app = express();

  // Use middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

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
  require('./passport')(passport);

  // Include all routes
  require('../app/routes/users.server.routes')(app, passport);
  require('../app/routes/emails.server.routes')(app);

  return app;
}