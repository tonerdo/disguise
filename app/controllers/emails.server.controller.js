var nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport');

// Send email
exports.send = function(req, res) {

  var transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    port: 25,
    auth: {
      user: req.body.username,
      pass: req.body.password
    }
  }));

  transporter.sendMail({
    from: req.body.username,
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

  transporter.close();
}

