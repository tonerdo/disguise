app.controller('HomeCtrl', ['$scope', '$location', '$cookies', 'UserSvc', 'toastr',
  function ($scope, $location, $cookies, UserSvc, toastr) {

    $scope.user = {};

    $scope.loginMode = true;

    $scope.changeMode = function () {
      $scope.loginMode = !$scope.loginMode;
    };

    var showSuccess = function (message) {
      toastr.success(message);
    };

    var showError = function (message) {
      toastr.error(message);
    };

    var showWarning = function (message) {
      toastr.warning(message);
    };

    var validate = function () {

      var validated = true;
      var regx = /^[A-Za-z0-9]+$/;

      if (!$scope.user.username || $scope.user.username == '') {
        
        showWarning("Username is required");
        validated = false;
      }

      if ($scope.user.username  && $scope.user.username.length < 3) {

        showWarning('Username cannot be less than 3 characters');
        validated = false;
      }

      if (!regx.test($scope.user.username)) {

        showWarning('Username can only contain alphanumeric characters');
        validated = false;
      }

      if (!$scope.password || $scope.password == '') {

        showWarning('Password is required');
        validated = false;
      }

      if ($scope.password && $scope.password.length < 8) {
        
        showWarning('Password cannot be less than eight characters');
        validated = false;
      }
      
      if (!$scope.loginMode && (!$scope.confirm || $scope.password !== $scope.confirm)) {
        
        showWarning('Confirm password field must be the same as password field');
        validated = false;
      }

      return validated;

    };

    $scope.login = function () {

      if (!validate()) { return; }

      $scope.user.password = angular.copy($scope.password);

      var shaObj = new jsSHA("SHA-512", "TEXT");
      shaObj.update($scope.user.password);
      var hash = shaObj.getHash("HEX");
      $scope.user.password = hash;

      UserSvc.login($scope.user)
        .success(function (data, status) {
          if (status == 200) {
            $cookies.put('user', JSON.stringify(data));
            showSuccess('Login was successful. Redirecting...');
            $location.path('/mail/inbox');
          }
        })
        .error(function (data, status) {
          if (status == 401) {
            showError('Invalid username or password');
          } else {
            showError('Sorry, we couldn\'t complete your request. Please try again.');
          }
        });

    };

    $scope.register = function () {
      
      if (!validate()) { return; }

      $scope.user.password = angular.copy($scope.password);

      var shaObj = new jsSHA("SHA-512", "TEXT");
      shaObj.update($scope.user.password);
      var hash = shaObj.getHash("HEX");
      $scope.user.password = hash;

      UserSvc.register($scope.user)
        .success(function (data, status) {
          if (status == 200) {
            showSuccess('Registration successful. Log In.');
            $scope.loginMode = true;
          }
        })
        .error(function (data, status, headers) {
          if (status == 0) {
            showError('Please check your network connection');
          }

          if (data) {
            var error = (data.code == 11000) ? 'Username already exists'
              : 'Sorry, we can\'t complete your request at this time';
            showError(error);
          }
        });

    };

  }]);