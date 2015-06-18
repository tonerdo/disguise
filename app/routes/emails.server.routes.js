var email = require('../controllers/emails.server.controller.js');
var jwtauth = require('../../config/jwtauth.js');

module.exports = function(app) {

  app.route('/api/emails')
        .post(email.send);

  app.route('/api/emails/:user_id')
        .delete(jwtauth, email.delete);

  app.route('/api/emails/:user_id/received')
        .get(jwtauth, email.received);

  app.route('/api/emails/:user_id/unread')
        .get(email.unread);

  app.route('/api/emails/:user_id/sent')
        .get(jwtauth, email.sent);
        
}