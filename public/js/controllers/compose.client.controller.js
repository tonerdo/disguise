app.controller('ComposeCtrl', ['$scope', function($scope){
  
  $scope.showCc = false;
  $scope.showBcc = false;

  $scope.ccToggle = function(){
    $scope.showCc = !$scope.showCc;
    $scope.cc = null;
  };

  $scope.bccToggle = function(){
    $scope.showBcc = !$scope.showBcc;
    $scope.bcc = null;
  };

}]);