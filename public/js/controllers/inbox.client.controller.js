app.controller('InboxCtrl', ['$scope', '$rootScope', '$stateParams', '$location', 'EmailSvc',
 function($scope, $rootScope, $stateParams, $location, EmailSvc){

  $scope.messages = [];

  EmailSvc.received($rootScope.rootUser.user_id, null, $rootScope.rootUser.access_token)
    .success(function(data){
      $scope.messages = data;
      $scope.messages.reverse();
      $rootScope.inbox = $scope.messages;
      if ($scope.messages.length > 0){
        $location.path('/mail/inbox/' + $scope.messages[0].messageId);
      }
    })
    .error(function(data){
      $rootScope.logout();
    });

  $scope.reading = function(messageId) {
    return $location.path().indexOf(messageId) !== -1;
  };

}]);