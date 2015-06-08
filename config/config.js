module.exports = function() {

  var server = {
    "port": process.env.PORT || 8080
  };

  var mail = {
    "port": process.env.MAIL_PORT
  };

  var db = {
    "uri": process.env.MONGODB_DEV || process.env.MONGODB_PROD
  };

  var jwt = {
    "secret": "IHopeNobodyCanGuessThisSecret"
  }

  return {
    "server": server,
    "db": db,
    "mail": mail,
    "jwt": jwt
  };
}