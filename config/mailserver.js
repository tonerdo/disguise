var smtp = require('smtp-server').SMTPServer,
    fs = require('fs');

require('../app/models/user.server.model');
var mongoose = require('mongoose'),
    User = mongoose.model('User');

var MailParser = require("mailparser").MailParser,
    mailparser = new MailParser();

module.exports = function() {

  var mail = new smtp({

    disabledCommands: ['STARTTLS', 'AUTH'],
    hideSTARTTLS: true,
    banner: process.env.SMTP_BANNER,
    onRcptTo: function(address, session, callback){

      var recipient = address.address;
      var username = recipient.split('@')[0];
      var domain = recipient.split('@')[1];

      if(domain !== 'disgui.se') {
        return callback(new Error('Only emails ending in @disgui.se are allowed'));
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

      // Print message to console
      stream.pipe(process.stdout);

      var content = '';
      stream.on('data', function(chunk){
        content += chunk;
      });

      stream.on('end', function(){
        // Parse email message
        fs.writeFile('message.txt', content, function(err){
          if(err) console.log(err);
          else console.log('Saved to file!');
        });
        // mailparser.write(content);
        // mailparser.end();
        callback(null, 'Message queued');
      });
      
    }

  });

  /**
   * Handle SMTP server errors
   * @param  {String}
   * @return {SMTPServer}
   */
  mail.on('error', function(err){
    console.log('Error: ' + err.message);
  });

  // Mail parser event handlers
  mailparser.on('end', function(message){
    console.log('Message recieved!');
    console.log(message);
  });

  return mail;

}