var express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    jwt = require('jwt-simple'),
    mongoose = require('mongoose'),
    moment = require('moment'),
    morgan = require('morgan');

require('../app/models/user.server.model');
var User = mongoose.model('User');

setInterval(function(){

  User.find(function(err, users){

    if (users) {
     
      for (var i = 0; i < users.length; i++) {

        var now = moment(Date.now());
        var created = moment(users[i].created);
        var diff = now.diff(created, 'days');
        
        if (diff >= 3) {
          var user = new User(users[i]);
          user.remove(function(err){ 
            console.log(user.username + ' automatically disposed');
          });
        }

      }

    }

  });

}, 3600000);

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
  app.get(/^((?!api).)*$/, function(req, res){
    res.sendFile(process.cwd() + '/public/index.html');
  });

  // Include passport config
  require('./passport')(app, passport, jwt);

  // Include all routes
  require('../app/routes/users.server.routes')(app, passport);
  require('../app/routes/emails.server.routes')(app);

  return app;
}