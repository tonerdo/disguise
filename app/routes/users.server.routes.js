var users = require('../controllers/users.server.controller.js');

module.exports = function(app) {
  
  app.route('/api/users')
        .get(users.list)
        .post(users.create)
        .put(users.update);

  app.route('/api/users/:userId')
        .get(users.select)
        .delete(users.delete);
}