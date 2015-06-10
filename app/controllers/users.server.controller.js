require('../models/user.server.model');
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    _ = require('lodash');


module.exports = {

  /**
   * Create new user
   * @param  {Object}
   * @param  {Object}
   * @param  {Function}
   */
  create: function(req, res, next) {

    var user = new User(req.body);
    user.username = req.body.username.toLowerCase();

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
   * @param  {Object}
   * @param  {Object}
   * @param  {Function}
   */
  update: function(req, res, next) {

    req.user.username = req.body.username.toLowerCase();
    req.user.save(function(err){

      if (err) {
        return res.status(500).send(err);
      } else {
        res.json({ "message": "Update successful" });
      }

    });
  },

  /**
   * Delete a user
   * @param  {Object}
   * @param  {Object}
   * @param  {Function}
   */
  delete: function(req, res, next) {

    req.user.remove(function(err){

      if (err){
        return res.status(500).send(err);
      } else {
        res.json({ "message": "Delete successful" });
      }

    });
  },

  /**
   * Return a single user
   * @param  {Object}
   * @param  {Object}
   * @param  {Function}
   */
  select: function(req, res, next) {

    var userId = req.params.userId;

    User.findOne({"_id": userId}, function(err, user){

      if (err) {
        return res.status(500).send(err);
      } else {

        res.json({
          "user_id": user._id,
          "username": user.username,
          "created_on": user.created
        });
        next();
      }

    });
  },

  /**
   * Return all users
   * @param  {Object}
   * @param  {Object}
   * @param  {Function}
   */
  list: function(req, res, next) {

    User.find(function(err, users){

      if (err) {
        return res.status(500).send(err);
      } else {
        users = _.map(users, function(user){
          return {
            "user_id": user._id,
            "username": user.username,
            "created_on": user.created
          };
        })
        res.json(users);
        next();
      }
    });

  }

};



