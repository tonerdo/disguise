var smtp = require('smtp-server').SMTPServer,
    fs = require('fs'),
    random = require('random-js')();

require('../app/models/user.server.model');
var mongoose = require('mongoose'),
    User = mongoose.model('User');

var MailParser = require("mailparser").MailParser;

module.exports = function() {

  var mail = new smtp({

    disabledCommands: ['STARTTLS', 'AUTH'],
    hideSTARTTLS: true,
    banner: process.env.SMTP_BANNER,
    onRcptTo: function(address, session, callback){

      var recipient = address.address.toLowerCase();
      var username = recipient.split('@')[0];
      var domain = recipient.split('@')[1];

      if(domain !== 'disgui.se') {
        return callback(new Error('Domain not allowed'));
      }

      User.findOne({"username": username}, function(err, user){

        if (err) {
          return callback(new Error('Sorry we can\'t process your request at this moment'));
        } else if(!user) {
          return callback(new Error('User not found'));
        } else {
          return callback();
        }

      });

    },

    onData: function(stream, session, callback){

      var mailparser = new MailParser();

      // Mail parser event handlers
      mailparser.on('end', function(message){

        var recipient = message.to[0].address;
        var username = recipient.split('@')[0];
        username = username.toLowerCase();
        message.read = false;

        var email = JSON.stringify(message);

        // Insert message details into database
        User.findOneAndUpdate(
          username,
          {$push: {"received": email}},
          {safe: true, upsert: true},
          function(err, model) {

            if(err) {
              console.log('Received messages append for mailbox ' + recipient + '. Error: ' + err);
            } else {
              console.log('Message recieved to mailbox: ' + message.to[0].address);
            }

          }
        );

      });

      // Print message to console
      stream.pipe(process.stdout);

      var content = '';
      stream.on('data', function(chunk){
        content += chunk;
      });

      stream.on('end', function(){
        
        // Parse email message
        mailparser.write(content);
        mailparser.end();

        callback(null, 'Message delivered');

      });
      
    }

  });

  /**
   * Handle SMTP server errors
   * @param  {String}
   * @return {SMTPServer}
   */
  mail.on('error', function(err){
    console.log('Mail server error: ' + err.message);
  });

  return mail;

}

// { 
//   text: 'Hello Toni,\nJust sending a message to say hello to you.\nTake care',
//   headers:
//    { 
//      from: '"Toni Solarin-Sodara" <toni.edward@outlook.com>',
//      to: '<toni@disgui.se>',
//      subect: 'Trying my smtp server' 
//    },
//   priority: 'normal',
//   from: [ 
//     { 
//       address: 'toni.edward@outlook.com',
//       name: 'Toni Solarin-Sodara' 
//     } 
//   ],
//   to: [ 
//     { 
//       address: 'toni@disgui.se', 
//       name: '' 
//     } 
//   ] 
// }






