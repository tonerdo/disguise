app.factory('EmailSvc', ['$http', function($http){
  
  var email = {

    unread: function(user_id) {
      return $http.get('/api/emails/' + user_id + '/unread');
    },

    received: function(user_id, message_id, access_token) {
      if(!message_id)
        return $http.get('/api/emails/' + user_id + '/received?access_token=' + access_token);
      else
        return $http.get('/api/emails/' + user_id + '/received?id=' + message_id + '&access_token=' + access_token);
    },

    delete: function(user_id, message_id, channel, access_token) {
      return $http.delete('/api/emails/' + user_id + '?id=' + message_id + '&channel=' + channel + '&access_token=' + access_token);
    }

  };

  return email;

}]);