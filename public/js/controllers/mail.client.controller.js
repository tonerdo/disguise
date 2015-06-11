app.controller('MailCtrl', ['$rootScope', '$scope', '$location', '$cookies',
 function($rootScope, $scope, $location, $cookies){
  
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
    return $location.path() == path;
  };

}]);