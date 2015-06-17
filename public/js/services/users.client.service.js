app.factory('UserSvc', ['$http', function($http){
  
  var users = {

    register: function(user) {
      return $http.post('/api/users', user);
    },

    login: function(user) {
      return $http.post('/api/users/login', user);
    },

    dispose: function(user_id, access_token) {
      return $http.delete('/api/users/' + user_id + '?access_token=' + access_token);
    }

  };

  return users;

}]);