require('dotenv').load();
var nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport');

require('../models/user.server.model');
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    _ = require('lodash');


module.exports = {


  received: function(req, res, next) {

    var userId = req.params.user_id;
    var messageId = req.query.id;

    var received = _.map(req.user.received, function(msg){
      return JSON.parse(msg);
    });

    for (var i = 0; i < received.length; i++) {
      var msg = received[i];
      if (msg.messageId == messageId) {

        received[i].read = true;
        req.user.received = _.map(received, function(msg){
          return JSON.stringify(msg);
        });

        req.user.save(function(err){
          if (err) console.log('Error updating read status of message. MessageID: ' + messageId);
        });

      }
    }

    if (!messageId)
      res.json(received);
    else
      res.json({ "message": "Marked as read" });

    next();

  },

  unread: function(req, res, next) {

    var userId = req.params.user_id;

    User.findOne({"_id": userId}, function(err, user){

      if (err) {
        return res.status(500).send(err);
      } else if(!user){
        return res.status(500).send({ "error": "User not found" });
      } else {

        var received = _.map(user.received, function(msg){
          return JSON.parse(msg);
        });

        var unread = _.where(received, { 'read': false });
        res.json({ "unread": unread.length });

        next();
      }

    });

  },

  sent: function(req, res, next) {

    var userId = req.params.user_id;
    var messageId = req.query.id;

    var sent = _.map(req.user.sent, function(msg){
      return JSON.parse(msg);
    });

    res.json(sent);

    next();

  },

  delete: function(req, res, next) {

    var channel = req.query.channel;
    var messageId = req.query.id;

    if (!channel || !messageId){
      res.status(400).send({ "error": "No mode specified" });
    }

    var msgs = (channel == 'sent') ? req.user.sent : req.user.received;
    var messages = _.map(msgs, function(msg){
      return JSON.parse(msg);
    });

    for (var i = 0; i < messages.length; i++) {

      if(messages[i].messageId == messageId){

        messages.splice(i, 1);
        if (channel == 'sent') {

          req.user.sent = _.map(messages, function(msg){
            return JSON.stringify(msg);
          });

        } else {

          req.user.received = _.map(messages, function(msg){
            return JSON.stringify(msg);
          });

        }

        req.user.save(function(err){
          if(err) console.log('Error saving message delete to database');
        });

      }

    }

    res.json({ "message": "Delete successful" });

  },


  /**
   * Send an email
   * @param  {[type]}
   * @param  {[type]}
   * @return {[type]}
   */
  send: function(req, res, next) {

    var transporter = nodemailer.createTransport();
    var username = req.body.from.toLowerCase();

    // Check if user exists
    User.findOne({"username": username}, function(err, user){

      if (err) {
        res.status(500).send({
          "message": "Error retrieving user",
          "error": err
        });
      } else if(!user) {
        res.status(500).send({
          "message": "User does not exist"
        });
      } else {

        // Append domain name to req.body.from
        req.body.from += '@disgui.se';
        req.body.date = Date.now();

        // Send the email
        transporter.sendMail(req.body, function(err, info){

          if(err){

            res.status(500).send({
              "message": "Message sending failed",
              "error": err
            });

          } else {

            req.body.messageId = info.messageId;
            var email = JSON.stringify(req.body);

            // Insert message details into database
            User.findByIdAndUpdate(
              user._id,
              {$push: {"sent": email}},
              {safe: true, upsert: true},
              function(err, model) {
                if(err) console.log('Sent messages append error: ' + err);
              }
            );
            
            // Send response
            res.json({
              "message": "Message sent successfully",
              "response": info
            });
          }

        });

      }

    });

    // Close connection to free up resources
    transporter.close();
  }

}

