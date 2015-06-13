app.controller('InboxCtrl', ['$scope', '$rootScope', '$stateParams', 'EmailSvc',
 function($scope, $rootScope, $stateParams, EmailSvc){

  $scope.inbox = [];
  $rootScope.rootInbox = [];

  EmailSvc.received($rootScope.rootUser.user_id)
    .success(function(data){
      $scope.inbox = data;
      $rootScope.rootInbox = data;
    })
    .error(function(data){

    });
  
}]);