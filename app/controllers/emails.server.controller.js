var nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport');


module.exports = {

  // Send email
  send: function(req, res) {

    // Initialize transport object and authenticate user
    var transporter = nodemailer.createTransport(smtpTransport({
      host: 'localhost',
      port: 25,
      auth: {
        user: req.body.username,
        pass: req.body.password
      }
    }));

    // Send the email
    transporter.sendMail({
      from: req.body.username,
      to: req.body.to,
      subject: req.body.subject,
      html: req.body.message
    }, function(error, response){

      if(error){
        console.log(error);
        res.json({
          "message": "Message sending failed",
          "error": error
        });
      } else {
        console.log(response);
        res.json({
          "message": "Message sent successfully"
        });
      }

    });

    // Close connection to free up resources
    transporter.close();
  }

}

