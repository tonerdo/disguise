app.controller('InboxCtrl', ['$scope', '$rootScope', '$stateParams', '$location', 'EmailSvc',
 function($scope, $rootScope, $stateParams, $location, EmailSvc){

  $scope.inbox = [];

  EmailSvc.received($rootScope.rootUser.user_id)
    .success(function(data){
      $scope.inbox = data;
      if ($scope.inbox.length > 0){
        $location.path('/mail/inbox/' + $scope.inbox[0].messageId);
      }
    })
    .error(function(data){
    });

  $scope.reading = function(messageId) {
    return $location.path().indexOf(messageId) !== -1;
  };

}]);