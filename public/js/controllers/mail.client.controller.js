app.controller('MailCtrl', ['$scope', '$location', function($scope, $location){
  

  if ($location.path() == '/mail') {
    $location.path('/mail/inbox');
  }

  $scope.highlight = function(path){
    return $location.path() == path;
  };

}])