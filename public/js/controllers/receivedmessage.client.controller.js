app.controller('ReceivedMessageCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$moment', '$location', 'EmailSvc',
 function($scope, $rootScope, $state, $stateParams, $moment, $location, EmailSvc){

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

  $scope.delete = function(){

    EmailSvc.delete($rootScope.rootUser.user_id, $scope.messageId, 'received', $rootScope.rootUser.access_token)
      .success(function(){
        $state.go('mail.inbox', {}, {reload: true});
      })
      .error(function(){
        $state.go('mail.inbox', {}, {reload: true});
      });

  };
  
  
}]);