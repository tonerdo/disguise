app.factory('EmailSvc', ['$http', function($http){
  
  var email = {

    send: function(message) {
      return $http.post('/api/emails', message);
    }

  };

  return email;

}]);