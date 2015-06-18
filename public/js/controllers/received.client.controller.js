app.controller('ReceivedCtrl', ['$scope', '$rootScope', '$stateParams', '$moment', 'EmailSvc',
 function($scope, $rootScope, $stateParams, $moment, EmailSvc){

  $scope.message = {};
  $scope.messageId = $stateParams.messageId;

  var loadMessage = function(){

    for (var i = 0; i < $rootScope.inbox.length; i++) {
    if ($rootScope.inbox[i].messageId == $scope.messageId)
      $scope.message = $rootScope.inbox[i];
    }

    if ($scope.message.read == false){

      EmailSvc.received($rootScope.rootUser.user_id, $scope.message.messageId, $rootScope.rootUser.access_token)
        .success(function(data){
        })
        .error(function(data){
        });

    }

  };
  
  if ($rootScope.inbox) {
    loadMessage();
  } else {

    EmailSvc.received($rootScope.rootUser.user_id, null, $rootScope.rootUser.access_token)
      .success(function(data){
        var messages = data;
        messages.reverse();
        $rootScope.inbox = messages;
        loadMessage();

      })
      .error(function(data, status){
        if (status == 401)
          $rootScope.logout();
      });

  }
  
  
}]);