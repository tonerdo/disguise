var email = require('../controllers/emails.server.controller.js');

module.exports = function(app) {

  app.route('/api/emails')
        .post(email.send);

  app.route('/api/emails/:user_id/received')
        .get(email.received);

  app.route('/api/emails/:user_id/sent')
        .get(email.sent);
        
}