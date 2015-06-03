var mongoose = require('mongoose'),
    config = require('./config/config')();

var db = mongoose.connect(config.db.uri);

var appServer = require('./config/express')();
var smtpServer = require('./config/smtp-server')();

appServer.listen(config.server.port);
smtpServer.listen(config.smtp.port);

exports = module.exports = appServer;
exports = module.exports = smtpServer;