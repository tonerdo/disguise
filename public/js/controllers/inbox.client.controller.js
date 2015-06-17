app.controller('InboxCtrl', ['$scope', '$rootScope', '$stateParams', '$location', 'EmailSvc',
 function($scope, $rootScope, $stateParams, $location, EmailSvc){

  $scope.messages = [];

  EmailSvc.received($rootScope.rootUser.user_id)
    .success(function(data){
      $scope.messages = data;
      $scope.messages.reverse();
      if ($scope.messages.length > 0){
        $location.path('/mail/inbox/' + $scope.messages[0].messageId);
      }
    })
    .error(function(data){
    });

  $scope.reading = function(messageId) {
    return $location.path().indexOf(messageId) !== -1;
  };

}]);