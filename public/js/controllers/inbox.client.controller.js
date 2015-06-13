app.controller('InboxCtrl', ['$scope', '$rootScope', '$stateParams', 'lodash', 'EmailSvc',
 function($scope, $rootScope, $stateParams, lodash, EmailSvc){

  $scope.inbox = [];
  $scope.message = {};

  var showMessage = function(messages) {
    $scope.messageId = $stateParams.messageId;
    $scope.message = lodash.where($scope.inbox, { 'messageId': $scope.messageId })[0];
    console.log($scope.message);
  }

  EmailSvc.received($rootScope.rootUser.user_id)
    .success(function(data){
      $scope.inbox = data;
      if($stateParams.messageId)
        showMessage(data);
    })
    .error(function(data){

    });
  
}]);