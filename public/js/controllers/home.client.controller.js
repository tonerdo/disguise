app.controller('HomeCtrl', ['$scope', '$location', '$cookies', 'UserSvc', 
  function($scope, $location, $cookies, UserSvc){
  
  $scope.user = {};

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

  $scope.validations = {
    username: {
      text: '',
      show: false
    },
    password: {
      text: '',
      show: false
    }
  };

  var showSuccess = function(message){
    $scope.alerts.info.show = false;
    $scope.alerts.error.show = false;
    $scope.alerts.success.show = true;
    $scope.alerts.success.text = message;
  };

  var showError = function(message){
    $scope.alerts.info.show = false;
    $scope.alerts.success.show = false;
    $scope.alerts.error.show = true;
    $scope.alerts.error.text = message;
  };

  var showInfo = function(){
    $scope.alerts.error.show = false;
    $scope.alerts.success.show = false;
    $scope.alerts.info.show = true;
  };

  var clearValidationErrors = function() {
    $scope.validations.username.show = false;
    $scope.validations.password.show = false;
  };

  var validate = function(){

    var validated = true;
    var regx = /^[A-Za-z0-9]+$/;

    if (!$scope.user.username || $scope.user.username == '') {

      $scope.validations.username.text = 'Username is required';
      $scope.validations.username.show = true;
      validated = false;
    }

    if ($scope.user.username.length < 3) {

      $scope.validations.username.text = 'Username cannot be less than 3 characters';
      $scope.validations.username.show = true;
      validated = false;
    }

    if (!regx.test($scope.user.username)) {

      $scope.validations.username.text = 'Username can only contain alphanumeric characters';
      $scope.validations.username.show = true;
      validated = false;
    }

    if(!$scope.user.password || $scope.user.password == '') {

      $scope.validations.password.text = 'Password is required';
      $scope.validations.password.show = true;
      validated = false;
    }

    if ($scope.user.password.length < 8) {

      $scope.validations.password.text = 'Password cannot be less than eight characters';
      $scope.validations.password.show = true;
      validated = false;
    }

    return validated;

  };

  $scope.login = function(){

    showInfo();
    clearValidationErrors();

    if(!validate()) { return; }

    UserSvc.login($scope.user)
      .success(function(data, status){
        if(status == 200){
          $cookies.put('user', JSON.stringify(data));
          showSuccess('Login was successful. Redirecting...');
          $location.path('/mail/inbox');
        }
      })
      .error(function(data, status){
        if(status == 401){
          showError('Invalid username or password');
        } else {
          showError('Sorry, we can\'t complete your request at this time');
        }
      });

  };

  $scope.register = function(){

    showInfo();
    clearValidationErrors();

    if(!validate()) { return; }

    UserSvc.register($scope.user)
      .success(function(data, status){
        if(status == 200){
          console.log(data);
          showSuccess('Registration successful. Log In.');
        }
      })
      .error(function(data, status, headers){
        if(status == 0){
          showError('Please check your network connection');
        }

        if(data){
          console.log(data);
          var error = (data.code == 11000) ? 'Username already exists' 
            : 'Sorry, we can\'t complete your request at this time';
          showError(error);
        }
      });

  };

}]);