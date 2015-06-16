app.controller('MailCtrl', ['$rootScope', '$scope', '$location', '$cookies', 'EmailSvc',
 function($rootScope, $scope, $location, $cookies, EmailSvc){
  
  var cookie = $cookies.get('user');
  if (!cookie) {
    $location.path('/');
  } else {
    $rootScope.rootUser = JSON.parse(cookie);
  }

  if ($location.path() == '/mail') {
    $location.path('/mail/inbox');
  }

  $scope.highlight = function(path){
    return $location.path().indexOf(path) !== -1;
  };

  EmailSvc.unread($rootScope.rootUser.user_id)
    .success(function(data){
      $scope.unread = data.unread;
    })
    .error(function(data){
    });

}]);