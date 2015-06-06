require('dotenv').load();
var nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport');


module.exports = {

  /**
   * Send an email
   * @param  {[type]}
   * @param  {[type]}
   * @return {[type]}
   */
  send: function(req, res, next) {

    var transporter = nodemailer.createTransport();

    // Send the email
    transporter.sendMail({
      from: req.body.username + '@disgui.se',
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.message,
      html: req.body.message
    }, 

    function(error, response){

      if(error){
        res.status(500).send({
          "message": "Message sending failed",
          "error": error
        });
      } else {

        // Insert message details into database
        res.json({
          "message": "Message sent successfully",
          "response": response
        });
        next();
      }

    });

    // Close connection to free up resources
    transporter.close();
  }

}

