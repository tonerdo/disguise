var smtp = require('smtp-server').SMTPServer,
    fs = require('fs');

require('../app/models/user.server.model');
var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function() {

  var mail = new smtp({

    disabledCommands: ['STARTTLS', 'AUTH'],
    hideSTARTTLS: true,
    onData: function(stream, session, callback){

      // Print message to console
      stream.pipe(process.stdout);

      var content = '';
      stream.on('data', function(chunk){
        content += chunk;
      });

      stream.on('end', function(){
        // Do stuff
        callback();
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

  return mail;

}