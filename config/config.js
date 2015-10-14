module.exports = function() {

  var server = {
    "port": process.env.PORT
  };

  var mail = {
    "port": process.env.MAIL_PORT
  };

  var db = {
    "uri": process.env.MONGODB
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