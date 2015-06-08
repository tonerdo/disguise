var users = require('../controllers/users.server.controller.js');
var jwtauth = require('../../config/jwtauth.js');

module.exports = function(app, passport) {
  
  app.route('/api/users')
        .get(users.list)
        .post(users.create);

  app.post('/api/users/login', passport.authenticate('local', { session: false }), function(req, res){
    res.json(req.user);
  });

  app.route('/api/users/:user_id')
        .get(users.select)
        .put(jwtauth, users.update)
        .delete(jwtauth, users.delete);
};