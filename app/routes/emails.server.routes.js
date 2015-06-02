var email = require('../controllers/emails.server.controller.js');

module.exports = function(app) {
  
  app.route('/api/emails/login')
        .post(email.login);

  app.route('/api/emails/logout')
        .get(email.logout);

  app.route('/api/emails')
        .post(email.send);
}