app.controller('SentCtrl', ['$scope', '$rootScope', '$stateParams', '$location', 'EmailSvc',
 function($scope, $rootScope, $stateParams, $location, EmailSvc){

  $scope.sentMessages = [];

  EmailSvc.sent($rootScope.rootUser.user_id)
    .success(function(data){
      $scope.sentMessages = data;
      if ($scope.sentMessages.length > 0){
        $location.path('/mail/sent/' + $scope.sentMessages[0].messageId);
      }
    })
    .error(function(data){

    });

  $scope.reading = function(messageId) {
    return $location.path().indexOf(messageId) !== -1;
  };
  
}]);