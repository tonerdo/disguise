var smtpConnection = require('smtp-connection');
var nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport');

var transporter;

// Authenticate user
exports.login = function(req, res) {
  transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    port: 25,
    auth: {
      user: req.body.username,
      pass: req.body.password
    }
  }));
  res.json({
    "message": "Logged in successfully"
  });
}


// Send email
exports.send = function(req, res) {
  transporter.sendMail({
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.message
  }, function(error, response){

    if(error){
      console.log(error);
      res.json({
        "message": "Message sending failed"
      });
    } else {
      console.log(response);
      res.json({
        "message": "Message sent successfully"
      });
    }

  });
}

// Log user out
exports.logout = function(req, res) {
  transporter.close();
  res.json({
    "message": "User logged out successfully"
  });
}

