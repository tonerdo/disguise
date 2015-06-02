var smtpConnection = require('smtp-connection');

var emailClient = new smtpConnection({
  host: 'smtp.gmail.com',
  port: 25
});

emailClient.connect(function(){
  console.log('Connected...');
});

// Authenticate user
exports.login = function(req, res) {
  emailClient.login({
    user: req.body.username,
    pass: req.body.password
  }, function(err) {
    if (err) {
      console.log(err);
      res.json({
        "message": "Login failed"
      });
    } else {
      res.json({
        "message": "Login successful"
      });
    }
  });
}


// Send email
exports.send = function(req, res) {
  emailClient.send({
    from: req.body.from,
    to: req.body.to
  }, req.body.message, function(err, info){

    if(err){
      console.log(err);
      res.json({
        "message": "Message sending failed"
      });
    } else {
      console.log(info);
      res.json({
        "message": "Message sent successfully"
      });
    }

  });
}

// Log user out
exports.logout = function(req, res) {
  emailClient.quit();
  res.json({
    "message": "User logged out successfully"
  });
}

