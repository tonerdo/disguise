module.exports = function() {

  var server = {
    "port": process.env.PORT || 8080
  };

  var mail = {
    "port": process.env.MAIL_PORT || 1025
  };

  var db = {
    "uri": process.env.MONGODB || "mongodb://localhost/disguise"
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