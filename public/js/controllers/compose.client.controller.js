app.controller('ComposeCtrl', ['$scope', '$rootScope', 'lodash', 'EmailSvc',
  function($scope, $rootScope, lodash, EmailSvc){
  
  $scope.showCc = false;
  $scope.showBcc = false;
  $scope.success = false;
  $scope.error = false;

  $scope.ccToggle = function(){
    $scope.showCc = !$scope.showCc;
    $scope.cc = [];
  };

  $scope.bccToggle = function(){
    $scope.showBcc = !$scope.showBcc;
    $scope.bcc = [];
  };

  $scope.message = {
    from: $rootScope.rootUser.username
  };

  $scope.validationErrors = {
    recipients: {
      text: 'Enter at least one recipient',
      show: false
    }
  };

  var clearValidationErrors = function(){
    $scope.validationErrors.recipients.show = false;
  };

  var validate = function(){

    var validated = true;
    if(!$scope.recipients || $scope.recipients.length === 0){
      $scope.validationErrors.recipients.show = true;
      validated = false;
    }
    return validated;

  };

  var clearFields = function(){
    $scope.recipients = [];
    $scope.cc = [];
    $scope.bcc =[];
    $scope.message = {
      from: $rootScope.rootUser.username
    };
  };

  $scope.send = function(){

    clearValidationErrors();
    if(!validate()) { return; }

    $scope.success = false;
    $scope.error = false;

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
        $scope.success = true;
        clearFields();
      })
      .error(function(data){
        $scope.error = true;
      });

  };

}]);