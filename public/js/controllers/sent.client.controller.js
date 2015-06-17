app.controller('SentCtrl', ['$scope', '$rootScope', '$stateParams', '$location', 'EmailSvc',
 function($scope, $rootScope, $stateParams, $location, EmailSvc){

  $scope.messages = [];

  EmailSvc.sent($rootScope.rootUser.user_id, null, $rootScope.rootUser.access_token)
    .success(function(data){
      $scope.messages = data;
      $scope.messages.reverse();
      if ($scope.messages.length > 0){
        $location.path('/mail/sent/' + $scope.messages[0].messageId);
      }
    })
    .error(function(data){
      $rootScope.logout();
    });

  $scope.reading = function(messageId) {
    return $location.path().indexOf(messageId) !== -1;
  };
  
}]);