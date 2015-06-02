var express = require('express'),
    bodyParser = require('body-parser');

module.exports = function() {

	var app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  require('../app/routes/users.server.routes.js')(app);
  require('../app/routes/emails.server.routes.js')(app);

  return app;
}