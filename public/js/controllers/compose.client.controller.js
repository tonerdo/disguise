app.controller('ComposeCtrl', ['$scope', '$rootScope', 'lodash', 'EmailSvc',
  function($scope, $rootScope, lodash, EmailSvc){
  
  $scope.showCc = false;
  $scope.showBcc = false;

  $scope.ccToggle = function(){
    $scope.showCc = !$scope.showCc;
    $scope.cc = undefined;
  };

  $scope.bccToggle = function(){
    $scope.showBcc = !$scope.showBcc;
    $scope.bcc = undefined;
  };

  $scope.message = {
    from: $rootScope.rootUser.username
  };

  $scope.send = function(){

    if($scope.recipients.length > 0){
      $scope.message.to = lodash.map($scope.recipients, function(row){
        return row.text;
      });
    }

    if($scope.cc.length > 0){
      $scope.message.cc = lodash.map($scope.cc, function(row){
        return row.text;
      });
    }

    if($scope.bcc.length > 0){
      $scope.message.bcc = lodash.map($scope.bcc, function(row){
        return row.text;
      });
    }

    EmailSvc.send($scope.message)
      .success(function(data, status){
        console.log(data);
      })
      .error(function(data){
        console.log(data);
      });

  };

}]);