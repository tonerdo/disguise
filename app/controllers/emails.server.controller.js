require('dotenv').load();
var nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport');

require('../models/user.server.model');
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    _ = require('lodash');
var MailParser = require("mailparser").MailParser;

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

  receive: function(req, res, next) {
    var data = JSON.parse(req.body.mandrill_events);
    data.forEach(function(ev) {
      if(ev.event == 'inbound') {
        var recipient = ev.msg.email.toLowerCase();
        var username = recipient.split('@')[0];
        var domain = recipient.split('@')[1];
        User.findOne({"username": username}, function(err, user){
          if (!err && user) {
            var mailparser = new MailParser();
            mailparser.on('end', function (message) {
              message.read = false;
              message.messageId = guid() + '@' + ev.msg.from_email.toLowerCase().split('@')[1];
              var email = JSON.stringify(message);
              user.received.push(email);
              user.save(function(err){
                if (err)
                  console.log('Error saving message for user: ' + username + ' Error: ' + err);
                //else
                //console.log('Message saved successfully to mailbox: ' + recipient);
              });
            });
            mailparser.write(ev.msg.raw_msg);
            mailparser.end();
          }
        });

      }
    });
    res.json({ "message": "Email processed" });
  }

}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}
