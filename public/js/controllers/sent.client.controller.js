app.controller('SentCtrl', ['$scope', '$rootScope', '$stateParams', 'EmailSvc',
 function($scope, $rootScope, $stateParams, EmailSvc){

  $scope.sentMessages = [];
  $rootScope.rootOutbox = [];

  EmailSvc.sent($rootScope.rootUser.user_id)
    .success(function(data){
      $scope.sentMessages = data;
      $rootScope.rootOutbox = data;
    })
    .error(function(data){

    });
  
}]);