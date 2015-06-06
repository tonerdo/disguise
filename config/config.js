module.exports = function() {

  var server = {
    "port": process.env.PORT || 8080
  };

  var mail = {
    "port": 1025
  };

  var db = {
    "uri": process.env.MONGODB_DEV || process.env.MONGODB_PROD
  };

  return {
    "server": server,
    "db": db,
    "mail": mail
  };
}