// load up the user model
require('../app/models/user.server.model');
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    config = require('./config')();

var jwt = require('jwt-simple');

module.exports = function(req, res, next) {

  var userId = req.params.user_id;
  var accessToken = req.query.access_token;

  // Check if access token was sent
  if(!accessToken) { 
    res.status(401).send({ "error": "No access token specified" });
  }

  if(accessToken){

    // Try to decode access token
    try {

      var token = jwt.decode(accessToken, config.jwt.secret);

      if (token.exp <= Date.now()) {
        res.status(401).send({ "error:": "Access token has expired"});
      }

      if (token.iss !== userId) {
        res.status(401).send({ "error:": "Invalid access token"});
      }

      User.findOne({ _id: token.iss }, function(err, user) {

        if(err) {

          res.status(500).send(err);

        } else if(!user){

          res.status(401).send({ "message": "User not found" });

        } else {

          req.user = user;
          next();

        }
        
      });

    } catch(err) {
      res.status(401).send({ "error:": "Invalid access token"});
    }
    
  }

};