var nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport'),
    os = require('os');


module.exports = {

  /**
   * Send an email
   * @param  {[type]}
   * @param  {[type]}
   * @return {[type]}
   */
  send: function(req, res, next) {

    // Initialize transport object and authenticate user
    var transporter = nodemailer.createTransport(smtpTransport({
      host: os.hostname(),
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
    }, 

    function(error, response){

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
        next();
      }

    });

    // Close connection to free up resources
    transporter.close();
  }

}

