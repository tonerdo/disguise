app.controller('HomeCtrl', ['$scope', 'UserSvc', function($scope, UserSvc){
  
  $scope.alerts = {
    success: {
      text: '',
      show: false
    },
    error: {
      text: '',
      show: false
    },
    info: {
      text: 'Login or register to get started',
      show: true
    },
  };

  $scope.user = {};

  $scope.login = function(){

  };

  $scope.register = function(){

    $scope.alerts.error.show = false;
    $scope.alerts.success.show = false;
    $scope.alerts.info.show = true;

    UserSvc.register($scope.user)
      .success(function(data, status){
        if(status == 200){

          console.log(data);
          $scope.alerts.info.show = false;
          $scope.alerts.error.show = false;
          $scope.alerts.success.show = true;
          $scope.alerts.success.text = 'Registration successful. Log In.';

        }
      })
      .error(function(data){

        if(data){
          console.log(data);
          $scope.alerts.info.show = false;
          $scope.alerts.success.show = false;
          $scope.alerts.error.show = true;
          $scope.alerts.error.text = (data.code == 11000) ? 'Username already exists' 
            : 'Sorry, we can\'t complete your request at this time';
        }

      });

  };

}]);