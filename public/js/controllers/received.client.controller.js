app.controller('ReceivedCtrl', ['$scope', '$rootScope', '$stateParams', 'EmailSvc',
 function($scope, $rootScope, $stateParams, EmailSvc){

  $scope.message = {};
  $scope.messageId = $stateParams.messageId;
  
  EmailSvc.received($rootScope.rootUser.user_id, $scope.messageId)
    .success(function(data){
      $scope.message = data[0];
      var date = $moment($scope.message.headers.date);
      date = date.toString();
      $scope.message.headers.date = date;
    })
    .error(function(data){
    });
  
}]);