var LocalStrategy = require('passport-local').Strategy;

// load up the user model
require('../app/models/user.server.model');
var mongoose = require('mongoose'),
    User = mongoose.model('User');

// expose this function to our app using module.exports
module.exports = function(passport) {

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      done(null, user);
  });

  // Handle login
  passport.use('local', new LocalStrategy(
    function(username, password, done){

      User.findOne({"username": username, "password": password}, function(err, user){

        if(err) { return done(err); }
        if(!user) { return done(null, false, { message: 'Incorrect username or password' }); }
        return done(null, {
          "_id": user._id,
          "username": user.username,
          "created": user.created,
          "access_token": user._token
        });

      });
    }
  ));

}
