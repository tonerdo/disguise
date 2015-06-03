var smtp = require('smtp-server').SMTPServer;

module.exports = function() {

  var mail = new smtp();

  // Handle errors
  mail.on('error', function(err){
    console.log('Error: ' + err.message);
  });

  return mail;

}