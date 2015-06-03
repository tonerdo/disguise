var users = require('../controllers/users.server.controller.js');

module.exports = function(app, passport) {
  
  app.route('/api/users')
        .get(users.list)
        .post(users.create)
        .put(users.update);

  app.post('/api/users/login', passport.authenticate('login-local'), function(req, res){
    res.json(req.user);
  });

  app.route('/api/users/:userId')
        .get(users.select)
        .delete(users.delete);
}