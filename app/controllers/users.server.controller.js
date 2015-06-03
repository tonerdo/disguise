require('../models/user.server.model');
var mongoose = require('mongoose'),
    User = mongoose.model('User');


module.exports = {

  /**
   * Create new user
   * @param  {[type]}
   * @param  {[type]}
   * @return {[type]}
   */
  create: function(req, res) {

    var user = new User(req.body);
    user._token = user.createToken(user.username);
    user.save(function(err){

      if (err) {
        return res.status(500).send();
      } else {
        res.json(user);
      }

    });

  },

  /**
   * Update a user
   * @param  {[type]}
   * @param  {[type]}
   * @return {[type]}
   */
  update: function(req, res) {

    var userId = req.params.userId;
    var accessToken = req.query.access_token;

    if(!accessToken) { return res.json({ "error": "No access token specified" }); }

    User.findOne({"_id": userId}, function(err, user){

      if (err) {
        return res.status(500).send();
      } else {

        if(user._token !== accessToken) { return res.json({ "error": "Invalid access token" }); }

        user.username = req.body.username;
        user.save(function(err, affected){
          console.log(affected);
          if (err) {
            return res.status(500).send();
          } else {
            res.json({
              "message": "Update successful"
            });
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
  delete: function(req, res) {

    var userId = req.params.userId;
    var accessToken = req.query.access_token;

    if(!accessToken) { return res.json({ "error": "No access token specified" }); }

    User.findOne({"_id": userId}, function(err, user){

      if (err) {
        return res.status(500).send();
      } else {

        if(user._token !== accessToken) { return res.json({ "error": "Invalid access token" }); }

        user.remove(function(err){
          if (err){
            return res.status(500).send();
          } else {
            res.json({
              "message": "Delete successful"
            });
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
  select: function(req, res) {

    var userId = req.params.userId;

    User.findOne({"_id": userId}, function(err, user){

      if (err) {
        return res.status(500).send();
      } else {

        res.json({
          "_id": user._id,
          "username": user.username,
          "created": user.created
        });
      }

    });
  },

  /**
   * Return all users
   * @param  {[type]}
   * @param  {[type]}
   * @return {[type]}
   */
  list: function(req, res) {

    User.find(function(err, users){

      if (err) {
        return res.status(500).send();
      } else {
        res.json(users);
      }
    });

  }

}



