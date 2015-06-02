require('../models/user.server.model.js');
var mongoose = require('mongoose'),
    User = mongoose.model('User');


// Create new user
exports.create = function(req, res) {
  var user = new User(req.body);
  user.save(function(err){
    if (err) {
      return res.status(500).send();
    } else {
      res.json(user);
    }
  });
}

// Update a user
exports.update = function(req, res) {
  User.update({"_id": req.body._id}, req.body, function(err, aff){
    if (err) {
      return res.status(500).send();
    } else {
      res.json({
        "message": "Update successful"
      });
    }
  });
}

// Delete a user
exports.delete = function(req, res) {
  var userId = req.params.userId;
  User.remove({"_id": userId}, function(err){
    if (err){
      return res.status(500).send();
    } else {
      res.json({
        "message": "Delete successful"
      });
    }
  });
}

// Return a user based on unique id
exports.select = function(req, res) {
  var userId = req.params.userId;
  User.findOne({"_id": userId}, function(err, user){
    if (err) {
      return res.status(500).send();
    } else {
      res.json(user);
    }
  });
}

// Return all users
exports.list = function(req, res) {
  User.find(function(err, users){
    if (err) {
      return res.status(500).send();
    } else {
      res.json(users);
    }
  });
}
