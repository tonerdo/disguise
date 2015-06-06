var smtp = require('smtp-server').SMTPServer,
    fs = require('fs');

require('../app/models/user.server.model');
var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function() {

  var mail = new smtp({

    disabledCommands: ['STARTTLS'],
    hideSTARTTLS: true,
    onAuth: function(auth, session, callback) {

      User.findOne({"username": auth.username, "password": auth.password}, function(err, user){

        if (!user) {
          callback(new Error('Invalid username or password'));
        } else {
          callback(null, { user: user });
        }

      });
    },
    onData: function(stream, session, callback){
      console.log("SMTP Server: Data received!");
      stream.pipe(process.stdout); // print message to console
      var content = '';
      stream.on('data', function(chunk){
        content += chunk;
      });
      stream.on('end', function(){
        fs.writeFile('content.txt', content, function(err){
          if(!err) console.log("Output written to file");
          callback();
        });
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