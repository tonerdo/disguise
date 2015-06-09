app.factory('UserSvc', ['$http', function($http){
  
  var users = {

    register: function(user) {
      return $http.post('/api/users', user);
    },

    login: function(user) {
      return $http.post('/api/users/login', user);
    }

  };

  return users;

}])