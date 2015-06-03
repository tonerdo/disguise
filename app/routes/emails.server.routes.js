var email = require('../controllers/emails.server.controller.js');

module.exports = function(app) {

  app.route('/api/emails')
        .post(email.send);
        
}