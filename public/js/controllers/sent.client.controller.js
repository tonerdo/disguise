app.controller('SentCtrl', ['$scope', '$rootScope', 'EmailSvc',
 function($scope, $rootScope, EmailSvc){

  $scope.sentMessages = [];

  EmailSvc.sent($rootScope.rootUser.user_id)
    .success(function(data){
      $scope.sentMessages = data;
    })
    .error(function(data){

    });
  
}]);