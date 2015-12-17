app.controller('MailCtrl', ['$rootScope', '$scope', '$state', '$location', '$cookies', 'EmailSvc', 'UserSvc', 'toastr',
 function($rootScope, $scope, $state, $location, $cookies, EmailSvc, UserSvc, toastr){
  
  var cookie = $cookies.get('user');
  if (!cookie) {
    $location.path('/');
  } else {
    $rootScope.rootUser = JSON.parse(cookie);
  }

  if ($location.path() == '/mail') {
    $state.go('mail.inbox', {}, {reload: true});
  }

  $scope.highlight = function(path){
    return $location.path().indexOf(path) !== -1;
  };

  $scope.getUnread = function(){
    $state.go('mail.inbox', {}, {reload: true});
  };


  if ($rootScope.rootUser){
    $scope.getUnread();
  }

  $rootScope.logout = function(){
    $cookies.remove('user');
    $rootScope.rootUser = null;
    $state.go('home', {}, {reload: true});
  };

  $scope.dispose = function() {
    swal({  
      title: "Are you sure?",   
      text: "This account and all it's contents will be permanently deleted",   
      type: "warning",   
      showCancelButton: true,   
      confirmButtonColor: "#DD6B55",   
      confirmButtonText: "Yes, dispose it!",   
      closeOnConfirm: true 
    }, 
    function(){   
      UserSvc.dispose($rootScope.rootUser.user_id, $rootScope.rootUser.access_token)
        .success(function(data){
          toastr.success("Your account has been disposed.");
          $location.path('/');
        })
        .error(function(){
          toastr.success("Your account has been disposed.");
          $location.path('/');
        });
    });
  };


}]);