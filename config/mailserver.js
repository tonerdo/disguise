var smtp = require('smtp-server').SMTPServer;

require('../app/models/user.server.model');
var mongoose = require('mongoose'),
    User = mongoose.model('User');

var MailParser = require("mailparser").MailParser;

module.exports = function() {

  var mail = new smtp({

    disabledCommands: ['STARTTLS', 'AUTH'],
    hideSTARTTLS: true,
    banner: require("os").hostname(),
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


        // Insert message
        User.findOne({"username": username}, function(err, user){

          if (err){
            console.log('Error getting user: ' + username + ' Error: ' + err);
          } else if (!user){
            console.log('User not found');
          } else {
            user.received.push(email);
            user.save(function(err){
              if (err)
                console.log('Error saving message for user: ' + username + ' Error: ' + err);
              else
                console.log('Message saved successfully to mailbox: ' + recipient);
            });
          }

        });

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





