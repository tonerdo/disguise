require('../models/user.server.model');
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    _ = require('lodash');


module.exports = {

  /**
   * Create new user
   * @param  {[type]}
   * @param  {[type]}
   * @return {[type]}
   */
  create: function(req, res, next) {

    var user = new User(req.body);
    user._token = user.createToken(user.username);

    user.save(function(err){

      if (err) {
        return res.status(500).send(err);
      } else {
        res.json(user);
        next();
      }

    });

  },

  /**
   * Update a user
   * @param  {[type]}
   * @param  {[type]}
   * @return {[type]}
   */
  update: function(req, res, next) {

    var userId = req.params.userId;
    var accessToken = req.query.access_token;

    if(!accessToken) { return res.json({ "error": "No access token specified" }); }

    User.findOne({"_id": userId}, function(err, user){

      if (err) {
        return res.status(500).send(err);
      } else {

        if(user._token !== accessToken) { return res.json({ "error": "Invalid access token" }); }

        user.username = req.body.username;
        user.save(function(err, affected){
          
          if (err) {
            return res.status(500).send(err);
          } else {
            res.json({
              "message": "Update successful"
            });
            next();
          }
        });
        
      }

    });
  },

  /**
   * Delete a user
   * @param  {[type]}
   * @param  {[type]}
   * @return {[type]}
   */
  delete: function(req, res, next) {

    var userId = req.params.userId;
    var accessToken = req.query.access_token;

    if(!accessToken) { 
      return res.json({ "error": "No access token specified" }); 
    }

    User.findOne({"_id": userId}, function(err, user){

      if (err) {
        return res.status(500).send(err);
      } else {

        if(user._token !== accessToken) { 
          return res.json({ "error": "Invalid access token" }); 
        }

        user.remove(function(err){
          if (err){
            return res.status(500).send(err);
          } else {
            res.json({
              "message": "Delete successful"
            });
            next();
          }
        });
      }

    });
  },

  /**
   * Return a single user
   * @param  {[type]}
   * @param  {[type]}
   * @return {[type]}
   */
  select: function(req, res, next) {

    var userId = req.params.userId;

    User.findOne({"_id": userId}, function(err, user){

      if (err) {
        return res.status(500).send(err);
      } else {

        res.json({
          "_id": user._id,
          "username": user.username,
          "created": user.created
        });
        next();
      }

    });
  },

  /**
   * Return all users
   * @param  {[type]}
   * @param  {[type]}
   * @return {[type]}
   */
  list: function(req, res, next) {

    User.find(function(err, users){

      if (err) {
        return res.status(500).send(err);
      } else {
        users = _.map(users, function(user){
          return {
            "_id": user._id,
            "username": user.username,
            "created": user.created
          };
        })
        res.json(users);
        next();
      }
    });

  }

}



