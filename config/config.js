module.exports = function() {

  var server = {
    "port": 8080
  };

  var db = {
    "uri": "mongodb://localhost/disguise"
  };

  return {
    "server": server,
    "db": db
  };
}