var smtp = require('smtp-server').SMTPServer;

module.exports = function() {

  var mail = new smtp({

    disabledCommands: ['STARTTLS'],
    hideSTARTTLS: true,
    onAuth: function(auth, session, callback) {
      console.log('Username: ' + auth.username);
      console.log('Password: ' + auth.password);
      callback(null, {user: 123});
    }

  });

  // Handle errors
  mail.on('error', function(err){
    console.log('Error: ' + err.message);
  });

  return mail;

}