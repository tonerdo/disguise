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

    User.findOne({"_id": userId}, function(err, user){

      if (err) {
        return res.status(500).send(err);
      } else if(!user){
        return res.status(500).send({ "error": "User not found" });
      } else {

        var received = _.map(user.received, function(msg){
          return JSON.parse(msg);
        });

        if(!messageId) {
          res.json(received);
        } else {
          var recv = _.where(received, { 'messageId': messageId });
          res.json(recv);
        }

        next();
      }

    });

  },

  sent: function(req, res, next) {

    var userId = req.params.user_id;
    var messageId = req.query.id;

    User.findOne({"_id": userId}, function(err, user){

      if (err) {
        return res.status(500).send(err);
      } else if(!user){
        return res.status(500).send({ "error": "User not found" });
      } else {

        var sent = _.map(user.sent, function(msg){
          return JSON.parse(msg);
        });

        if(!messageId) {
          res.json(sent);
        } else {
          var snt = _.where(sent, { 'messageId': messageId });
          res.json(snt);
        }

        next();
      }

    });

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

// {
//   "message": "Message sent successfully",
//   "response": {
//     "accepted": [
//       "tonecash17@gmail.com",
//       "prosper.otemuyiwa@andela.co",
//       "oluwatoni.sodara@andela.co"
//     ],
//     "rejected": [
//       "toni.edward@outlook.com"
//     ],
//     "pending": [],
//     "errors": [
//       {
//         "code": "EENVELOPE",
//         "response": "550 OU-002 (SNT004-MC1F6) Unfortunately, messages from 197.253.32.226 weren't sent. Please contact your Internet service provider since part of their network is on our block list. You can also refer your provider to http://mail.live.com/mail/troubleshooting.aspx#errors.",
//         "responseCode": 550,
//         "domain": "outlook.com",
//         "exchange": "mx1.hotmail.com",
//         "recipients": [
//             "toni.edward@outlook.com"
//         ]
//       }
//     ],
//     "envelope": {
//       "from": "toni@disgui.se",
//       "to": [
//         "tonecash17@gmail.com",
//         "prosper.otemuyiwa@andela.co",
//         "oluwatoni.sodara@andela.co",
//         "toni.edward@outlook.com"
//       ]
//     },
//     "messageId": "1433931634485-391d3056-c9d66027-e4027b43@disgui.se"
//   }
// }

