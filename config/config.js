module.exports = function() {

  var server = {
    "port": process.env.PORT || 8080
  };

  var mail = {
    "port": process.env.MAIL_PORT || 1025
  };

  var db = {
    "uri": process.env.MONGODB_DEV || "mongodb://" + process.env.MONGODB_PORT_27017_TCP_ADDR + ":" + process.env.MONGODB_PORT_27017_TCP_PORT + "/disguise"
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