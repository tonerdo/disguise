var mongoose = require('mongoose'),
    config = require('./config/config')();


mongoose.connect(config.db.uri);

var server = require('./config/express')();
server.listen(config.server.port);
exports = module.exports = server;