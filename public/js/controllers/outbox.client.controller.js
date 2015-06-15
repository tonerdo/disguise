app.controller('OutboxCtrl', ['$scope', '$rootScope', '$stateParams', 'EmailSvc',
 function($scope, $rootScope, $stateParams, EmailSvc){

  $scope.message = {};
  $scope.messageId = $stateParams.messageId;
  EmailSvc.sent($rootScope.rootUser.user_id, $scope.messageId)
    .success(function(data){
      $scope.message = data[0];
    })
    .error(function(data){

    });
  
}]);