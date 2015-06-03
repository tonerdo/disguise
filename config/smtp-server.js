var smtp = require('smtp-server').SMTPServer;

require('../app/models/user.server.model');
var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function() {

  var mail = new smtp({

    disabledCommands: ['STARTTLS'],
    hideSTARTTLS: true,
    onAuth: function(auth, session, callback) {

      console.log('Username: ' + auth.username);
      console.log('Password: ' + auth.password);

      User.findOne({"username": auth.username, "password": auth.password}, function(err, user){

        console.log(user);
        if (!user) {
          callback(new Error('Invalid username or password'));
        } else {
          callback(null, user);
        }

      });
    }

  });

  // Handle errors
  mail.on('error', function(err){
    console.log('Error: ' + err.message);
  });

  return mail;

}