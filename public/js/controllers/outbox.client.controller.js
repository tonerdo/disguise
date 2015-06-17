app.controller('OutboxCtrl', ['$scope', '$rootScope', '$stateParams', '$moment', 'EmailSvc',
 function($scope, $rootScope, $stateParams, $moment, EmailSvc){

  $scope.message = {};
  $scope.messageId = $stateParams.messageId;
  
  var loadMessage = function(){
    
    for (var i = 0; i < $rootScope.outbox.length; i++) {
    if ($rootScope.outbox[i].messageId == $scope.messageId)
      $scope.message = $rootScope.outbox[i];
    }
  };

  if ($rootScope.outbox) {
    loadMessage();
  } else {

    EmailSvc.sent($rootScope.rootUser.user_id, $rootScope.rootUser.access_token)
      .success(function(data){
        var messages = data;
        messages.reverse();
        $rootScope.outbox = $scope.messages;
        loadMessage();
      })
      .error(function(data){
        $rootScope.logout();
      });

  }
  
}]);