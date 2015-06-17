app.controller('OutboxCtrl', ['$scope', '$rootScope', '$stateParams', '$moment', 'EmailSvc',
 function($scope, $rootScope, $stateParams, $moment, EmailSvc){

  $scope.message = {};
  $scope.messageId = $stateParams.messageId;
  EmailSvc.sent($rootScope.rootUser.user_id, $scope.messageId, $rootScope.rootUser.access_token)
    .success(function(data){
      $scope.message = data[0];
      var date = $moment($scope.message.date);
      date = date.toString();
      $scope.message.date = date;
    })
    .error(function(data){
      $rootScope.logout();
    });
  
}]);