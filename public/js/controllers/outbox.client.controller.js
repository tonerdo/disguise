app.controller('OutboxCtrl', ['$scope', '$rootScope', '$stateParams', 'lodash', 'EmailSvc',
 function($scope, $rootScope, $stateParams, lodash, EmailSvc){

  $scope.message = {};
  $scope.messageId = $stateParams.messageId;
  $scope.message = lodash.where($rootScope.rootOutbox, { 'messageId': $scope.messageId })[0];
  
}]);