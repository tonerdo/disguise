app.factory('EmailSvc', ['$http', function($http){
  
  var email = {

    send: function(message) {
      return $http.post('/api/emails', message);
    },

    unread: function(user_id) {
      return $http.get('/api/emails/' + user_id + '/unread');
    },

    received: function(user_id, message_id) {
      if(!message_id)
        return $http.get('/api/emails/' + user_id + '/received');
      else
        return $http.get('/api/emails/' + user_id + '/received?id=' + message_id);
    },

    sent: function(user_id, message_id) {
      if(!message_id)
        return $http.get('/api/emails/' + user_id + '/sent');
      else
        return $http.get('/api/emails/' + user_id + '/sent?id=' + message_id);
    }

  };

  return email;

}]);