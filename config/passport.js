var LocalStrategy = require('passport-local').Strategy;

// load up the user model
require('../app/models/user.server.model');
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    moment = require('moment'),
    config = require('./config')();

// expose this function to our app using module.exports
module.exports = function(app, passport, jwt) {

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Handle login
  passport.use('local', new LocalStrategy(
    function(username, password, done){

      User.findOne({"username": username, "password": password}, function(err, user){

        if(err) { return done(err); }
        if(!user) { return done(null, false, { message: 'Incorrect username or password' }); }

        var expires = moment().add(1, 'days').valueOf();
        var token = jwt.encode({
          iss: user._id,
          exp: expires
        }, config.jwt.secret);
        
        return done(null, {
          "user_id": user._id,
          "created_on": user.created,
          "access_token": token,
          "expires_at": expires
        });

      });
    }
  ));

};
