app.factory('EmailSvc', ['$http', function($http){
  
  var email = {

    send: function(message) {
      return $http.post('/api/emails', message);
    },

    received: function(user_id) {
      return $http.get('/api/emails/' + user_id + '/received');
    },

    sent: function(user_id) {
      return $http.get('/api/emails/' + user_id + '/sent');
    }

  };

  return email;

}]);